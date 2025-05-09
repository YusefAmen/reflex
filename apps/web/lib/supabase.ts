import { createClient } from '@supabase/supabase-js';

// Make sure @supabase/supabase-js is installed in your project
// Use import.meta.env for Vite/Next.js 14+
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 