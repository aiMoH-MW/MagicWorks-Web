"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const EXCLUDED = ["/studio", "/admin"];
const EVENTS = ["scroll", "click", "keydown", "touchstart"];

export default function ChatWidget() {
  const pathname = usePathname();
  const loaded = useRef(false);

  useEffect(() => {
    if (EXCLUDED.some((p) => pathname.startsWith(p))) return;
    if (loaded.current) return;

    function inject() {
      if (loaded.current) return;
      loaded.current = true;
      EVENTS.forEach((e) => window.removeEventListener(e, inject));
      const s = document.createElement("script");
      s.src = "https://www.magicflowai.io/chatbot.js";
      s.async = true;
      document.head.appendChild(s);
    }

    EVENTS.forEach((e) => window.addEventListener(e, inject, { passive: true }));
    const timer = window.setTimeout(inject, 5000);

    return () => {
      window.clearTimeout(timer);
      EVENTS.forEach((e) => window.removeEventListener(e, inject));
    };
  }, [pathname]);

  return null;
}
