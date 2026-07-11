"use client";
import { useEffect } from "react";

const GTM_ID = "GTM-W75DJC";

/**
 * Defers GTM loading until the first user interaction (or 5 seconds,
 * whichever comes first). This eliminates ~1500ms of Total Blocking Time
 * caused by GTM firing FB Pixel, Clarity, and Google Ads tags on main thread
 * before the user has done anything.
 *
 * The consent dataLayer state set by the beforeInteractive consent script
 * is preserved because dataLayer is pre-initialized — GTM processes the
 * queued consent events when it loads.
 */
export default function LazyGTM() {
  useEffect(() => {
    let fired = false;

    function loadGTM() {
      if (fired) return;
      fired = true;
      EVENTS.forEach((ev) => window.removeEventListener(ev, loadGTM));
      clearTimeout(timer);

      type W = typeof window & { dataLayer: object[] };
      const w = window as W;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(s);
    }

    const EVENTS = ["scroll", "click", "keydown", "touchstart", "mousemove"] as const;
    // Fallback: load after 5s for users who bounce without interacting
    const timer = setTimeout(loadGTM, 5000);
    EVENTS.forEach((ev) =>
      window.addEventListener(ev, loadGTM, { once: true, passive: true })
    );

    return () => {
      clearTimeout(timer);
      EVENTS.forEach((ev) => window.removeEventListener(ev, loadGTM));
    };
  }, []);

  return null;
}
