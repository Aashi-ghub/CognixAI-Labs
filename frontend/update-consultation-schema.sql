-- Migration: Add new fields to consultation_requests table for AI Workflow Audit
-- Run this in your Supabase SQL Editor
-- This adds fields for the new 3-step popup flow

-- Add new columns to consultation_requests table
ALTER TABLE public.consultation_requests 
ADD COLUMN IF NOT EXISTS industry text,
ADD COLUMN IF NOT EXISTS team_size text,
ADD COLUMN IF NOT EXISTS challenge text,
ADD COLUMN IF NOT EXISTS wants_call boolean DEFAULT false;

-- Add a comment to document the new fields
COMMENT ON COLUMN public.consultation_requests.industry IS 'Industry selected in AI Workflow Audit (Tech, Finance, Marketing, Real Estate, Other)';
COMMENT ON COLUMN public.consultation_requests.team_size IS 'Team size selected in AI Workflow Audit (1-10, 10-50, 50-200, 200+)';
COMMENT ON COLUMN public.consultation_requests.challenge IS 'Biggest challenge described by the user in the audit form';
COMMENT ON COLUMN public.consultation_requests.wants_call IS 'Whether the user wants a strategy call (true) or just the report (false)';

-- Optional: Create indexes for filtering/analytics
-- These help with queries filtering by industry, call preference, or date ranges
CREATE INDEX IF NOT EXISTS idx_consultation_requests_industry ON public.consultation_requests(industry) WHERE industry IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_consultation_requests_wants_call ON public.consultation_requests(wants_call) WHERE wants_call = true;
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON public.consultation_requests(created_at DESC);

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

