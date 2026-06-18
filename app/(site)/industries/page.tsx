import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "MagicWorks works deeply in education, real estate, manufacturing, and professional services. See how we apply our four service pillars across each sector.",
  alternates: { canonical: "/industries" },
};

const industries = [
  {
    title: "Education",
    href: "/industries/education",
    tag: "Digital Marketing · Web",
    body: "High-intent student enquiries, admission-cycle campaigns, and AI-native portals. Anchor case: SimpliDistance, 75,000+ qualified leads per year.",
    metric: "75,000+",
    metricLabel: "Qualified leads / year",
  },
  {
    title: "Real Estate",
    href: "/industries/real-estate",
    tag: "Digital Marketing · Web",
    body: "Project launch campaigns, sustained buyer pipelines, and conversion-optimised property sites. Anchor case: Aishwaryam, 6,500+ units in pipeline.",
    metric: "6,500+",
    metricLabel: "Units in pipeline",
  },
  {
    title: "Manufacturing",
    href: "/industries/manufacturing",
    tag: "Digital Marketing · Web · AI Consultation",
    body: "Our broadest vertical. B2B lead generation, multi-language product sites, and AI process audits. Priority 1 for AI Consultation. Anchor case: SRJ Steel.",
    metric: "Priority 1",
    metricLabel: "AI Consultation vertical",
  },
  {
    title: "Professional Services",
    href: "/industries/professional-services",
    tag: "AI Consultation · Digital Marketing",
    body: "CA firms, law practices, consultancies, and advisory firms with 50+ professionals. Thought leadership, AI readiness, and digital presence.",
    metric: "Priority 2",
    metricLabel: "AI Consultation vertical",
  },
];

export default function IndustriesPage() {
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
          <p className="eyebrow text-[#D4A537] mb-4">Industries</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[780px]">
            We go deep in a focused set of sectors.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mt-4">
            Industry expertise is how generalist services become specific results. We do not work across every sector; we go deep in four.
          </p>
        </div>
      </section>

      {/* Industry cards */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-2 gap-8">
          {industries.map((ind) => (
            <Link key={ind.href} href={ind.href}
              className="group bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-8 no-underline hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)] transition-all flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5B3FBE] mb-3">{ind.tag}</span>
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[24px] text-[#2A1B5C] mb-1 group-hover:text-[#5B3FBE] transition-colors">{ind.title}</h2>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,3.5vw,38px)] text-[#2A1B5C] leading-none">{ind.metric}</span>
                <span className="text-[12px] uppercase tracking-[0.1em] text-[#9A9AA8]">{ind.metricLabel}</span>
              </div>
              <p className="text-[15px] text-[#3F3F4A] flex-1 mb-6">{ind.body}</p>
              <span className="text-[#5B3FBE] font-bold text-[12px] uppercase tracking-[0.06em]">Explore ?</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.5vw,34px)] text-[#F7F3EA] max-w-[520px] mx-auto mb-4">
            Not in one of these sectors?
          </h2>
          <p className="text-[16px] text-[#C8B8FF] mb-8 max-w-[400px] mx-auto">
            We take selective work outside our priority verticals. A discovery call tells us both whether there is a fit.
          </p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
