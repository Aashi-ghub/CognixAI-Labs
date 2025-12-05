# Supabase Quick Start Checklist

Follow these steps in order:

## ✅ Step 1: Create Supabase Project
- [ ] Go to https://supabase.com and sign in
- [ ] Click "New Project"
- [ ] Fill in project details and create
- [ ] Wait for project to be ready (~2-3 minutes)

## ✅ Step 2: Get API Keys
- [ ] Go to Settings → API
- [ ] Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` https://wyqhofuwxzyyjnffavgq.supabase.co
- [ ] Copy **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY` eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5cWhvZnV3eHp5eWpuZmZhdmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODM1ODMsImV4cCI6MjA4MDA1OTU4M30.Tpx1oJxHeTdPWsgyFhBG4BGj9HBveDFrABtxXT4Bdzo
- [ ] Click "Reveal" on **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5cWhvZnV3eHp5eWpuZmZhdmdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDQ4MzU4MywiZXhwIjoyMDgwMDU5NTgzfQ.oF5oekaf0y9E8MUsg1aLeTF_aik-aAeMMF8ScY8A-h0

## ✅ Step 3: Set Environment Variables
- [ ] Create `.env` file in `frontend/` directory
- [ ] Add your three keys from Step 2
- [ ] Save the file

## ✅ Step 4: Run Database Schema
- [ ] Open Supabase Dashboard → SQL Editor
- [ ] Click "New query"
- [ ] Open `supabase-complete-setup.sql` from your project
- [ ] Copy entire file contents
- [ ] Paste into SQL Editor
- [ ] Click "Run" (or Ctrl+Enter)
- [ ] Should see "Success. No rows returned"

## ✅ Step 5: Verify Tables
- [ ] Go to Table Editor in Supabase
- [ ] Verify you see: `profiles`, `consultation_requests`, `contact_submissions`

## ✅ Step 6: Test Connection
- [ ] Restart Next.js dev server (`npm run dev`)
- [ ] Submit a test form on your website
- [ ] Check Supabase Table Editor to see the data appear

## 🎉 Done!

If you encounter any errors, check `SUPABASE_SETUP_GUIDE.md` for detailed troubleshooting.

