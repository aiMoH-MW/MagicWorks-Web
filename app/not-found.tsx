import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="bg-[#2A1B5C] min-h-[70vh] flex items-center justify-center text-[#F7F3EA] relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" aria-hidden="true">
        {[100, 200, 300].map((r, i) => (
          <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.4} />
        ))}
      </svg>
      <div className="text-center relative px-8">
        <p className="font-[family-name:var(--font-head)] font-bold text-[#D4A537] text-[80px] leading-none mb-4">404</p>
        <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,4vw,36px)] text-[#F7F3EA] mb-3">
          This page does not exist.
        </h1>
        <p className="text-[17px] text-[#C8B8FF] mb-10 max-w-[400px] mx-auto">
          It may have moved, or the URL might be wrong. Try starting from the home page.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[13px] rounded-full no-underline hover:scale-[1.02] transition-transform">
            Go home
          </Link>
          <Link href="/contact" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[13px] rounded-full no-underline hover:bg-white/10 transition-colors">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
