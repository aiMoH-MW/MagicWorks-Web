# MagicWorks Website — Session Log

> Maintained as per SOP §7.2. Each entry records what was built, decisions made, pending items, and known issues.
> Format: newest session first. Update before switching AI models or ending a sprint.

---

## Session: 5 July 2026 (Mohan / Claude Fable)

### What was built

#### 1. Technical SEO audit (Screaming Frog crawl of 23 June, cross-checked live)
- Full prioritised report: `seo-audit-report-2026-07-05.md`. Crawl-era items already fixed live (security headers, duplicate title suffix, sitemap /insights URLs) documented so they aren't re-worked.

#### 2. P0 SEO fixes (code)
- `app/sitemap.ts`: removed noindexed `/privacy` and `/terms` from sitemap (was contradictory signal to Google).
- `app/(site)/privacy/page.tsx`, `app/(site)/terms/page.tsx`: robots `follow: false` → `follow: true` (keep noindex, stop blocking PageRank flow).
- `app/(site)/blog/[slug]/page.tsx`: Portable Text link renderer now rewrites legacy `/insights/<slug>` in-body links to `/blog/<slug>` (kills ~31 internal 308 hops); whitepapers/reports paths preserved; internal absolute links no longer get `nofollow`/`_blank`.
- `app/(site)/authors/[slug]/page.tsx`: article cards `/insights/` → `/blog/`.
- `app/(site)/insights/[slug]/page.tsx` (legacy route): canonicals + related links → `/blog/`.
- `app/api/indexnow/route.ts`: no longer pings redirecting `/insights/` and `/about/careers/` URLs; bulk list `/insights` → `/blog`.
- `package.json`: build script `next build && next-sitemap` → `next build` (app/sitemap.ts is the real sitemap; next-sitemap output was shadowed). `next-sitemap.config.js` + dependency left in place — remove in a cleanup commit.
- All verified on localhost:3000: 0 remaining `/insights/` article links, sitemap clean, robots correct.

#### 3. New service pages
- NEW `app/(site)/services/web-development/wordpress/page.tsx` — WordPress Development (on-request positioning, honest-note band, when/when-not, stack table, MagicWorks Host callout, process, FAQ, contact form).
- NEW `app/(site)/services/web-development/portals-member-sites/page.tsx` — Portals and Member Sites (AI-native positioning, use cases, process, FAQ, contact form).
- UPDATED `app/(site)/services/web-development/page.tsx` — fixed two broken LEARN MORE hrefs (portals card was pointing to `/services/platform-consultation`, WordPress card to `/contact`).

#### 4. P2 Core Web Vitals fixes
- `sanity/queries.ts`: `getInsightBySlug` body image projection now fetches `asset->metadata.dimensions.width` and `height` — Sanity asset IDs encode native dimensions so this is zero-cost.
- `app/(site)/blog/[slug]/page.tsx`: Portable Text `image` handler now uses `width={imgW}` / `height={imgH}` from Sanity metadata (fallback 1200x675), replacing the broken `width={0} height={0}` that caused 26 Screaming Frog "missing size attributes" flags and CLS. `externalImage` handler (WordPress-import URLs) uses `width={1200}` `height={675}` as fallback — no native dimension data available for external URLs.
- `app/(site)/insights/[slug]/page.tsx`: same image/externalImage handler updates applied (was using `fill` + forced `aspectRatio: "16/9"` container; now uses actual Sanity dimensions with fluid CSS).
- `components/ChatWidget.tsx`: MagicFlow chatbot no longer loads via `strategy="lazyOnload"`. Now deferred to first user interaction (scroll / click / keydown / touchstart) OR 5-second timeout, whichever comes first. Script injected manually via `document.createElement`. Chatbot still opens normally on localhost:3000 — deferral is invisible to the user.

### Pending / carry-forward
- [ ] Commit the above from Windows (sandbox git via mount is unreliable — index.lock + stale file view).
- [ ] P1: shorten blog + case-study titles/H1s (Sanity Studio; `seoTitle` field already exists on insight schema — consider same for caseStudy).
- [ ] P1: truncate careers meta descriptions (~437 chars live) to ~150 in careers/[slug] generateMetadata.
- [ ] P1: whitepaper detail pages missing from sitemap — check `getGatedInsights()` GROQ filter.
- [ ] Optionally bulk-patch Sanity article bodies `/insights/` → `/blog/` (renderer rewrite covers the front end meanwhile).

---

## Session: 2 July 2026 (Mohan / Claude Sonnet)

### What was built

#### 1. Career application form — field reorder + new fields
- New field order: Name, Email, Phone, Total Experience, Relevant Experience, Current CTC, Expected CTC, Resume, Cover Letter, LinkedIn URL.
- Added two new required fields: **Total Experience**, **Relevant Experience** (free text, e.g. "3 years").
- Removed **Portfolio / Work URL** field from the form (not in the requested field list — backend/DB field left intact, just no longer collected).
- Resume upload max size reduced from 5 MB → **2 MB** (still PDF/.doc/.docx only).
- Added hint note under cover letter: "Your cover letter may increase your chances of shortlisting."
- **File:** `app/(site)/careers/[slug]/ApplyForm.tsx`

#### 2. Backend — persist & surface new experience fields
- `app/api/careers/route.ts`: reads `total_experience`/`relevant_experience` from form data, inserts into `career_applications`, includes in HR notification email body, passes to Gemini scoring.
- `lib/gemini-score.ts`: `ApplicationInput` now accepts `total_experience`/`relevant_experience`; included in the scoring prompt context.
- `app/admin/page.tsx`: added both fields to the `Row` interface and the careers table `cols` array so they're visible in the admin dashboard.

#### 3. AI scoring — new "experience fit" dimension
- Added `experience_score` as a 5th scoring dimension (alongside resume, cover, profile, CTC). Weighs `total_experience`/`relevant_experience` against role seniority; relevant experience weighted higher than total experience. Missing/unclear = neutral 50.
- New weights: resume 30% + experience 20% + cover 20% + profile 10% + ctc 20% (was resume 40% + cover 25% + profile 15% + ctc 20%).
- `ScoreBreakdown` type (both `lib/gemini-score.ts` and `app/admin/page.tsx`) now includes `experience_score`; admin score panel shows an "Experience fit" bar.
- No DB migration needed — `ai_score_breakdown` is JSONB, stores the new key automatically. Only new applications get an experience_score; historical rows keep their old 4-field breakdown (panel just won't show that bar for them, no error).

### Pending / carry-forward

- [x] Run `supabase/migrations/add_experience_fields.sql` in Supabase SQL Editor — done 2 Jul 2026, confirmed success by Mohan.
- [ ] Confirm with Mohan whether Portfolio / Work URL should be permanently dropped or re-added elsewhere.

---

## Session: 26 June 2026 (Mohan / Claude Sonnet)

### What was built

#### 1. Admin sidebar collapse toggle
- Added collapse/expand button to admin sidebar.
- Collapsed: 52px wide, icon-only with `title` tooltips. Expanded: 220px with labels and counts.
- State: `sidebarOpen` boolean toggled by arrow button in sidebar header.
- **File:** `app/admin/page.tsx`

#### 2. Gemini AI scoring — model + API key fix
- `gemini-2.0-flash` was deprecated → 404. Tried `gemini-1.5-flash` → also 404.
- Root cause: old GEMINI_API_KEY in Vercel was expired/wrong.
- Fix: new API key created in Google AI Studio (`AQ.Ab8RN6...`), updated in Vercel and `.env.local`.
- Updated model to `gemini-2.5-flash` (thinking model — requires `thinkingConfig: { thinkingBudget: 0 }` to disable thinking output).
- Fixed response parser to skip `thought: true` parts and find the actual text part.
- **File:** `lib/gemini-score.ts`

#### 3. Build failure — corrupted files fix (commit 2e38b4c)
- `app/api/admin/data/route.ts` was truncated (ended at `retu` on line 103) and `lib/gemini-score.ts` had a null byte at line 179.
- Root cause: Linux sandbox writing to Windows-mounted filesystem corrupts files.
- Fix: re-wrote both files clean. **Never use Write tool for large files on Windows-mounted paths — use Edit tool only.**
- Committed as 2e38b4c.

#### 4. Old WordPress URL redirect — /business-challenges
- Added permanent 301 redirects in `next.config.ts`:
  - `/business-challenges/:slug*` → `/services/ai-consultation`
  - `/business-challenges` → `/services`

#### 5. Email notifications — SMTP + await fix (critical)
- **Problem 1:** SMTP port 587 (STARTTLS) was timing out from Vercel. Fixed by switching to port 465 (SSL, `SMTP_SECURE=true`).
- **Problem 2:** `sendNotification` was called without `await` in all three form routes. Vercel kills the function when response returns — fire-and-forget email never actually sent.
- **Fix:** Added `await` to `sendNotification(...)` in all three routes.
- **Files fixed:** `app/api/leads/route.ts`, `app/api/contact/route.ts`, `app/api/subscribe/route.ts`
- **Confirmed working:** Email received at mohang.chute@gmail.com during test (26 Jun 2026, 2:08 PM).

#### 6. Email routing — sales@ and careers@
- Non-career forms (contact, leads, subscribe) → `sales@magicworksitsolutions.com`
- Career applications → `careers@magicworksitsolutions.com` (already set in `app/api/careers/route.ts` via `HR_EMAIL` constant)
- **File:** `lib/email.ts`

---

### Decisions made

| Decision | Reason |
|---|---|
| Always `await sendNotification(...)` | Vercel serverless: function terminates on response — unawaited async work is killed |
| Port 465 (SSL) for SES SMTP | Port 587 (STARTTLS) times out from Vercel network |
| sales@ for all non-career forms | Single inbox for all sales/marketing leads |
| careers@ for career applications | Separate HR inbox; set via HR_EMAIL in careers route |
| Never use Write tool for large files on Windows paths | Causes null bytes / truncation — use Edit tool only |
| gemini-2.5-flash with thinkingBudget: 0 | Current working model; thinking disabled to get clean JSON response |

---

### Pending / carry-forward

- [ ] Backfill ~176 remaining unscored career applications via PowerShell loop to `/api/admin/rescore` with header `x-admin-secret: magicworks-admin-2026`
- [ ] Shorten long blog/insights article titles in Sanity Studio (rendered as H1s > 70 chars on article pages)
- [ ] Set up Custom MAIL FROM domain in AWS SES for `magicworksitsolutions.com` — fixes SPF record warning, improves deliverability (emails may land in spam without it)
- [ ] Verify `sales@` and `careers@` inboxes are monitored / set up in email client

---

### Known issues at end of session

- None active.

---

### Commit reference

```
7ba6c39 test: send notification emails to gmail for deliverability test
(await fix) fix: await sendNotification so emails send before function terminates
(email routing) fix: route form notifications to sales@ and career applications to careers@
```

---

---

## Session: June 2026 (Mohan / Claude Sonnet)

### What was built

#### 1. Careers form — DB save fix (Critical bug)
- **Problem:** `app/api/careers/route.ts` used the anon Supabase client with `.insert().select("id").single()`. The anon key has INSERT-only RLS — SELECT was blocked → 500 error → applications appeared to fail but row was actually inserted.
- **Fix:** Switched to `createServiceClient()`, removed anon `supabase` import.
- **File:** `app/api/careers/route.ts`

#### 2. Contact & leads routes — same RLS fix
- **Problem:** Same pattern — anon client used for DB insert in API routes.
- **Fix:** Both routes now use `createServiceClient()`.
- **Files:** `app/api/contact/route.ts`, `app/api/leads/route.ts`

#### 3. Email notifications via Amazon SES
- **What:** All non-career form submissions now fire a detailed HTML email to mohan@ and swapnil@.
- **Stack:** Nodemailer + Amazon SES SMTP (replaced previous Resend API dependency).
- **SMTP env vars:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` — set in `.env.local` and Vercel.
- **Covered routes:** `/api/contact` (contact page), `/api/leads` (service enquiry, consultation, playbook downloads), `/api/subscribe` (newsletter — was already sending).
- **File:** `lib/email.ts`

#### 4. Admin dashboard — sortable columns + drag scroll
- **Sortable:** Date, Role, AI Score columns — click to toggle asc/desc.
- **Drag scroll:** Mouse drag-to-pan horizontal scroll on the applications table.
- **File:** `app/admin/page.tsx`

#### 5. ApplyForm — CTC placeholder changes
- Current CTC placeholder: `₹3 LPA` (was ₹4.5 LPA)
- Expected CTC placeholder: `₹6 LPA` (removed "stipend if intern")
- Hint text: removed intern-specific line.
- **File:** `app/(site)/careers/[slug]/ApplyForm.tsx`

#### 6. AI scoring for career applications
- Gemini 1.5 Flash scores each application out of 100 on: experience match, skills match, CTC alignment, application quality.
- Score stored in `ai_score` column (Supabase `career_applications` table).
- Scoring is fire-and-forget async — does not block the form submission response.
- **Files:** `app/api/careers/route.ts`, `app/api/admin/rescore/route.ts` (backfill endpoint)

#### 7. Supabase anon client safety guards
- **Runtime guard:** `supabase` proxy in `lib/supabase.ts` now throws immediately with a clear message if accessed server-side (`typeof window === "undefined"`).
- **ESLint rule:** `no-restricted-imports` in `eslint.config.mjs` bans importing `supabase` or `getSupabase` in any `app/api/**` file — shows as a red error in VS Code.
- **File:** `lib/supabase.ts`, `eslint.config.mjs`

#### 8. Keyword SEO Excel
- 65+ keywords across 8 categories with avg monthly searches, competition, CPC, YoY trend.
- 3 sheets: Keyword Research, Page SEO Mapping (11 pages), How to Use.
- **File:** `../MagicWorks_Keyword_SEO_Mapping.xlsx` (in root of MagicWorks Web folder)

---

### Decisions made

| Decision | Reason |
|---|---|
| All API routes must use `createServiceClient()` | Anon key has INSERT-only RLS — SELECT after INSERT silently fails |
| Email via Nodemailer + SES SMTP | Consistent with existing careers email stack; Resend API removed |
| Notify mohan@ + swapnil@ only (removed krutika@) | Per Mohan's instruction |
| Gemini 1.5 Flash for scoring | Fast, cheap, good enough for structured scoring tasks |
| ESLint + runtime guard for anon client | Two-layer protection — catches mistake at lint time AND runtime |

---

#### 9. Em dash audit and removal
- Removed all em dashes from 27+ files (metadata titles, visible content).
- Replaced with colons or commas as appropriate. Code comments and table placeholders left unchanged.
- Commits: d13eb61, 248c386

#### 10. Blog category filter chips
- Built `app/(site)/blog/BlogClient.tsx` — client component with useState filter chips.
- Filter categories: All + dynamic chips from article data. Active = dark indigo fill.
- Commit: (BlogClient.tsx was staged and pushed separately)

#### 11. Case studies — unpublish
- Manually unpublished in Sanity Studio. Only 3 remain on /work:
  - simplidistance-mba-enrollments
  - srj-steel-b2b-digital-presence
  - trexova-wellness-tourism-pipeline

#### 13. Admin sidebar collapse toggle
- Added collapse/expand button to the admin sidebar.
- Collapsed state shows only icons (52px wide) with tooltips; expanded shows full labels and counts.
- State: `sidebarOpen` boolean in AdminPage, toggled by an arrow button in the sidebar header.
- **File:** `app/admin/page.tsx`

#### 12. SEO code fixes (commit a5dde28)
- About page title: shortened from 62 to 52 chars (was over 60-char limit)
- Web development duplicate title: `/services/web-development` title changed to "Web Development Agency in Pune" to differentiate from `/services/web-development/ai-native-websites`
- Audited: meta descriptions (all over-155 cases were in JSON-LD schema, not HTML meta — no fix needed), images (all use proper Next.js Image component), static H1s (all under 70 chars)
- CMS H1s >70 chars: these are Sanity article titles — need to be shortened in Sanity Studio directly

---

### Pending / carry-forward

- [ ] Backfill 199 unscored applications via PowerShell loop to `/api/admin/rescore` with header `x-admin-secret: magicworks-admin-2026`
- [ ] Shorten long blog/insights article titles in Sanity Studio (rendered as H1s > 70 chars on article pages)
- [ ] Verify Vercel build passes (check Vercel dashboard after latest push)

---

### Known issues at end of session

- None active. All static SEO code fixes committed and pushed.

---

### Commit reference

```
git log --oneline (latest):
a5dde28 seo: fix page title length and duplicate title issues
248c386 fix: remove em dashes from all site pages
d13eb61 feat: blog category filter, em dash fixes, Supabase guards
fix: use service client for career insert to bypass RLS SELECT restriction
feat: email notifications, admin sort/drag-scroll, CTC placeholder fixes
guard: prevent anon Supabase client in API routes
```

---

*Next session: Start with "Read CLAUDE.md, AGENTS.md, and session-log.md for full project context."*
