create table if not exists payments (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id),
  payment_provider text, -- razorpay
  payment_type text, -- subscription | one_time
  plan_type text,
  amount numeric,
  status text, -- success | failed | pending
  created_at timestamp default now()
);

-- Enable RLS
alter table payments enable row level security;

-- Policy: Users can view their own payments
create policy "Users can view their own payments"
on payments for select
using (auth.uid() = user_id);

-- Policy: Service role (admin) can do everything (default, but good to keep in mind)
-- Users usually shouldn't insert payments directly from client-side (should be via Edge Function/Server after verifying webhook)
-- But for now, if you need client-side insert for testing, uncomment below:
-- create policy "Users can insert their own payments" on payments for insert with check (auth.uid() = user_id);
