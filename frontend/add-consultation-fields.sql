-- Migration: Add email, phone, company_website, and automation_requirements fields to consultation_requests table
-- Run this in your Supabase SQL Editor

-- Add new columns to consultation_requests table
ALTER TABLE public.consultation_requests 
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS company_website text,
ADD COLUMN IF NOT EXISTS automation_requirements text;

-- Add comments to document the new fields
COMMENT ON COLUMN public.consultation_requests.email IS 'Email address from the consultation form';
COMMENT ON COLUMN public.consultation_requests.phone IS 'Phone number from the consultation form';
COMMENT ON COLUMN public.consultation_requests.company_website IS 'Company website URL (optional)';
COMMENT ON COLUMN public.consultation_requests.automation_requirements IS 'Description of automation requirements from the form';

-- Verify the changes
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'consultation_requests'
ORDER BY ordinal_position;

