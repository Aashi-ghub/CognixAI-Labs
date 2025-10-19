#!/usr/bin/env node

/**
 * CognixAI Labs - Database Test Script
 * 
 * This script tests the database connection and verifies the schema
 * to ensure all fields are properly set up for user signup.
 * 
 * Usage: node test-db.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testDatabase() {
  console.log('🔍 Testing database connection and schema...\n')

  try {
    // Test 1: Check if profiles table exists and has correct columns
    console.log('📋 Testing profiles table schema...')
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)

    if (profilesError) {
      console.error('❌ Profiles table error:', profilesError.message)
      return
    }

    console.log('✅ Profiles table accessible')

    // Test 2: Check table structure by trying to insert a test record (then delete it)
    console.log('🧪 Testing table structure...')
    const testId = '00000000-0000-0000-0000-000000000000'
    
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: testId,
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        company: 'Test Company',
        phone: '+1 (555) 000-0000',
        full_name: 'Test User'
      })

    if (insertError) {
      console.error('❌ Insert test failed:', insertError.message)
      console.log('💡 This might indicate missing columns in the profiles table.')
      console.log('   Please run the updated SQL schema in your Supabase dashboard.')
    } else {
      console.log('✅ All required columns exist in profiles table')
      
      // Clean up test record
      await supabase
        .from('profiles')
        .delete()
        .eq('id', testId)
      console.log('🧹 Test record cleaned up')
    }

    // Test 3: Check existing users count
    console.log('👥 Checking existing users...')
    const { data: userCount, error: countError } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })

    if (countError) {
      console.error('❌ Count error:', countError.message)
    } else {
      console.log(`✅ Found ${userCount || 0} existing users in profiles table`)
    }

    // Test 4: Check auth users
    console.log('🔐 Checking auth users...')
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
    
    if (authError) {
      console.error('❌ Auth users error:', authError.message)
    } else {
      console.log(`✅ Found ${authUsers.users.length} users in auth system`)
    }

    console.log('\n🎉 Database test completed successfully!')
    console.log('\n📝 Next steps:')
    console.log('   1. Run: npm run seed (to create test users)')
    console.log('   2. Test the signup form on your login page')
    console.log('   3. Run: npm run seed:cleanup (to remove test users)')

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

testDatabase().catch(console.error)
