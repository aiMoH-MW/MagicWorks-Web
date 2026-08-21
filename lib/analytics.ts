/**
 * Client-side helper for pushing custom events into the GTM dataLayer.
 *
 * Fires a `lead_form_submit` event after a lead-capture form (contact,
 * gated report/whitepaper download, careers application, newsletter
 * signup) has already successfully submitted to its API route. GTM
 * (container GTM-W75DJC) listens for this event via a custom trigger and
 * fires the "Google Ads Conversion Tracking" tag from it, replacing the
 * old "Thank you page" URL-based trigger (which never fired, since this
 * site shows inline success states rather than navigating to a separate
 * /thank-you page).
 *
 * Zero performance cost: no new script, no new network request — this
 * just appends an object to an array that GTM (already lazy-loaded via
 * components/LazyGTM.tsx) reads from. It only runs after a user has
 * already completed a form submission, never on page load.
 */

type DataLayerWindow = typeof window & { dataLayer?: Record<string, unknown>[] };

export function trackLeadSubmit(formName: string) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "lead_form_submit", form_name: formName });
}
