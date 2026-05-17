'use client';
import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client. Reads the public env vars only.
 * Used by the admin login form to call signInWithPassword().
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
