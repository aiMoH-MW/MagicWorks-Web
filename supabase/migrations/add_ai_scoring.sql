-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/kbiskmppkshhzciwflfn/sql
-- Adds CTC fields + AI scoring columns to career_applications

ALTER TABLE career_applications
  ADD COLUMN IF NOT EXISTS current_ctc        TEXT,
  ADD COLUMN IF NOT EXISTS expected_ctc       TEXT,
  ADD COLUMN IF NOT EXISTS ai_score           INTEGER,
  ADD COLUMN IF NOT EXISTS ai_score_breakdown JSONB,
  ADD COLUMN IF NOT EXISTS ai_score_label     TEXT,
  ADD COLUMN IF NOT EXISTS ai_score_summary   TEXT,
  ADD COLUMN IF NOT EXISTS ai_scored_at       TIMESTAMPTZ;

-- Optional: index for sorting by score in the admin
CREATE INDEX IF NOT EXISTS idx_career_applications_ai_score
  ON career_applications (ai_score DESC NULLS LAST);
