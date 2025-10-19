"use client"

import { createClient } from "@supabase/supabase-js"
import { config } from "./config"

// Get environment variables with better error handling
const getEnvVar = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    // Client-side: environment variables should be available
    return process.env[key]
  } else {
    // Server-side: environment variables should be available
    return process.env[key]
  }
}

// Create Supabase client with dynamic environment variable loading
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co', 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
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

// Check if Supabase is properly configured (only when needed)
export const isSupabaseConfigured = () => {
  // Get fresh environment variables each time
  const currentUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const currentKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  const hasUrl = !!currentUrl && currentUrl !== 'https://placeholder.supabase.co'
  const hasKey = !!currentKey && currentKey !== 'placeholder-key'
  
  if (!hasUrl || !hasKey) {
    console.warn('⚠️ Supabase not properly configured:', {
      hasUrl,
      hasKey,
      url: currentUrl ? 'SET' : 'NOT SET',
      key: currentKey ? 'SET' : 'NOT SET',
      allEnvKeys: Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_'))
    })
  }
  
  return hasUrl && hasKey
}





