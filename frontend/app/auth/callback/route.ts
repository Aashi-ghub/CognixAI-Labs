import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from '../../../lib/config'

export async function GET(request: NextRequest) {
  // The Supabase client will automatically handle the OAuth callback
  // when detectSessionInUrl is enabled (which we set in supabase-client.ts)
  
  // Redirect to home page after successful authentication using centralized config
  return NextResponse.redirect(getUrl.home())
}
