-- ============================================================
-- MagicWorks Supabase Schema
-- Run this in the Supabase SQL editor to create all tables.
-- ============================================================

-- 1. Leads (discovery call form + service finder)
create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  website     text,
  pillar      text,                      -- which service pillar they came from
  message     text,
  source_page text,                      -- which page the form was on
  utm_source  text,
  utm_medium  text,
  utm_campaign text
);

-- 2. Contact submissions (general /contact form)
create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null
);

-- 3. Career applications
create table if not exists career_applications (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  job_slug        text not null,           -- matches Sanity jobOpening slug
  job_title       text not null,
  name            text not null,
  email           text not null,
  phone           text,
  linkedin_url    text,
  portfolio_url   text,
  cover_letter    text,
  resume_url      text,                    -- Supabase Storage path
  status          text not null default 'new'   -- new | reviewed | shortlisted | rejected
);

-- 4. AI Readiness assessment results
create table if not exists assessment_results (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null,
  name        text,
  company     text,
  score       integer,                     -- 0-100
  band        text,                        -- 'early' | 'aware' | 'ready' | 'advanced'
  answers     jsonb,                       -- full answers object
  recommended_format text                  -- which AI consultation format was recommended
);

-- 5. Newsletter / gated report subscribers
create table if not exists newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique,
  name        text,
  source      text,                        -- 'gated-report' | 'newsletter' | 'assessment'
  report_slug text                         -- if gated-report, which one
);

-- ── Row Level Security ──────────────────────────────────────
-- Allow inserts from the browser (anon key), read only via service role.

alter table leads enable row level security;
create policy "Insert only" on leads for insert with check (true);

alter table contact_submissions enable row level security;
create policy "Insert only" on contact_submissions for insert with check (true);

alter table career_applications enable row level security;
create policy "Insert only" on career_applications for insert with check (true);

alter table assessment_results enable row level security;
create policy "Insert only" on assessment_results for insert with check (true);

alter table newsletter_subscribers enable row level security;
create policy "Insert only" on newsletter_subscribers for insert with check (true);
create policy "Upsert own email" on newsletter_subscribers
  for update using (true) with check (true);

-- ── Storage bucket for resumes ──────────────────────────────
-- Create in Supabase dashboard → Storage → New bucket → 'resumes' (private)
