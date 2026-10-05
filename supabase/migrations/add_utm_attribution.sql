-- UTM / click-ID attribution captured on every form submission.
-- Safe to run more than once. Run in the Supabase SQL editor.
-- The site code keeps working if this has not been run yet (it falls back to
-- saving without these columns), but attribution is only stored after it runs.

-- leads already has utm_source, utm_medium, utm_campaign
alter table leads
  add column if not exists utm_term     text,
  add column if not exists utm_content  text,
  add column if not exists gclid        text,
  add column if not exists fbclid       text,
  add column if not exists msclkid      text,
  add column if not exists landing_page text,
  add column if not exists referrer     text,
  add column if not exists attribution  jsonb;

alter table contact_submissions
  add column if not exists utm_source   text,
  add column if not exists utm_medium   text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term     text,
  add column if not exists utm_content  text,
  add column if not exists gclid        text,
  add column if not exists fbclid       text,
  add column if not exists msclkid      text,
  add column if not exists landing_page text,
  add column if not exists referrer     text,
  add column if not exists attribution  jsonb;

alter table newsletter_subscribers
  add column if not exists utm_source   text,
  add column if not exists utm_medium   text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term     text,
  add column if not exists utm_content  text,
  add column if not exists gclid        text,
  add column if not exists fbclid       text,
  add column if not exists msclkid      text,
  add column if not exists landing_page text,
  add column if not exists referrer     text,
  add column if not exists attribution  jsonb;

alter table whitepaper_subscribers
  add column if not exists utm_source   text,
  add column if not exists utm_medium   text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term     text,
  add column if not exists utm_content  text,
  add column if not exists gclid        text,
  add column if not exists fbclid       text,
  add column if not exists msclkid      text,
  add column if not exists landing_page text,
  add column if not exists referrer     text,
  add column if not exists attribution  jsonb;

alter table career_applications
  add column if not exists utm_source   text,
  add column if not exists utm_medium   text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term     text,
  add column if not exists utm_content  text,
  add column if not exists gclid        text,
  add column if not exists fbclid       text,
  add column if not exists msclkid      text,
  add column if not exists landing_page text,
  add column if not exists referrer     text,
  add column if not exists attribution  jsonb;
