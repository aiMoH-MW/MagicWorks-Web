"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const EXCLUDED_PREFIXES = ["/admin", "/studio"];

export default function ChatWidget() {
  const pathname = usePathname();
  const excluded = EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (excluded) return;
    const script = document.createElement("script");
    script.src = "https://magicflowai.io/chatbot.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [excluded]);

  return null;
}
