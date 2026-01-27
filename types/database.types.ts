/**
 * Database Types for Supabase
 * Auto-generated from database schema
 */

export type PlanType = 'free' | 'pro' | 'enterprise';

export interface Profile {
  id: string;
  email: string | null;
  plan_type: PlanType;
  daily_limit: number;
  credits_remaining: number;
  created_at: string;
  updated_at: string;
}

export interface ProfileInsert {
  id: string;
  email?: string | null;
  plan_type?: PlanType;
  daily_limit?: number;
  credits_remaining?: number;
}

export interface ProfileUpdate {
  email?: string | null;
  plan_type?: PlanType;
  daily_limit?: number;
  credits_remaining?: number;
}

// Database schema types for Supabase client
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
    };
  };
}
