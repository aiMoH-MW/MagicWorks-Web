"use client";

import { useEffect, useState } from "react";

// 17 June 2026 11:00:00 IST = 17 June 2026 05:30:00 UTC
const LAUNCH_UTC = Date.UTC(2026, 5, 17, 5, 30, 0);

export default function BetaBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Date.now() >= LAUNCH_UTC) return;
    if (sessionStorage.getItem("beta-dismissed") === "1") return;
    setVisible(true);
  }, []);

  function dismiss() {
    sessionStorage.setItem("beta-dismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="w-full bg-[#2A1B5C] text-white text-[12px] flex items-center justify-center gap-3 px-4 py-[7px] relative">
      <span className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[10px] uppercase tracking-[0.1em] px-2 py-[2px] rounded-full shrink-0">
        Beta
      </span>
      <span className="text-white/80">
        You&apos;re on the beta — official launch <strong className="text-white font-semibold">17 June 2026</strong>. Some pages are still being refined.
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss beta notice"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
