// Simple script to test if .env file is being loaded
// Run with: node test-env.js

console.log('🔍 Environment Variables Test')
console.log('=============================')
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ SET' : '❌ NOT SET')
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ SET' : '❌ NOT SET')
console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL || '❌ NOT SET')
console.log('NODE_ENV:', process.env.NODE_ENV || '❌ NOT SET')

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.log('\n❌ Missing required environment variables!')
  console.log('📝 Make sure your .env file exists and contains:')
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
  console.log('\n💡 Note: This script only shows system env vars, not .env file vars')
  console.log('   Next.js loads .env files automatically during development')
} else {
  console.log('\n✅ All required environment variables are set!')
}
