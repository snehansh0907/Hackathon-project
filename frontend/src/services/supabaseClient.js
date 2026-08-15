// ---------------------------------------------------------------------------
// Supabase Auth client.
//
// Reads its config from Vite env vars. If those aren't set yet (teammate's
// backend/auth project not configured), we deliberately DON'T throw —
// `supabase` will just be null and the Login page shows a friendly notice
// instead of a crash. This lets the frontend run standalone during early
// milestones.
// ---------------------------------------------------------------------------

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
