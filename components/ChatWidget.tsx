"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";

const EXCLUDED_PATHS = ["/studio", "/admin"];

export default function ChatWidget() {
  const pathname = usePathname();
  if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return null;

  return (
    <Script
      id="magicflow-chatbot"
      src="https://www.magicflowai.io/chatbot.js"
      strategy="lazyOnload"
    />
  );
}
