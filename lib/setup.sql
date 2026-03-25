-- 1. Create the site_configs table to store the entire website data in one JSONB column
create table if not exists site_configs (
  id text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default now()
);

-- 2. Enable Row Level Security
alter table site_configs enable row level security;

-- 3. Create a policy to allow anyone to read the data (Public)
create policy "Allow public read access"
  on site_configs for select
  using (true);

-- 4. Create a policy to allow inserts and updates (Upsert support)
create policy "Allow public all access"
  on site_configs for all
  using (true)
  with check (true);

-- 5. Insert an initial empty object if it doesn't exist
insert into site_configs (id, data)
values ('primary', '{}')
on conflict (id) do nothing;
