"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "mw_cookie_consent";

type Prefs = { analytics: boolean; marketing: boolean };

function applyConsent(prefs: Prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  type WG = typeof window & { gtag?: (...args: unknown[]) => void };
  const w = window as WG;
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      analytics_storage: prefs.analytics ? "granted" : "denied",
      ad_storage: prefs.marketing ? "granted" : "denied",
      ad_user_data: prefs.marketing ? "granted" : "denied",
      ad_personalization: prefs.marketing ? "granted" : "denied",
    });
  }
}

function loadStoredPrefs(): Prefs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Prefs) : null;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ analytics: false, marketing: false });

  useEffect(() => {
    if (!loadStoredPrefs()) {
      const t = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  // Allow footer "Cookie Settings" button to re-open the panel
  useEffect(() => {
    const handler = () => {
      const stored = loadStoredPrefs();
      if (stored) setPrefs(stored);
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener("mw:open-cookie-settings", handler);
    return () => window.removeEventListener("mw:open-cookie-settings", handler);
  }, []);

  function acceptAll() {
    applyConsent({ analytics: true, marketing: true });
    setVisible(false);
    setShowPrefs(false);
  }

  function rejectAll() {
    applyConsent({ analytics: false, marketing: false });
    setVisible(false);
    setShowPrefs(false);
  }

  function savePreferences() {
    applyConsent(prefs);
    setVisible(false);
    setShowPrefs(false);
  }

  function openPrefs() {
    const stored = loadStoredPrefs();
    if (stored) setPrefs(stored);
    setShowPrefs(true);
  }

  function closePrefs() {
    setShowPrefs(false);
    if (!loadStoredPrefs()) setVisible(true);
  }

  if (!visible) return null;

  return (
    <>
      {/* ── Preferences modal ─────────────────────────────────────────── */}
      {showPrefs && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          className="fixed inset-0 z-[1001] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-4 sm:pb-0"
          onClick={(e) => { if (e.target === e.currentTarget) closePrefs(); }}
        >
          <div className="bg-[#1E1248] border border-white/15 rounded-2xl w-full max-w-[500px] p-6 sm:p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[#D4A537] text-[10px] font-bold uppercase tracking-[0.18em] mb-1">Cookie Settings</p>
                <h2 className="text-[#F7F3EA] font-bold text-[20px] leading-tight">Manage Preferences</h2>
              </div>
              <button
                onClick={closePrefs}
                aria-label="Close cookie preferences"
                className="p-1 ml-4 text-white/40 hover:text-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3 mb-6">
              {/* Essential — always on */}
              <div className="flex items-start justify-between bg-white/5 rounded-[10px] border border-white/10 p-4">
                <div className="pr-6">
                  <p className="text-[#F7F3EA] font-semibold text-[14px] mb-1">Essential</p>
                  <p className="text-[#9A8FBF] text-[12px] leading-[1.55]">
                    Form submissions, security, and session management. Required for the site to work.
                  </p>
                </div>
                <span className="shrink-0 mt-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#D4A537]">
                  Always On
                </span>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between bg-white/5 rounded-[10px] border border-white/10 p-4">
                <div className="pr-6">
                  <p className="text-[#F7F3EA] font-semibold text-[14px] mb-1">Analytics</p>
                  <p className="text-[#9A8FBF] text-[12px] leading-[1.55]">
                    Helps us understand how visitors use our site (Google Analytics, Vercel Analytics). No personal data is sold.
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={prefs.analytics}
                  aria-label="Toggle analytics cookies"
                  onClick={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
                  className={`shrink-0 mt-0.5 relative w-10 h-[22px] rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A537] ${prefs.analytics ? "bg-[#D4A537]" : "bg-white/20"}`}
                >
                  <span className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow-sm transition-all ${prefs.analytics ? "left-[22px]" : "left-[3px]"}`} />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between bg-white/5 rounded-[10px] border border-white/10 p-4">
                <div className="pr-6">
                  <p className="text-[#F7F3EA] font-semibold text-[14px] mb-1">Marketing</p>
                  <p className="text-[#9A8FBF] text-[12px] leading-[1.55]">
                    Used for ad retargeting across Google Ads and Meta. Helps show relevant ads to interested audiences.
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={prefs.marketing}
                  aria-label="Toggle marketing cookies"
                  onClick={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))}
                  className={`shrink-0 mt-0.5 relative w-10 h-[22px] rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A537] ${prefs.marketing ? "bg-[#D4A537]" : "bg-white/20"}`}
                >
                  <span className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow-sm transition-all ${prefs.marketing ? "left-[22px]" : "left-[3px]"}`} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={savePreferences}
                className="flex-1 py-[10px] text-[13px] font-bold text-[#2A1B5C] bg-[#D4A537] hover:bg-[#ddb040] rounded-full transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 py-[10px] text-[13px] font-semibold text-[#F7F3EA] border border-white/25 hover:border-white/50 hover:bg-white/5 rounded-full transition-colors"
              >
                Accept All
              </button>
            </div>

            <p className="text-[#9A8FBF] text-[11px] text-center">
              Change preferences any time from{" "}
              <Link
                href="/privacy"
                onClick={() => setVisible(false)}
                className="text-[#D4A537] underline underline-offset-2 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>{" "}
              or Cookie Settings in our footer.
            </p>
          </div>
        </div>
      )}

      {/* ── Bottom banner ──────────────────────────────────────────────── */}
      {!showPrefs && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="mw-cookie-banner fixed bottom-0 left-0 right-0 z-[1000] bg-[#1E1248] border-t border-white/10 shadow-[0_-4px_32px_rgba(0,0,0,0.35)]"
        >
          <div className="max-w-[1200px] mx-auto px-6 py-4 md:px-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <div className="flex-1 min-w-0">
              <p className="text-[#F7F3EA] font-semibold text-[13px] mb-0.5">
                We use cookies.
              </p>
              <p className="text-[#9A8FBF] text-[12px] leading-[1.55]">
                Analytics and marketing cookies help us improve our site and reach the right audience.{" "}
                <Link href="/privacy" className="text-[#D4A537] underline underline-offset-2 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 pr-[80px] sm:pr-0">
              <button
                onClick={openPrefs}
                className="text-[12px] text-[#9A8FBF] hover:text-[#F7F3EA] underline underline-offset-2 transition-colors px-2 py-2 whitespace-nowrap"
              >
                Manage Preferences
              </button>
              <button
                onClick={rejectAll}
                className="text-[12px] font-semibold text-[#F7F3EA] border border-white/20 hover:border-white/50 hover:bg-white/5 px-5 py-2 rounded-full transition-colors whitespace-nowrap"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={acceptAll}
                className="text-[12px] font-bold text-[#2A1B5C] bg-[#D4A537] hover:bg-[#ddb040] px-6 py-2 rounded-full transition-colors whitespace-nowrap"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
