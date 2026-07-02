-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/kbiskmppkshhzciwflfn/sql
-- Adds Total/Relevant experience fields to career_applications

ALTER TABLE career_applications
  ADD COLUMN IF NOT EXISTS total_experience    TEXT,
  ADD COLUMN IF NOT EXISTS relevant_experience TEXT;
