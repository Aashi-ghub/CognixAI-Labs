-- ============================================
-- CognixAI Labs - Complete Supabase Setup
-- Run this entire file in Supabase SQL Editor
-- ============================================

-- Enable extensions used by Supabase defaults
create extension if not exists pgcrypto;
create extension if not exists pgjwt;

-- ============================================
-- PROFILES TABLE
-- ============================================
-- Profiles table linked to Supabase auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  first_name text,
  last_name text,
  company text,
  phone text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Public read own profile" on public.profiles;
drop policy if exists "Update own profile" on public.profiles;
drop policy if exists "Insert own profile" on public.profiles;

-- Create RLS policies for profiles
create policy "Public read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Function to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  v_full_name text;
  v_first_name text;
  v_last_name text;
  v_given_name text;
  v_family_name text;
  v_name_from_google text;
begin
  -- Extract names from various sources (supports both email signup and Google OAuth)
  v_given_name := coalesce(new.raw_user_meta_data->>'given_name', new.raw_user_meta_data->>'first_name');
  v_family_name := coalesce(new.raw_user_meta_data->>'family_name', new.raw_user_meta_data->>'last_name');
  v_name_from_google := coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name');
  
  -- Determine full_name: prefer Google's full_name/name, then construct from parts
  if v_name_from_google is not null and v_name_from_google != '' then
    v_full_name := v_name_from_google;
    -- Try to split Google full_name into first_name and last_name
    if v_given_name is null or v_given_name = '' then
      -- Split by space: take first word as first_name, rest as last_name
      v_first_name := split_part(v_name_from_google, ' ', 1);
      v_last_name := trim(substring(v_name_from_google from length(v_first_name) + 1));
      if v_last_name = '' then
        v_last_name := null;
      end if;
    else
      v_first_name := v_given_name;
      v_last_name := v_family_name;
    end if;
  elsif v_given_name is not null or v_family_name is not null or 
        (new.raw_user_meta_data->>'first_name' is not null) or 
        (new.raw_user_meta_data->>'last_name' is not null) then
    -- Construct from parts
    v_first_name := coalesce(v_given_name, new.raw_user_meta_data->>'first_name');
    v_last_name := coalesce(v_family_name, new.raw_user_meta_data->>'last_name');
    v_full_name := trim(concat(
      coalesce(v_first_name, ''),
      ' ',
      coalesce(v_last_name, '')
    ));
    if v_full_name = '' or v_full_name = ' ' then
      v_full_name := null;
    end if;
  else
    -- Fallback: use email username or empty
    v_full_name := null;
    v_first_name := null;
    v_last_name := null;
  end if;
  
  insert into public.profiles (
    id, 
    email, 
    first_name, 
    last_name, 
    company, 
    phone,
    avatar_url,
    full_name
  )
  values (
    new.id, 
    new.email,
    v_first_name,
    v_last_name,
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'),
    v_full_name
  )
  on conflict (id) do update set
    first_name = coalesce(excluded.first_name, profiles.first_name),
    last_name = coalesce(excluded.last_name, profiles.last_name),
    company = coalesce(excluded.company, profiles.company),
    phone = coalesce(excluded.phone, profiles.phone),
    avatar_url = coalesce(excluded.avatar_url, profiles.avatar_url),
    full_name = coalesce(excluded.full_name, profiles.full_name),
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Drop and recreate trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ============================================
-- CONSULTATION REQUESTS TABLE
-- ============================================
-- Consultation requests captured from timed popup form and AI Workflow Audit
create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null, -- email or phone
  company text,
  goal text not null, -- automation goal description
  -- Fields for AI Workflow Audit (3-step popup)
  industry text, -- Industry selected (Tech, Finance, Marketing, Real Estate, Other)
  team_size text, -- Team size selected (1-10, 10-50, 50-200, 200+)
  challenge text, -- Biggest challenge described by user
  wants_call boolean default false, -- Whether user wants strategy call
  -- Additional fields from forms
  email text,
  phone text,
  company_website text,
  automation_requirements text,
  created_at timestamptz default now()
);

alter table public.consultation_requests enable row level security;

-- Drop existing policies
drop policy if exists "allow inserts for authenticated" on public.consultation_requests;
drop policy if exists "service role inserts" on public.consultation_requests;

-- Allow service role to insert (used by API routes)
create policy "service role inserts" on public.consultation_requests
for insert to service_role with check (true);

-- Optional: Allow authenticated users to insert (if needed)
create policy "allow inserts for authenticated" on public.consultation_requests
for insert
to authenticated
with check (true);

-- Create indexes for better query performance
create index if not exists idx_consultation_requests_industry on public.consultation_requests(industry) where industry is not null;
create index if not exists idx_consultation_requests_wants_call on public.consultation_requests(wants_call) where wants_call = true;
create index if not exists idx_consultation_requests_created_at on public.consultation_requests(created_at desc);

-- ============================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================
-- Contact submissions table (write by server only)
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz default now()
);

alter table public.contact_submissions enable row level security;

-- Drop existing policy
drop policy if exists "service role inserts" on public.contact_submissions;

-- Allow only service role to insert (used by API routes)
create policy "service role inserts" on public.contact_submissions
for insert to service_role with check (true);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify everything was created correctly

-- Check tables exist
select table_name 
from information_schema.tables 
where table_schema = 'public' 
  and table_name in ('profiles', 'consultation_requests', 'contact_submissions')
order by table_name;

-- Check consultation_requests columns
select 
  column_name, 
  data_type, 
  is_nullable,
  column_default
from information_schema.columns 
where table_schema = 'public' 
  and table_name = 'consultation_requests'
order by ordinal_position;

-- Check contact_submissions columns
select 
  column_name, 
  data_type, 
  is_nullable,
  column_default
from information_schema.columns 
where table_schema = 'public' 
  and table_name = 'contact_submissions'
order by ordinal_position;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Set up your .env file with Supabase credentials
-- 2. Restart your Next.js dev server
-- 3. Test form submissions

