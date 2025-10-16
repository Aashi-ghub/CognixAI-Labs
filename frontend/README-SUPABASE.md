Supabase setup

1) Create a Supabase project and copy keys
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY (used only in server route)

2) Create table for contact submissions

```sql
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz default now()
);

alter table public.contact_submissions enable row level security;
create policy "allow inserts from service role" on public.contact_submissions for insert to service role using (true);
```

3) Environment variables
   - Set variables in `.env.local` in `frontend/` as described above and restart dev server.





