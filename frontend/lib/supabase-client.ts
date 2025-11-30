"use client"

import { createClient } from "@supabase/supabase-js"
import { config } from "./config"

// Hardcoded Supabase credentials (same as API routes)
const SUPABASE_URL = "https://wyqhofuwxzyyjnffavgq.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5cWhvZnV3eHp5eWpuZmZhdmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODM1ODMsImV4cCI6MjA4MDA1OTU4M30.Tpx1oJxHeTdPWsgyFhBG4BGj9HBveDFrABtxXT4Bdzo"

// Get environment variables with fallback to hardcoded values
const getEnvVar = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    // Client-side: environment variables should be available
    return process.env[key]
  } else {
    // Server-side: environment variables should be available
    return process.env[key]
  }
}

// Create Supabase client with hardcoded credentials as fallback
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
      // Let Supabase handle redirects automatically
    }
  }
)

// Export for backward compatibility
export const supabaseClient = supabase

// Check if Supabase is properly configured (always returns true with hardcoded values)
export const isSupabaseConfigured = () => {
  // Always return true since we have hardcoded credentials
  return true
}





