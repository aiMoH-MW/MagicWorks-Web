/**
 * Marketing attribution (UTM + click IDs) shared by the browser capture
 * component and the server-side form API routes.
 *
 * Flow:
 *   1. components/AttributionCapture.tsx runs on every page load. If the URL
 *      has utm_* / click-id params it stores them in a first-party cookie
 *      (`mw_attr`) as the "last touch"; the very first visit is also kept as
 *      the "first touch" (never overwritten).
 *   2. Every form POSTs to an /api route on the same origin, so the browser
 *      sends that cookie automatically: no form component needs to change.
 *   3. API routes call getAttribution(req) and save the result with the lead.
 */

export const ATTRIBUTION_COOKIE = "mw_attr";
export const ATTRIBUTION_MAX_AGE_DAYS = 90;

export const TOUCH_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

export type TouchKey = (typeof TOUCH_KEYS)[number];

export type Touch = Partial<Record<TouchKey, string>> & {
  landing_page?: string;
  referrer?: string;
  ts?: string;
};

export type Attribution = { ft?: Touch; lt?: Touch };

const MAX_LEN = 200;

/** Keep only known keys, trimmed and length-capped (cookie is user-controlled input). */
export function sanitizeTouch(input: unknown): Touch | undefined {
  if (!input || typeof input !== "object") return undefined;
  const src = input as Record<string, unknown>;
  const out: Touch = {};
  for (const key of [...TOUCH_KEYS, "landing_page", "referrer", "ts"] as const) {
    const v = src[key];
    if (typeof v === "string" && v.trim()) out[key] = v.trim().slice(0, MAX_LEN);
  }
  return Object.keys(out).length ? out : undefined;
}

export function parseAttribution(raw: string | undefined | null): Attribution {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    return { ft: sanitizeTouch(parsed?.ft), lt: sanitizeTouch(parsed?.lt) };
  } catch {
    return {};
  }
}

/** Does this touch carry any campaign signal (as opposed to just a landing page)? */
export function hasCampaignSignal(t?: Touch): boolean {
  return !!t && TOUCH_KEYS.some((k) => !!t[k]);
}

export type AttributionFields = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  fbclid: string | null;
  msclkid: string | null;
  landing_page: string | null;
  referrer: string | null;
  attribution: Attribution | null;
};

/**
 * Flatten to DB-ready columns. Campaign fields use last touch, falling back to
 * first touch; landing page and referrer are from the first touch. The full
 * first + last touch is kept in the `attribution` jsonb column.
 */
export function flattenAttribution(
  attr: Attribution,
  fallback: Partial<Record<TouchKey, string | null>> = {}
): AttributionFields {
  const pick = (k: TouchKey) => attr.lt?.[k] ?? attr.ft?.[k] ?? fallback[k] ?? null;
  const hasAny = !!(attr.ft || attr.lt);
  return {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_term: pick("utm_term"),
    utm_content: pick("utm_content"),
    gclid: pick("gclid"),
    fbclid: pick("fbclid"),
    msclkid: pick("msclkid"),
    landing_page: attr.ft?.landing_page ?? attr.lt?.landing_page ?? null,
    referrer: attr.ft?.referrer ?? attr.lt?.referrer ?? null,
    attribution: hasAny ? attr : null,
  };
}

/** Read attribution from an incoming API request (cookie first, query string as fallback). */
export function getAttribution(req: {
  cookies: { get(name: string): { value: string } | undefined };
  nextUrl: { searchParams: URLSearchParams };
}): AttributionFields {
  const attr = parseAttribution(req.cookies.get(ATTRIBUTION_COOKIE)?.value);
  const sp = req.nextUrl.searchParams;
  const fallback: Partial<Record<TouchKey, string | null>> = {};
  for (const k of TOUCH_KEYS) fallback[k] = sp.get(k);
  return flattenAttribution(attr, fallback);
}

/** Columns that are new (utm_source/medium/campaign already exist on `leads`). */
export function extraColumns(a: AttributionFields, includeCoreUtm: boolean) {
  const extra: Record<string, unknown> = {
    utm_term: a.utm_term,
    utm_content: a.utm_content,
    gclid: a.gclid,
    fbclid: a.fbclid,
    msclkid: a.msclkid,
    landing_page: a.landing_page,
    referrer: a.referrer,
    attribution: a.attribution,
  };
  if (includeCoreUtm) {
    extra.utm_source = a.utm_source;
    extra.utm_medium = a.utm_medium;
    extra.utm_campaign = a.utm_campaign;
  }
  return extra;
}

/**
 * Run a DB write with the attribution columns. If the migration hasn't been
 * applied yet (undefined column), retry once without them so a form submission
 * is never lost because of tracking.
 */
export async function withAttributionFallback<R extends { error: { code?: string; message?: string } | null }>(
  run: (extra: Record<string, unknown>) => PromiseLike<R>,
  extra: Record<string, unknown>
): Promise<R> {
  const first = await run(extra);
  const code = first.error?.code;
  const msg = first.error?.message ?? "";
  const missingColumn =
    code === "42703" || code === "PGRST204" || /column .* does not exist|Could not find the .* column/i.test(msg);
  if (first.error && missingColumn) {
    console.warn("[attribution] columns missing, saving without them. Run supabase/migrations/add_utm_attribution.sql");
    return run({});
  }
  return first;
}

/** Compact one-line summary for notification emails. */
export function attributionSummary(a: AttributionFields): string {
  const parts = [
    a.utm_source && `source: ${a.utm_source}`,
    a.utm_medium && `medium: ${a.utm_medium}`,
    a.utm_campaign && `campaign: ${a.utm_campaign}`,
    a.utm_term && `term: ${a.utm_term}`,
    a.utm_content && `content: ${a.utm_content}`,
    a.gclid && "gclid: yes",
    a.landing_page && `landing: ${a.landing_page}`,
    a.referrer && `referrer: ${a.referrer}`,
  ].filter(Boolean);
  return parts.join(" | ");
}
