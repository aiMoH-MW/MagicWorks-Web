@AGENTS.md

# MagicWorks Project — Claude Rules

## Critical: Supabase Client Usage

**NEVER use the anon `supabase` client in API routes (`app/api/**`).**

All API routes must use `createServiceClient()` from `@/lib/supabase`.

```typescript
// CORRECT — use this in all app/api/ routes
import { createServiceClient } from "@/lib/supabase";
const svc = createServiceClient();
const { error } = await svc.from("table").insert({...});

// WRONG — this will throw at runtime in API routes
import { supabase } from "@/lib/supabase"; // ESLint will also flag this as an error
```

**Why:** The anon key has INSERT-only RLS. Any `.select()`, `.update()`, or `.delete()` in an API route using the anon client will be silently blocked by Supabase RLS, causing 500 errors. The `supabase` proxy now throws at runtime if called server-side, and ESLint is configured to flag the import as an error.

The anon `supabase` export is for **browser/client components only** (e.g. real-time subscriptions).

---

## Email Notifications

All notification emails route through `lib/email.ts` → `sendNotification(subject, html)`.
- Uses Nodemailer + Amazon SES SMTP (port 465, SMTP_SECURE=true)
- **Non-career forms** (contact, leads, subscribe) → `sales@magicworksitsolutions.com` via `lib/email.ts`
- **Career applications** → `careers@magicworksitsolutions.com` — handled directly in `app/api/careers/route.ts` (does NOT use `lib/email.ts`)
- Required env vars: `SMTP_HOST`, `SMTP_PORT=465`, `SMTP_SECURE=true`, `SMTP_USER`, `SMTP_PASS`
- **Always `await sendNotification(...)`** — Vercel terminates serverless functions as soon as the response is sent; fire-and-forget means the email never actually sends

---

## Template Literal Ban in TSX/API files

Do NOT use multi-line template literals inside JSX attributes or when writing to Windows-mounted filesystem paths via Write tool. Use string concatenation instead. The TSX parser trips on multi-line `${}` expressions in className and similar props.

---

## Session Context

Always read `session-log.md` at the start of a new session for a full record of what has been built, decisions made, and pending tasks.

Start new sessions with:
> "Read CLAUDE.md, AGENTS.md, and session-log.md for full project context before responding."
