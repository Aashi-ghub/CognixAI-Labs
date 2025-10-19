#!/usr/bin/env node

/**
 * CognixAI Labs - User Seeding Script for Testing
 * 
 * This script creates test users in the Supabase database to test the signup process
 * and ensure all fields are properly saved.
 * 
 * Usage: node seed-users.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

// Initialize Supabase client with service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌')
  console.error('\nPlease check your .env file in the frontend directory.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Test users data
const testUsers = [
  {
    email: 'john.doe@example.com',
    password: 'TestPassword123!',
    first_name: 'John',
    last_name: 'Doe',
    company: 'Acme Corporation',
    phone: '+1 (555) 123-4567'
  },
  {
    email: 'jane.smith@techcorp.com',
    password: 'SecurePass456!',
    first_name: 'Jane',
    last_name: 'Smith',
    company: 'TechCorp Solutions',
    phone: '+1 (555) 987-6543'
  },
  {
    email: 'mike.johnson@startup.io',
    password: 'StartupPass789!',
    first_name: 'Mike',
    last_name: 'Johnson',
    company: 'StartupIO',
    phone: '+1 (555) 456-7890'
  },
  {
    email: 'sarah.wilson@freelance.com',
    password: 'FreelancePass321!',
    first_name: 'Sarah',
    last_name: 'Wilson',
    company: null, // Testing optional company field
    phone: '+1 (555) 321-0987'
  },
  {
    email: 'alex.brown@enterprise.com',
    password: 'EnterprisePass654!',
    first_name: 'Alex',
    last_name: 'Brown',
    company: 'Enterprise Solutions Inc.',
    phone: null // Testing optional phone field
  }
]

async function seedUsers() {
  console.log('🌱 Starting user seeding process...\n')

  let successCount = 0
  let errorCount = 0

  for (const userData of testUsers) {
    try {
      console.log(`📝 Creating user: ${userData.email}`)
      
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true, // Auto-confirm email for testing
        user_metadata: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          company: userData.company,
          phone: userData.phone
        }
      })

      if (authError) {
        console.error(`❌ Auth error for ${userData.email}:`, authError.message)
        errorCount++
        continue
      }

      console.log(`✅ User created successfully: ${userData.email}`)
      console.log(`   - User ID: ${authData.user.id}`)
      console.log(`   - Name: ${userData.first_name} ${userData.last_name}`)
      console.log(`   - Company: ${userData.company || 'Not provided'}`)
      console.log(`   - Phone: ${userData.phone || 'Not provided'}`)
      
      // Wait a moment for the trigger to process
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Verify profile was created in profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError) {
        console.error(`❌ Profile verification error for ${userData.email}:`, profileError.message)
        errorCount++
        continue
      }

      console.log(`✅ Profile verified in database:`)
      console.log(`   - First Name: ${profile.first_name}`)
      console.log(`   - Last Name: ${profile.last_name}`)
      console.log(`   - Company: ${profile.company || 'Not provided'}`)
      console.log(`   - Phone: ${profile.phone || 'Not provided'}`)
      console.log(`   - Full Name: ${profile.full_name}`)
      console.log('')

      successCount++

    } catch (error) {
      console.error(`❌ Unexpected error for ${userData.email}:`, error.message)
      errorCount++
    }
  }

  console.log('📊 Seeding Summary:')
  console.log(`   ✅ Successful: ${successCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`   📝 Total: ${testUsers.length}`)

  if (successCount > 0) {
    console.log('\n🎉 Seeding completed! You can now test the login page with these users:')
    testUsers.forEach((user, index) => {
      if (index < successCount) {
        console.log(`   📧 ${user.email} | 🔑 ${user.password}`)
      }
    })
  }

  if (errorCount > 0) {
    console.log('\n⚠️  Some users failed to create. Check the errors above.')
  }
}

async function cleanupTestUsers() {
  console.log('🧹 Cleaning up test users...\n')
  
  let deletedCount = 0
  
  for (const userData of testUsers) {
    try {
      // Get user by email
      const { data: users, error: listError } = await supabase.auth.admin.listUsers()
      
      if (listError) {
        console.error(`❌ Error listing users:`, listError.message)
        continue
      }

      const user = users.users.find(u => u.email === userData.email)
      
      if (user) {
        // Delete user (this will cascade delete the profile due to foreign key)
        const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)
        
        if (deleteError) {
          console.error(`❌ Error deleting ${userData.email}:`, deleteError.message)
        } else {
          console.log(`✅ Deleted user: ${userData.email}`)
          deletedCount++
        }
      } else {
        console.log(`ℹ️  User not found: ${userData.email}`)
      }
    } catch (error) {
      console.error(`❌ Unexpected error cleaning up ${userData.email}:`, error.message)
    }
  }
  
  console.log(`\n🧹 Cleanup completed. Deleted ${deletedCount} users.`)
}

// Main execution
async function main() {
  const command = process.argv[2]
  
  if (command === 'cleanup') {
    await cleanupTestUsers()
  } else if (command === 'seed') {
    await seedUsers()
  } else {
    console.log('Usage:')
    console.log('  node seed-users.js seed    - Create test users')
    console.log('  node seed-users.js cleanup - Remove test users')
    console.log('')
    console.log('Make sure you have the following environment variables set:')
    console.log('  NEXT_PUBLIC_SUPABASE_URL')
    console.log('  SUPABASE_SERVICE_ROLE_KEY')
  }
}

main().catch(console.error)
