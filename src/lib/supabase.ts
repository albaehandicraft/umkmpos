import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// Get Supabase environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create the Supabase client with the URL and key
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
