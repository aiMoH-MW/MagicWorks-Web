/**
 * Who gets notified when a lead comes in from a paid-ads landing page.
 *
 * Every landing page lead is saved to the `leads` table (visible in /admin)
 * and emailed. By default the email goes to sales@ (see lib/email.ts). To
 * route a campaign to its owner as well, set the matching env var in Vercel
 * to one or more comma-separated addresses, e.g.
 *
 *   LEAD_NOTIFY_GOOGLE_ADS=name@magicworksitsolutions.com
 *   LEAD_NOTIFY_META_ADS=name@magicworksitsolutions.com,other@magicworksitsolutions.com
 *   LEAD_NOTIFY_WEB_DEV=name@magicworksitsolutions.com
 *
 * sales@ always stays on the email, so nothing is missed if the variable is
 * unset or mistyped.
 */

/** Always notified for every landing-page lead (sales@ is added in lib/email.ts). */
const DEFAULT_LANDING_RECIPIENTS = ["purva.desai@magicworksitsolutions.com"];

interface LandingRoute {
  label: string;
  envKey: string;
}

const LANDING_ROUTES: Record<string, LandingRoute> = {
  "/google-ads-agency-pune": { label: "Google Ads LP", envKey: "LEAD_NOTIFY_GOOGLE_ADS" },
  "/meta-ads-agency-pune": { label: "Meta Ads LP", envKey: "LEAD_NOTIFY_META_ADS" },
  "/seo-aeo-agency-pune": { label: "SEO & AEO LP", envKey: "LEAD_NOTIFY_SEO_AEO" },
  "/web-development-agency-pune": { label: "Web Dev LP", envKey: "LEAD_NOTIFY_WEB_DEV" },
};

export function resolveLandingRoute(sourcePage?: string | null): {
  label: string | null;
  recipients: string[];
} {
  if (!sourcePage) return { label: null, recipients: [] };
  const route = LANDING_ROUTES[sourcePage.replace(/\/+$/, "")];
  if (!route) return { label: null, recipients: [] };

  const extra = (process.env[route.envKey] ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s));

  // Purva gets every landing-page lead; env vars can add more people per campaign.
  const recipients = Array.from(new Set([...DEFAULT_LANDING_RECIPIENTS, ...extra]));

  return { label: route.label, recipients };
}
