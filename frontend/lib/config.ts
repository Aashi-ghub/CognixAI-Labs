// Centralized configuration for URLs and environment variables
export const config = {
  // Base URL configuration - defaults to current origin
  baseUrl: (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
  
  // Production URL for reference
  productionUrl: 'https://cognixai-labs.vercel.app',
  
  // API endpoints
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 
             (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
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
  // Get full URL for a route
  route: (path: string) => `${config.baseUrl}${path}`,
  
  // Get auth callback URL
  authCallback: () => `${config.baseUrl}${config.routes.auth.callback}`,
  
  // Get login URL
  login: () => `${config.baseUrl}${config.routes.login}`,
  
  // Get dashboard URL
  dashboard: () => `${config.baseUrl}${config.routes.dashboard}`,
  
  // Get home URL
  home: () => `${config.baseUrl}${config.routes.home}`
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

// Export the base URL for easy access
export const BASE_URL = config.baseUrl
export const AUTH_CALLBACK_URL = getUrl.authCallback()
