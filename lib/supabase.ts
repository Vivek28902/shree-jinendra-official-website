import { createClient } from '@supabase/supabase-js';

// These should be added to your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate URL to prevent crash
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
  console.warn("Supabase credentials missing or invalid. Check your .env file.");
}

// Only initialize if URL is valid, otherwise use a placeholder to avoid crashing
export const supabase = (supabaseUrl && isValidUrl(supabaseUrl)) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder-project.supabase.co', 'placeholder-key'); // Dummy fallback
