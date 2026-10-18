-- Run this in the Supabase SQL editor.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- No public insert/select policies. The Express API uses the service role key.
