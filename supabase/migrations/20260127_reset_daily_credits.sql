-- Ensure profiles table has the necessary columns
alter table profiles add column if not exists plan_type text default 'free';
alter table profiles add column if not exists credits_remaining int default 10;
alter table profiles add column if not exists daily_limit int default 10;

-- Create the reset function
create or replace function reset_daily_credits()
returns void as $$
begin
  update profiles
  set credits_remaining = daily_limit
  where plan_type = 'free';
end;
$$ language plpgsql;

-- Optional: If you have pg_cron extension enabled in Supabase, you can schedule this:
-- select cron.schedule('0 0 * * *', $$select reset_daily_credits()$$);
