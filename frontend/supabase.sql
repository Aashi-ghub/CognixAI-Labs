-- Enable extensions used by Supabase defaults
create extension if not exists pgcrypto;
create extension if not exists pgjwt;

-- Profiles table linked to Supabase auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Function to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

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

-- Allow only service role to insert (drop then create for idempotency)
drop policy if exists "service role inserts" on public.contact_submissions;
create policy "service role inserts" on public.contact_submissions
for insert to service_role with check (true);

-- Optional: allow auth users to read their own submissions if you store user_id
-- alter table public.contact_submissions add column user_id uuid references auth.users(id);
-- create policy "users select own" on public.contact_submissions for select using (auth.uid() = user_id);

-- Auth providers: Email/password + Google are configured in the Supabase Dashboard under Authentication > Providers
-- Ensure Site URL and Redirect URLs include your local and production domains.



