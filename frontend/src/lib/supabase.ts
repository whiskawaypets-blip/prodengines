import { createClient } from '@supabase/supabase-js';

// These environment variables should be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Log in development but don't throw to allow the app to load
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'Missing Supabase credentials. Authentication will not work.\n' +
      'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    );
  }
}

// Create a dummy client if credentials are missing
const isConfigured = supabaseUrl && supabaseAnonKey;

// Create Supabase client with available credentials
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : // Create a mock client for development that won't throw errors
    createClient('https://example.supabase.co', 'fake-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

export default supabase; 