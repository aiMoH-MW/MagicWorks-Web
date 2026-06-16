"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";

// Only active on /chatbot-test for now — remove this guard to roll out site-wide
const ENABLED_PATHS = ["/chatbot-test"];

export default function ChatWidget() {
  const pathname = usePathname();
  if (!ENABLED_PATHS.includes(pathname)) return null;

  return (
    <Script
      id="magicflow-chatbot"
      src="https://www.magicflowai.io/chatbot.js"
      strategy="lazyOnload"
    />
  );
}
