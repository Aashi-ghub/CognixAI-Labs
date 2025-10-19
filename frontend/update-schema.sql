-- Update existing profiles table to add new columns
-- Run this in your Supabase SQL Editor

-- Add new columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS company text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS updated_at timestamptz default now();

-- Update the handle_new_user function to save additional user data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    first_name, 
    last_name, 
    company, 
    phone,
    full_name
  )
  VALUES (
    new.id, 
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'phone',
    CONCAT(
      COALESCE(new.raw_user_meta_data->>'first_name', ''),
      ' ',
      COALESCE(new.raw_user_meta_data->>'last_name', '')
    )
  )
  ON CONFLICT (id) DO UPDATE SET
    first_name = COALESCE(excluded.first_name, profiles.first_name),
    last_name = COALESCE(excluded.last_name, profiles.last_name),
    company = COALESCE(excluded.company, profiles.company),
    phone = COALESCE(excluded.phone, profiles.phone),
    full_name = COALESCE(excluded.full_name, profiles.full_name),
    updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verify the trigger exists (it should already exist from the original setup)
-- If not, uncomment the lines below:
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
-- AFTER INSERT ON auth.users
-- FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Test the function by checking if it exists
SELECT 
  routine_name, 
  routine_type 
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user' 
AND routine_schema = 'public';
