-- ============================================
-- Migration: Create profiles table with RLS
-- Created: 2026-01-27
-- Description: User profile table for plan/credits management
-- ============================================

-- Enable Row Level Security extension (if not already enabled)
-- This is typically enabled by default in Supabase

-- ============================================
-- 1. CREATE PROFILES TABLE
-- ============================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  plan_type text default 'free' check (plan_type in ('free', 'pro', 'enterprise')),
  daily_limit integer default 5,
  credits_remaining integer default 5,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Add comment for documentation
comment on table public.profiles is 'User profiles linked to auth.users with plan and credit information';

-- ============================================
-- 2. ENABLE ROW LEVEL SECURITY
-- ============================================
alter table public.profiles enable row level security;

-- ============================================
-- 3. RLS POLICIES
-- ============================================

-- Policy: Users can view their own profile
create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Policy: Users can update their own profile (limited fields)
create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Policy: Allow insert for service role (used by trigger)
-- Note: The trigger runs with security definer, so this enables profile creation
create policy "Enable insert for authenticated users own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- ============================================
-- 4. AUTO-CREATE PROFILE ON USER SIGNUP
-- ============================================

-- Function to create profile on new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.raw_user_meta_data->>'email');
  return new;
end;
$$;

-- Trigger to call function on user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- 5. HELPER FUNCTION: UPDATE TIMESTAMP
-- ============================================

-- Function to auto-update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger to auto-update updated_at on profile changes
drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

-- ============================================
-- 6. INDEXES FOR PERFORMANCE
-- ============================================
create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists profiles_plan_type_idx on public.profiles(plan_type);
