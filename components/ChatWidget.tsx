"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";

const EXCLUDED_PREFIXES = ["/admin", "/studio"];

export default function ChatWidget() {
  const pathname = usePathname();
  const excluded = EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p));
  return null;
}
