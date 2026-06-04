import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist. Browse our services or return to the homepage.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="bg-[#2A1B5C] min-h-screen flex items-center justify-center text-[#F7F3EA] relative overflow-hidden px-8 py-20">
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        {[120, 220, 320, 420, 520].map((r, i) => (
          <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.4} />
        ))}
      </svg>
      <div className="text-center relative max-w-[560px]">
        <p className="font-[family-name:var(--font-head)] font-bold text-[#D4A537] text-[clamp(80px,16vw,140px)] leading-none mb-2">404</p>
        <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3.5vw,32px)] text-[#F7F3EA] mb-4">
          This page does not exist.
        </h1>
        <p className="text-[16px] text-[#C8B8FF] leading-[1.65] mb-10 max-w-[420px] mx-auto">
          The URL may have changed or been removed. Start from the homepage or explore what we do.
        </p>
        <div className="flex gap-4 justify-center flex-wrap mb-12">
          <Link href="/" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[13px] rounded-full no-underline hover:scale-[1.02] transition-transform">
            Back to homepage
          </Link>
          <Link href="/contact" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[13px] rounded-full no-underline hover:bg-white/10 transition-colors">
            Book a discovery call
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 text-left max-w-[360px] mx-auto">
          {[
            { label: "Digital Marketing", href: "/services/digital-marketing" },
            { label: "Web Development", href: "/services/web-development" },
            { label: "AI Consultation", href: "/services/ai-consultation" },
            { label: "Platform Consultation", href: "/services/platform-consultation" },
            { label: "Our Work", href: "/work" },
            { label: "Insights", href: "/insights" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-[#C8B8FF] text-[14px] hover:text-[#D4A537] transition-colors no-underline py-1">
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
