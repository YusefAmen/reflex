-- Reflex Supabase Seed Data (for local/dev only)

-- Insert a test user profile (assumes user exists in auth.users)
insert into profiles (id, display_name)
values ('00000000-0000-0000-0000-000000000000', 'Test User')
on conflict do nothing;

-- Insert a test project
insert into projects (id, owner_id, name)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'Test Project')
on conflict do nothing;

-- Insert a test log
insert into logs (id, project_id, event, source_type, timestamp, metadata)
values (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'test_event',
  'chrome',
  now(),
  '{"foo": "bar"}'
)
on conflict do nothing; 