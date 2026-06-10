import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Marketing & Web for Real Estate",
  description:
    "MagicWorks helps real estate developers generate qualified buyer enquiries. 6,500+ units in pipeline for Aishwaryam with below-benchmark CPL.",
  alternates: { canonical: "/industries/real-estate" },
};

const services = [
  { title: "Google Ads & Search Marketing", body: "Project-launch and evergreen campaigns targeting active property searchers. Location, BHK, and budget-level targeting." },
  { title: "Meta Ads", body: "High-impact awareness and lead generation campaigns for project launches and inventory sales across Facebook and Instagram." },
  { title: "AI-Native Websites & Landing Pages", body: "Conversion-optimised project sites with intelligent enquiry forms, virtual tour integrations, and fast-loading property showcases." },
  { title: "SEO / AEO", body: "Organic visibility for project names, locality searches, and category queries. Built for long-term lead generation between launches." },
  { title: "GMB Optimisation", body: "Site office, sales office, and project listings on Google Maps for local discovery." },
  { title: "Site Performance & Conversion", body: "Slow sites lose real estate leads. We optimise Core Web Vitals and conversion paths to recover ad spend ROI." },
];

export default function RealEstatePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">Industry · Real Estate</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[780px]">
            Qualified buyer enquiries for every project launch.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            From pre-launch buzz to site visits, we build multi-channel campaigns that generate real buyer intent, not just impressions.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Book a discovery call
            </Link>
            <Link href="/work" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              See case studies
            </Link>
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <hr className="gold-rule mb-6" />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-10">What this looks like in practice.</h2>
          <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-10 grid md:grid-cols-[260px_1fr] gap-10 items-center">
            <div>
              <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(52px,7vw,76px)] text-[#2A1B5C] leading-[0.95]">6,500+</div>
              <p className="text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mt-2">Units in pipeline</p>
              <p className="text-[12px] mt-3 text-[#5B3FBE] uppercase tracking-[0.06em] font-semibold">Aishwaryam · Real Estate</p>
            </div>
            <div>
              <p className="text-[16px] text-[#3F3F4A] mb-6">Multi-project digital presence across Google Search and Meta. Below-benchmark CPL across residential launches. Sustained pipeline across slow and peak seasons.</p>
              <div className="grid grid-cols-3 gap-4">
                {[{ v: "6,500+", l: "Units in pipeline" }, { v: "Below", l: "Benchmark CPL" }, { v: "Multi", l: "Project campaigns" }].map(m => (
                  <div key={m.l} className="bg-[#F7F3EA] rounded-[8px] p-4 border border-[#D8D8DE]">
                    <div className="font-[family-name:var(--font-head)] font-bold text-[24px] text-[#2A1B5C]">{m.v}</div>
                    <p className="text-[12px] text-[#3F3F4A] mt-1">{m.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-10">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C]">How we work with real estate businesses.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.title} className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-6">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mb-2">{s.title}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.5vw,34px)] text-[#F7F3EA] max-w-[560px] mx-auto mb-4">Ready to fill your next project pipeline?</h2>
          <p className="text-[16px] text-[#C8B8FF] mb-8 max-w-[440px] mx-auto">Thirty minutes to understand your project and buyer profile.</p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
