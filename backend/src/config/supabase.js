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

/**
 * Inspects the configured SUPABASE_SERVICE_ROLE_KEY format without revealing secrets,
 * so we can warn if an anon/publishable key was configured by mistake.
 */
export function detectSupabaseKeyRole() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!key) return 'missing';
  if (key.startsWith('sb_publishable_')) return 'anon';
  if (key.startsWith('sb_secret_')) return 'service_role';

  const parts = key.split('.');
  if (parts.length === 3) {
    try {
      const payload = JSON.parse(
        Buffer.from(parts[1], 'base64url').toString('utf8')
      );
      if (typeof payload?.role === 'string') {
        return payload.role;
      }
    } catch {
      return 'unknown';
    }
  }
  return 'unknown';
}
