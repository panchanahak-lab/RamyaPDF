create or replace function decrement_credit(uid uuid)
returns void as $$
begin
  update profiles
  set credits_remaining = credits_remaining - 1
  where id = uid and plan_type = 'free';
end;
$$ language plpgsql security definer;
