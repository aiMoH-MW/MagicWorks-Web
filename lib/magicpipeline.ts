/**
 * Syncs website form submissions into the MagicPipeline CRM.
 *
 * Reuses MagicPipeline's generic "WordPress Leads" webhook
 * (Settings → Integrations → WordPress Leads in MagicPipeline). That endpoint
 * doesn't actually care whether the source is WordPress — it's a plugin-agnostic
 * lead-intake API that accepts flexible field names, requires only an email or
 * phone, dedupes by email/phone, and routes into the configured workspace/list.
 *
 * This must run server-side only (it uses a secret). Every call is wrapped so a
 * MagicPipeline outage or misconfiguration never breaks the user-facing form —
 * failures are logged and swallowed, exactly like lib/email.ts's sendNotification.
 *
 * Deliberately NOT called from app/api/careers/route.ts — job applications are
 * excluded from CRM sync per product decision.
 */

type MagicPipelineLeadPayload = {
  /** Human-readable label for the specific form/flow, e.g. "Newsletter Signup", "Consultation Enquiry: AI Consultation" */
  formName: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  website?: string | null;
  message?: string | null;
  pageUrl?: string | null;
  submissionId?: string | null;
  utmSource?: string | null;
  utmCampaign?: string | null;
};

export async function syncLeadToMagicPipeline(payload: MagicPipelineLeadPayload) {
  try {
    const url = process.env.MAGICPIPELINE_WEBHOOK_URL;
    const secret = process.env.MAGICPIPELINE_WEBHOOK_SECRET;
    if (!url || !secret) return; // Not configured — skip silently

    // At least one identity field is required by MagicPipeline; skip the call
    // entirely rather than let it fail and log noise for e.g. a name-only submission.
    if (!payload.email && !payload.phone) return;

    const signedUrl = `${url}${url.includes("?") ? "&" : "?"}secret=${encodeURIComponent(secret)}`;

    const res = await fetch(signedUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-magicpipeline-webhook-secret": secret,
      },
      body: JSON.stringify({
        plugin_name: "MagicWorks Website",
        site_name: "magicworksitsolutions.com",
        form_name: payload.formName,
        submission_id: payload.submissionId || undefined,
        page_url: payload.pageUrl || undefined,
        name: payload.name || undefined,
        email: payload.email || undefined,
        phone: payload.phone || undefined,
        company: payload.company || undefined,
        website: payload.website || undefined,
        message: payload.message || undefined,
        utm_source: payload.utmSource || undefined,
        utm_campaign: payload.utmCampaign || undefined,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[magicpipeline] sync failed:", res.status, body);
    }
  } catch (err) {
    console.error("[magicpipeline] sync error:", err);
  }
}
