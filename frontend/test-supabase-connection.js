/**
 * Test script to verify Supabase connection
 * Run with: node test-supabase-connection.js
 */

require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

async function testConnection() {
  console.log('🔍 Testing Supabase Connection...\n');

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('📋 Environment Variables:');
  console.log(`  ✅ NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✓ Set' : '✗ Missing'}`);
  console.log(`  ✅ SUPABASE_SERVICE_ROLE_KEY: ${serviceKey ? '✓ Set' : '✗ Missing'}`);
  console.log(`  ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: ${anonKey ? '✓ Set' : '✗ Missing'}\n`);

  if (!supabaseUrl || !serviceKey) {
    console.error('❌ Missing required environment variables!');
    process.exit(1);
  }

  // Validate URL format
  try {
    new URL(supabaseUrl);
    console.log('✅ Supabase URL format is valid\n');
  } catch (error) {
    console.error('❌ Invalid Supabase URL format:', error.message);
    process.exit(1);
  }

  // Create Supabase client
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log('🔌 Testing database connection...\n');

  // Test 1: Check if tables exist
  console.log('Test 1: Checking tables...');
  try {
    const { data: consultationData, error: consultationError } = await supabase
      .from('consultation_requests')
      .select('id')
      .limit(1);

    if (consultationError) {
      console.log('  ⚠️  consultation_requests table:', consultationError.message);
      if (consultationError.message.includes('does not exist')) {
        console.log('  💡 Run the SQL schema in Supabase SQL Editor!');
      }
    } else {
      console.log('  ✅ consultation_requests table exists');
    }

    const { data: contactData, error: contactError } = await supabase
      .from('contact_submissions')
      .select('id')
      .limit(1);

    if (contactError) {
      console.log('  ⚠️  contact_submissions table:', contactError.message);
      if (contactError.message.includes('does not exist')) {
        console.log('  💡 Run the SQL schema in Supabase SQL Editor!');
      }
    } else {
      console.log('  ✅ contact_submissions table exists');
    }

    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (profilesError) {
      console.log('  ⚠️  profiles table:', profilesError.message);
    } else {
      console.log('  ✅ profiles table exists');
    }
  } catch (error) {
    console.error('  ❌ Error checking tables:', error.message);
  }

  console.log('\n');

  // Test 2: Test insert (will rollback/delete after)
  console.log('Test 2: Testing insert operation...');
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      message: 'This is a test message - can be deleted'
    };

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(testData)
      .select();

    if (error) {
      console.log('  ❌ Insert failed:', error.message);
      if (error.details) console.log('  Details:', error.details);
      if (error.hint) console.log('  Hint:', error.hint);
    } else {
      console.log('  ✅ Insert successful!');
      console.log('  📝 Created record ID:', data[0].id);

      // Clean up: Delete the test record
      const { error: deleteError } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', data[0].id);

      if (deleteError) {
        console.log('  ⚠️  Could not delete test record:', deleteError.message);
      } else {
        console.log('  🧹 Test record cleaned up');
      }
    }
  } catch (error) {
    console.error('  ❌ Error during insert test:', error.message);
  }

  console.log('\n');
  console.log('✅ Connection test complete!');
  console.log('\n💡 Next steps:');
  console.log('   1. If tables are missing, run supabase-complete-setup.sql in Supabase SQL Editor');
  console.log('   2. Restart your Next.js dev server');
  console.log('   3. Test form submissions on your website');
}

testConnection().catch(console.error);

