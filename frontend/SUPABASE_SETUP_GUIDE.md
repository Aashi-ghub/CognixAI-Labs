# Supabase Database Setup Guide - Complete from Scratch

This guide will walk you through setting up your Supabase database from scratch.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Fill in the project details:
   - **Name**: Your project name (e.g., "CognixAI Labs")
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is fine for development
5. Click **"Create new project"**
6. Wait 2-3 minutes for the project to be provisioned

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** (gear icon) → **API**
2. You'll see three important values:
   - **Project URL** - This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** - This is your `SUPABASE_SERVICE_ROLE_KEY` (click "Reveal" to see it)

⚠️ **IMPORTANT**: The `service_role` key has admin privileges. Never expose it to the client-side code!

## Step 3: Set Up Environment Variables

1. In your project root (`frontend/` directory), create a `.env` file (if it doesn't exist)
2. Copy the contents from `env.example`:
   ```bash
   cp env.example .env
   ```
3. Open `.env` and fill in your values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```
4. Replace the placeholder values with your actual keys from Step 2

## Step 4: Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open the file `supabase-complete-setup.sql` in your project
4. Copy the entire contents of that file
5. Paste it into the SQL Editor
6. Click **"Run"** (or press `Ctrl+Enter` / `Cmd+Enter`)
7. You should see "Success. No rows returned" - this means it worked!

## Step 5: Verify the Setup

1. In Supabase dashboard, go to **Table Editor** (left sidebar)
2. You should see these tables:
   - ✅ `profiles`
   - ✅ `consultation_requests`
   - ✅ `contact_submissions`

3. Click on each table to verify the columns are correct

## Step 6: Test the Connection

1. Restart your Next.js development server:
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart it
   npm run dev
   ```

2. Try submitting a form on your website
3. Check the Supabase dashboard → **Table Editor** → `contact_submissions` or `consultation_requests`
4. You should see the new submission appear!

## Step 7: Configure Authentication (Optional - if using auth)

If you plan to use user authentication:

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Enable **Email** provider (already enabled by default)
3. Enable **Google** provider if you want Google OAuth:
   - Click on Google
   - Toggle "Enable Google provider"
   - Add your Google OAuth credentials (Client ID and Secret)
   - Get these from [Google Cloud Console](https://console.cloud.google.com)

4. Go to **Authentication** → **URL Configuration**
5. Add your site URLs:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: 
     - `http://localhost:3000/**`
     - `https://your-production-domain.com/**`

## Troubleshooting

### Error: "fetch failed"
- ✅ Check that your `.env` file has the correct values
- ✅ Make sure you restarted the dev server after adding `.env`
- ✅ Verify your Supabase project is not paused (check dashboard)

### Error: "relation does not exist"
- ✅ Make sure you ran the SQL schema (Step 4)
- ✅ Check that you're using the correct table names

### Error: "permission denied"
- ✅ Verify RLS (Row Level Security) policies are set up correctly
- ✅ Check that you're using `SUPABASE_SERVICE_ROLE_KEY` in API routes (not the anon key)

### Tables not showing up
- ✅ Refresh the Table Editor page
- ✅ Check the SQL Editor for any error messages
- ✅ Make sure you ran the complete SQL file

## Database Schema Overview

### `profiles` table
- Stores user profile information
- Automatically created when a user signs up
- Linked to Supabase Auth

### `consultation_requests` table
- Stores consultation form submissions
- Includes fields for AI Workflow Audit form
- Used by `/api/consultation` endpoint

### `contact_submissions` table
- Stores contact form submissions
- Used by `/api/contact` endpoint

## Next Steps

Once your database is set up:
1. Test form submissions
2. Check the Supabase dashboard to see data appearing
3. Set up authentication if needed
4. Configure production environment variables when deploying

---

**Need Help?** Check the Supabase documentation: https://supabase.com/docs

