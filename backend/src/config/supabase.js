import { createClient } from '@supabase/supabase-js';

let cachedClient = null;

/**
 * Returns a stateless Supabase admin client optimized for Vercel Serverless.
 * Uses SUPABASE_SERVICE_ROLE_KEY so Express controls auth & RLS safely.
 */
export function getSupabaseClient() {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.'
    );
  }

  cachedClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedClient;
}
