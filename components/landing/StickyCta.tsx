"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only bottom bar that appears after the visitor scrolls past the hero,
 * so the enquiry form and phone number are always one tap away.
 */
export default function StickyCta({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={
        "fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-white/10 bg-[#2A1B5C]/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden " +
        (show ? "translate-y-0" : "translate-y-full")
      }
    >
      <a
        href="tel:+919764566644"
        className="flex-1 rounded-full border border-[#D4A537] py-3 text-center text-[13px] font-bold uppercase tracking-[0.06em] text-[#D4A537]"
      >
        Call
      </a>
      <a
        href="#enquire"
        className="flex-[2] rounded-full bg-[#D4A537] py-3 text-center text-[13px] font-bold uppercase tracking-[0.06em] text-[#2A1B5C]"
      >
        {label}
      </a>
    </div>
  );
}
