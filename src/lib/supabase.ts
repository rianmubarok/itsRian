import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Debug: Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are not configured:");
  console.warn("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "Set" : "Not set");
  console.warn(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
    supabaseAnonKey ? "Set" : "Not set"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
