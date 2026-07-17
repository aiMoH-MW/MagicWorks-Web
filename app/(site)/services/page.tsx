import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Marketing, Web, AI & Brand Services",
  description:
    "Five service pillars: Digital Marketing, Web Development, AI Consultation, Marketplace & Platform Consultation, and Brand, Research & Publishing. Three that deliver, two that advise.",
  alternates: { canonical: "/services" },
};

const pillars = [
  {
    num: "01", type: "execution", label: "Execution",
    title: "Digital Marketing",
    body: "Predictable revenue from traffic and leads. Search, social, SEO, AEO, and full-funnel programmes on a monthly retainer, with a commission tier for confirmed ad spend of INR 5L or more.",
    href: "/services/digital-marketing",
  },
  {
    num: "02", type: "execution", label: "Execution",
    title: "Web Development",
    body: "AI-native websites that compound brand and conversion. Built on Next.js. From June 2026, AI-native is our default for all new builds.",
    href: "/services/web-development",
  },
  {
    num: "03", type: "advisory", label: "Advisory: consultation only",
    title: "AI Consultation",
    body: "A clear, defensible AI roadmap. We advise and design the path. You decide who builds. Independent advice, no bundling.",
    href: "/services/ai-consultation",
  },
  {
    num: "04", type: "advisory", label: "Advisory: consultation only",
    title: "Marketplace & Platform Consultation",
    body: "Founder-led judgment for portal and platform builders. Independent strategy, roadmap audits, and targeted advisory sprints.",
    href: "/services/platform-consultation",
  },
  {
    num: "05", type: "execution", label: "Execution",
    title: "Brand, Research & Publishing",
    body: "Durable creative assets: brand guidelines, whitepapers and playbooks, and recurring video production. A delivery pillar, sibling to Digital Marketing and Web Development.",
    href: "/services/brand-research-publishing",
  },
];

function PillarCard({ p }: { p: (typeof pillars)[number] }) {
  return (
    <div className={`bg-white border border-[#D8D8DE] rounded-[10px] p-10 relative transition-all hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)] flex flex-col h-full ${p.type === "execution" ? "border-t-[3px] border-t-[#5B3FBE]" : "border-t-[3px] border-t-[#D4A537]"}`}>
      <span className={`absolute top-8 right-8 text-[10px] font-bold uppercase tracking-[0.12em] ${p.type === "execution" ? "text-[#5B3FBE]" : "text-[#9a7b1f]"}`}>{p.label}</span>
      <p className="font-[family-name:var(--font-head)] font-bold text-[14px] text-[#9A9AA8] tracking-[0.1em]">{p.num}</p>
      <h2 className="font-[family-name:var(--font-head)] font-bold text-[24px] text-[#2A1B5C] mt-1 mb-4">{p.title}</h2>
      <p className="text-[16px] text-[#3F3F4A] mb-8 flex-1">{p.body}</p>
      <Link href={p.href} className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[12px] uppercase tracking-[0.08em] px-6 py-3 rounded-full no-underline hover:scale-[1.02] transition-transform inline-block self-start">
        Explore →
      </Link>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-100px] top-[-80px] w-[480px] h-[480px] pointer-events-none opacity-50" aria-hidden="true">
          {[80, 140, 200, 260].map((r, i) => (
            <circle key={r} cx="240" cy="240" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">Services</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[780px]">
            Five pillars. Three that deliver, two that advise.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5">
            Digital Marketing, Web Development, and Brand, Research &amp; Publishing produce work you can buy as a deliverable. AI Consultation and Platform Consultation produce judgment. The boundary is deliberate, and it keeps our advice honest.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {pillars.slice(0, 4).map((p) => (
              <PillarCard key={p.num} p={p} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <div className="w-full md:max-w-[calc(50%-16px)]">
              <PillarCard p={pillars[4]} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.5vw,34px)] text-[#F7F3EA] max-w-[560px] mx-auto mb-4">
            Not sure which pillar you need?
          </h2>
          <p className="text-[16px] text-[#C8B8FF] mb-8">A thirty-minute discovery call will tell us both.</p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
