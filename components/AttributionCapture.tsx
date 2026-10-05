"use client";

import { useEffect } from "react";
import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_MAX_AGE_DAYS,
  TOUCH_KEYS,
  hasCampaignSignal,
  parseAttribution,
  type Attribution,
  type Touch,
} from "@/lib/attribution";

/**
 * Captures UTM parameters and ad click IDs from the landing URL into a
 * first-party cookie so every form submission can be attributed, even if the
 * visitor browses several pages before filling a form.
 *
 * - First touch (`ft`): the first visit, never overwritten.
 * - Last touch (`lt`): replaced whenever a visit arrives with campaign params.
 * Renders nothing and does no network requests.
 *
 * Respects the cookie banner: if the visitor explicitly turned marketing
 * cookies off, nothing is stored.
 */
function marketingDenied(): boolean {
  try {
    const raw = localStorage.getItem("mw_cookie_consent");
    if (!raw) return false;
    return JSON.parse(raw)?.marketing === false;
  } catch {
    return false;
  }
}

function readCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? m[1] : undefined;
}

export default function AttributionCapture() {
  useEffect(() => {
    try {
      if (marketingDenied()) return;

      const params = new URLSearchParams(window.location.search);
      const campaign: Touch = {};
      for (const k of TOUCH_KEYS) {
        const v = params.get(k);
        if (v) campaign[k] = v.slice(0, 200);
      }

      const existing = parseAttribution(readCookie(ATTRIBUTION_COOKIE));
      const touch: Touch = {
        ...campaign,
        landing_page: window.location.pathname.slice(0, 200),
        ts: new Date().toISOString(),
      };
      if (document.referrer) {
        try {
          const ref = new URL(document.referrer);
          if (ref.host !== window.location.host) touch.referrer = ref.host + ref.pathname.slice(0, 80);
        } catch {
          /* ignore malformed referrer */
        }
      }

      const next: Attribution = { ...existing };
      let changed = false;

      if (!next.ft) {
        next.ft = touch;
        changed = true;
      }
      // A visit that carries campaign params becomes the new last touch.
      if (hasCampaignSignal(touch)) {
        next.lt = touch;
        changed = true;
      }
      if (!changed) return;

      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie =
        `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(next))}` +
        `; Max-Age=${ATTRIBUTION_MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
    } catch {
      /* attribution must never break the page */
    }
  }, []);

  return null;
}
