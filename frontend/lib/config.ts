import { NextRequest } from 'next/server'

// Helper function to get base URL - works on both client and server
function getBaseUrl(request?: NextRequest): string {
  // Priority 1: Use environment variable if set
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL
  }
  
  // Priority 2: On server side, extract from request URL or headers
  if (request) {
    // Try to get from request URL first (most reliable)
    try {
      const url = new URL(request.url)
      return url.origin
    } catch {
      // Fallback to headers if URL parsing fails
      const host = request.headers.get('host') || request.headers.get('x-forwarded-host')
      if (host) {
        // Determine protocol from headers, default to https for production-like environments
        const forwardedProto = request.headers.get('x-forwarded-proto')
        const protocol = forwardedProto || (host.includes('localhost') ? 'http' : 'https')
        return `${protocol}://${host}`
      }
    }
  }
  
  // Priority 3: On client side, use window.location
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  
  // Priority 4: Fallback (should rarely be used)
  return 'http://localhost:3000'
}

// Centralized configuration for URLs and environment variables
export const config = {
  // Production URL for reference
  productionUrl: 'https://cognixai-labs.vercel.app',
  
  // API endpoints
  api: {
    auth: {
      callback: '/auth/callback',
      login: '/login',
      logout: '/logout'
    }
  },
  
  // Application routes
  routes: {
    home: '/',
    login: '/login',
    dashboard: '/dashboard',
    services: '/services',
    contact: '/contact',
    auth: {
      callback: '/auth/callback'
    }
  },
  
  // External URLs
  external: {
    google: 'https://accounts.google.com',
    supabase: process.env.NEXT_PUBLIC_SUPABASE_URL
  }
} as const

// Helper functions for URL construction
export const getUrl = {
  // Get full URL for a route (supports optional request for server-side)
  route: (path: string, request?: NextRequest) => `${getBaseUrl(request)}${path}`,
  
  // Get auth callback URL
  authCallback: (request?: NextRequest) => `${getBaseUrl(request)}${config.routes.auth.callback}`,
  
  // Get login URL
  login: (request?: NextRequest) => `${getBaseUrl(request)}${config.routes.login}`,
  
  // Get dashboard URL
  dashboard: (request?: NextRequest) => `${getBaseUrl(request)}${config.routes.dashboard}`,
  
  // Get home URL
  home: (request?: NextRequest) => `${getBaseUrl(request)}${config.routes.home}`
}

// Environment validation - only run on client side or when explicitly called
export const validateConfig = () => {
  // Skip validation during SSR
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
    return true
  }
  
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '))
    console.error('📝 Please check your .env file has the following variables:')
    console.error('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
    console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
    
    // In development, don't throw error immediately - allow graceful degradation
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Running in development mode with missing env vars - some features may not work')
      return false
    }
    
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
  
  return true
}

// Export the base URL for easy access (client-side only)
export const BASE_URL = getBaseUrl()
export const AUTH_CALLBACK_URL = getUrl.authCallback()
