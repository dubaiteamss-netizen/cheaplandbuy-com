import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    // Return a dummy client during build if env vars are missing
    // Real app requires these to be set for runtime
    if (typeof window === 'undefined') {
      return {
        auth: { onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }) },
      } as any;
    }
    throw new Error('Supabase URL and key are required');
  }
  
  return createBrowserClient(url, key);
}
