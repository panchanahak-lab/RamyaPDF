-- Update default daily limit to 5
alter table profiles alter column daily_limit set default 5;

-- Update existing free profiles to have 5 limit (if they were 10)
update profiles 
set daily_limit = 5 
where plan_type = 'free' and daily_limit = 10;

-- Reset credits for free users to new limit (optional, but good for consistency)
update profiles
set credits_remaining = 5
where plan_type = 'free' and credits_remaining > 5;
