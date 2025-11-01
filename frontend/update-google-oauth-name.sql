-- Migration: Update handle_new_user function to properly extract full_name from Google OAuth
-- Run this in your Supabase SQL Editor
-- This ensures Google OAuth users get their full_name properly saved

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_full_name text;
  v_first_name text;
  v_last_name text;
  v_given_name text;
  v_family_name text;
  v_name_from_google text;
BEGIN
  -- Extract names from various sources (supports both email signup and Google OAuth)
  v_given_name := coalesce(new.raw_user_meta_data->>'given_name', new.raw_user_meta_data->>'first_name');
  v_family_name := coalesce(new.raw_user_meta_data->>'family_name', new.raw_user_meta_data->>'last_name');
  v_name_from_google := coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name');
  
  -- Determine full_name: prefer Google's full_name/name, then construct from parts
  IF v_name_from_google IS NOT NULL AND v_name_from_google != '' THEN
    v_full_name := v_name_from_google;
    -- Try to split Google full_name into first_name and last_name
    IF v_given_name IS NULL OR v_given_name = '' THEN
      -- Split by space: take first word as first_name, rest as last_name
      v_first_name := split_part(v_name_from_google, ' ', 1);
      v_last_name := trim(substring(v_name_from_google from length(v_first_name) + 1));
      IF v_last_name = '' THEN
        v_last_name := NULL;
      END IF;
    ELSE
      v_first_name := v_given_name;
      v_last_name := v_family_name;
    END IF;
  ELSIF v_given_name IS NOT NULL OR v_family_name IS NOT NULL OR 
        (new.raw_user_meta_data->>'first_name' IS NOT NULL) OR 
        (new.raw_user_meta_data->>'last_name' IS NOT NULL) THEN
    -- Construct from parts
    v_first_name := coalesce(v_given_name, new.raw_user_meta_data->>'first_name');
    v_last_name := coalesce(v_family_name, new.raw_user_meta_data->>'last_name');
    v_full_name := trim(concat(
      coalesce(v_first_name, ''),
      ' ',
      coalesce(v_last_name, '')
    ));
    IF v_full_name = '' OR v_full_name = ' ' THEN
      v_full_name := NULL;
    END IF;
  ELSE
    -- Fallback: use email username or empty
    v_full_name := NULL;
    v_first_name := NULL;
    v_last_name := NULL;
  END IF;
  
  INSERT INTO public.profiles (
    id, 
    email, 
    first_name, 
    last_name, 
    company, 
    phone,
    avatar_url,
    full_name
  )
  VALUES (
    new.id, 
    new.email,
    v_first_name,
    v_last_name,
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'),
    v_full_name
  )
  ON CONFLICT (id) DO UPDATE SET
    first_name = coalesce(excluded.first_name, profiles.first_name),
    last_name = coalesce(excluded.last_name, profiles.last_name),
    company = coalesce(excluded.company, profiles.company),
    phone = coalesce(excluded.phone, profiles.phone),
    avatar_url = coalesce(excluded.avatar_url, profiles.avatar_url),
    full_name = coalesce(excluded.full_name, profiles.full_name),
    updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update existing users who logged in with Google but don't have full_name
-- This backfills missing full_name for existing Google OAuth users
UPDATE public.profiles p
SET 
  full_name = COALESCE(
    (SELECT raw_user_meta_data->>'full_name' FROM auth.users WHERE id = p.id),
    (SELECT raw_user_meta_data->>'name' FROM auth.users WHERE id = p.id),
    p.full_name
  ),
  first_name = COALESCE(
    p.first_name,
    (SELECT split_part(COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', ''), ' ', 1) 
     FROM auth.users WHERE id = p.id)
  ),
  last_name = COALESCE(
    p.last_name,
    (SELECT trim(substring(COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', '') 
      FROM length(split_part(COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', ''), ' ', 1)) + 1))
     FROM auth.users WHERE id = p.id)
  ),
  avatar_url = COALESCE(
    p.avatar_url,
    (SELECT raw_user_meta_data->>'avatar_url' FROM auth.users WHERE id = p.id),
    (SELECT raw_user_meta_data->>'picture' FROM auth.users WHERE id = p.id)
  )
WHERE 
  p.full_name IS NULL 
  AND EXISTS (
    SELECT 1 FROM auth.users u 
    WHERE u.id = p.id 
    AND (u.raw_user_meta_data->>'full_name' IS NOT NULL 
         OR u.raw_user_meta_data->>'name' IS NOT NULL)
  );

-- Verify the function was updated
SELECT 
  routine_name, 
  routine_type 
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user' 
AND routine_schema = 'public';

