-- Reflex Supabase Initial Migration

-- Users table (Supabase manages auth.users, but you may want a profile table)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id),
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Logs table
create table if not exists logs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  event text not null,
  source_type text,
  timestamp timestamptz not null,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table projects enable row level security;
alter table logs enable row level security;

-- RLS: Only project owner can see their projects
create policy "Project owner can view" on projects
  for select using (auth.uid() = owner_id);

-- RLS: Only project owner can insert logs for their project
create policy "Owner can insert logs" on logs
  for insert using (
    exists (select 1 from projects p where p.id = project_id and p.owner_id = auth.uid())
  );

-- RLS: Only project owner can select logs for their project
create policy "Owner can select logs" on logs
  for select using (
    exists (select 1 from projects p where p.id = project_id and p.owner_id = auth.uid())
  ); 