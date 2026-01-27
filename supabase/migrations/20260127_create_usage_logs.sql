create table if not exists usage_logs (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  tool_name text,
  file_size_mb numeric,
  created_at timestamp default now()
);

-- Enable RLS (Recommended)
alter table usage_logs enable row level security;

-- Policy: Users can insert their own logs
create policy "Users can insert their own usage logs"
on usage_logs for insert
with check (auth.uid() = user_id);

-- Policy: Users can view their own logs
create policy "Users can view their own usage logs"
on usage_logs for select
using (auth.uid() = user_id);
