import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a placeholder client if env vars are missing (prevents app crash)
let supabase: SupabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  // Create a mock client that will fail gracefully
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

import { CONVERSION_TOOLS } from '../constants/tools';

export async function canUserUseTool(userId: string, toolName: string): Promise<boolean> {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("plan_type, credits_remaining")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    console.error("Error checking user credits:", error);
    return false;
  }

  // Normalize tool name to match config keys (e.g. "DWG to PDF" -> "dwg_to_pdf")
  const toolKey = toolName.toLowerCase().replace(/\s+/g, '_');
  const toolConfig = CONVERSION_TOOLS[toolKey];

  // 1. Check strict plan requirements from config
  if (toolConfig) {
    if (toolConfig.plan_required === 'enterprise' && profile.plan_type !== 'enterprise') return false;
    if (toolConfig.plan_required === 'pro' && !['pro', 'enterprise'].includes(profile.plan_type)) return false;
    // If restricted, even pro might need checks, but for now we follow plan_required
  }

  // 2. Base Plan Limits (Pro/Enterprise usually unlimited)
  if (['pro', 'enterprise'].includes(profile.plan_type)) return true;

  // 3. Free User Credit Check
  if ((profile.credits_remaining || 0) > 0) return true;

  return false;
}

export async function deductCredit(userId: string, toolName: string, fileSize: number): Promise<void> {
  // Log usage
  const { error: logError } = await supabase.from("usage_logs").insert({
    user_id: userId,
    tool_name: toolName,
    file_size_mb: fileSize
  });

  if (logError) {
    console.error("Error logging usage:", logError);
    // Don't return, still try to deduct credit
  }

  // Deduct credit
  const { error: rpcError } = await supabase.rpc("decrement_credit", { uid: userId });

  if (rpcError) {
    console.error("Error deducting credit:", rpcError);
  }
}
