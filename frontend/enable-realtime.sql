-- Enable Realtime for form submission tables
-- Run this in Supabase SQL Editor to enable real-time updates

-- Enable Realtime for consultation_requests table
ALTER PUBLICATION supabase_realtime ADD TABLE consultation_requests;

-- Enable Realtime for contact_submissions table
ALTER PUBLICATION supabase_realtime ADD TABLE contact_submissions;

-- Verify Realtime is enabled
SELECT 
  schemaname,
  tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
  AND tablename IN ('consultation_requests', 'contact_submissions');

