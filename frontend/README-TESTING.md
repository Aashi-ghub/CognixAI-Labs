# CognixAI Labs - User Signup Testing Guide

This guide explains how to test the user signup functionality with all the new fields we've added.

## 🗄️ Database Setup

### 1. Update Database Schema

First, you need to update your Supabase database with the new schema. Run the SQL commands from `supabase.sql` in your Supabase dashboard:

```sql
-- Add new columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS company text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS updated_at timestamptz default now();

-- Update the handle_new_user function (see supabase.sql for full function)
```

### 2. Environment Variables

Make sure you have these environment variables in your `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🧪 Testing Process

### Step 1: Test Database Connection

```bash
npm run test:db
```

This will:
- ✅ Test database connection
- ✅ Verify profiles table schema
- ✅ Check existing users
- ✅ Validate all required columns exist

### Step 2: Create Test Users

```bash
npm run seed
```

This creates 5 test users with different field combinations:
- **john.doe@example.com** - Complete profile with all fields
- **jane.smith@techcorp.com** - Complete profile with all fields  
- **mike.johnson@startup.io** - Complete profile with all fields
- **sarah.wilson@freelance.com** - Missing company field (optional)
- **alex.brown@enterprise.com** - Missing phone field (optional)

### Step 3: Test Signup Form

1. Go to your login page (`/login`)
2. Click "Sign up" to switch to signup mode
3. Try creating a new account with the form
4. Verify all fields are saved correctly

### Step 4: Test Login

Use the seeded test accounts to test login:
- Email: `john.doe@example.com`
- Password: `TestPassword123!`

### Step 5: Clean Up (Optional)

```bash
npm run seed:cleanup
```

This removes all test users from the database.

## 🔍 What Gets Tested

### Form Fields
- ✅ First Name (required for signup)
- ✅ Last Name (required for signup)
- ✅ Email (required)
- ✅ Company (optional)
- ✅ Phone (optional)
- ✅ Password (required)
- ✅ Terms & Conditions (required for signup)

### Database Storage
- ✅ User created in `auth.users` table
- ✅ Profile created in `public.profiles` table
- ✅ All metadata fields saved correctly
- ✅ Full name auto-generated from first + last name
- ✅ Timestamps (created_at, updated_at) set correctly

### Validation
- ✅ Required field validation
- ✅ Email format validation
- ✅ Terms acceptance validation
- ✅ Password strength requirements

## 🐛 Troubleshooting

### Common Issues

1. **"Missing environment variables"**
   - Check your `.env` file has all required variables
   - Make sure `SUPABASE_SERVICE_ROLE_KEY` is set

2. **"Profiles table error"**
   - Run the updated SQL schema in Supabase dashboard
   - Check that all columns exist in the profiles table

3. **"User creation failed"**
   - Verify Supabase project is active
   - Check authentication settings in Supabase dashboard
   - Ensure email confirmation is configured

4. **"Fields not saving"**
   - Check the `handle_new_user()` function is updated
   - Verify the trigger is active on `auth.users` table

### Debug Commands

```bash
# Test database connection only
npm run test:db

# Create test users
npm run seed

# Remove test users
npm run seed:cleanup
```

## 📊 Expected Results

After running `npm run seed`, you should see:

```
🌱 Starting user seeding process...

📝 Creating user: john.doe@example.com
✅ User created successfully: john.doe@example.com
   - User ID: [uuid]
   - Name: John Doe
   - Company: Acme Corporation
   - Phone: +1 (555) 123-4567
✅ Profile verified in database:
   - First Name: John
   - Last Name: Doe
   - Company: Acme Corporation
   - Phone: +1 (555) 123-4567
   - Full Name: John Doe

📊 Seeding Summary:
   ✅ Successful: 5
   ❌ Errors: 0
   📝 Total: 5

🎉 Seeding completed! You can now test the login page with these users:
   📧 john.doe@example.com | 🔑 TestPassword123!
   📧 jane.smith@techcorp.com | 🔑 SecurePass456!
   📧 mike.johnson@startup.io | 🔑 StartupPass789!
   📧 sarah.wilson@freelance.com | 🔑 FreelancePass321!
   📧 alex.brown@enterprise.com | 🔑 EnterprisePass654!
```

## 🎯 Success Criteria

The signup process is working correctly when:

1. ✅ All form fields are displayed for signup
2. ✅ Required field validation works
3. ✅ User account is created in Supabase Auth
4. ✅ Profile record is created with all fields
5. ✅ User can log in with created credentials
6. ✅ All user data is accessible in the profiles table
