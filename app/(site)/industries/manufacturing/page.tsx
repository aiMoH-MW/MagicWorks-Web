import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Marketing & AI for Manufacturing",
  description:
    "AI consultation and digital marketing for Indian manufacturers. B2B lead generation, digital presence, and AI process roadmaps.",
  alternates: { canonical: "/industries/manufacturing" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://magicworksitsolutions.com/industries" },
    { "@type": "ListItem", position: 3, name: "Manufacturing", item: "https://magicworksitsolutions.com/industries/manufacturing" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Marketing & AI Consultation for Manufacturing",
  serviceType: "Digital Marketing, AI Consultation",
  description: "B2B lead generation, AI-native websites, and AI process audits for Indian manufacturers. Priority 1 AI Consultation vertical.",
  url: "https://magicworksitsolutions.com/industries/manufacturing",
  provider: { "@id": "https://magicworksitsolutions.com/#organization" },
  areaServed: { "@type": "Country", name: "India" },
};

const faq = [
  { q: "What services does MagicWorks provide for manufacturers?", a: "We cover three pillars: Digital Marketing (B2B lead generation, LinkedIn, SEO for industrial queries), Web Development (AI-native company and product sites, dealer portals), and AI Consultation (process audit and roadmap for automation opportunities). Manufacturing is our Priority 1 AI Consultation vertical." },
  { q: "Can you help a manufacturer reach international buyers?", a: "Yes. We build export-facing websites and run digital campaigns targeting procurement heads and purchase decision-makers in international markets. Our work with SRJ Steel includes an export-facing product catalogue." },
  { q: "What does an AI Process Audit involve for a manufacturer?", a: "We map your existing processes across production, quality control, inventory, and supplier management, identify the highest-value automation opportunities, and return a prioritised build-or-buy roadmap. Typical engagement: 4 to 8 weeks." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const services = [
  { pillar: "Digital Marketing", title: "B2B Lead Generation", body: "Google Search and LinkedIn campaigns targeting procurement heads, plant managers, and purchase decision-makers." },
  { pillar: "Web Development", title: "AI-Native Company & Product Sites", body: "Multi-language product catalogues, dealer portals, and export-facing websites built on Next.js." },
  { pillar: "AI Consultation", title: "AI Process Audit + Roadmap", body: "Identify automation opportunities across production, quality control, inventory, and supplier management. Priority 1 vertical." },
  { pillar: "Digital Marketing", title: "SEO / AEO for Industrial Queries", body: "Rank for supplier, product, and specification searches across Google and AI answer engines." },
  { pillar: "AI Consultation", title: "AI Literacy Workshop", body: "Build leadership alignment on AI before committing to any vendor or build. 1 to 3 days, for senior teams." },
  { pillar: "Digital Marketing", title: "LinkedIn & Thought Leadership", body: "Executive presence and founder-attributed content that positions your firm as a category leader." },
];

export default function ManufacturingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">Industry · Manufacturing</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[780px]">
            Digital presence and AI readiness for Indian manufacturers.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            Our broadest industry vertical. We span Digital Marketing, Web Development, and AI Consultation for manufacturers, the only sector where all three pillars apply together.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Book a discovery call
            </Link>
            <Link href="/services/ai-consultation" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              AI Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* AI Priority callout */}
      <section className="bg-[#D4A537]/10 border-y border-[#D4A537]/30 py-10">
        <div className="max-w-[1120px] mx-auto px-8 flex gap-6 items-start">
          <span className="text-[#D4A537] text-[11px] font-bold uppercase tracking-[0.14em] mt-1 whitespace-nowrap">Priority 1 Vertical</span>
          <p className="text-[16px] text-[#2A1B5C]">Manufacturing is our <strong>Priority 1 vertical for AI Consultation</strong>. More AI opportunities exist in manufacturing operations than in any other sector we serve: process automation, quality control, demand forecasting, and supplier intelligence.</p>
        </div>
      </section>

      {/* Case study */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <hr className="gold-rule mb-6" />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-10">What this looks like in practice.</h2>
          <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-10 grid md:grid-cols-[260px_1fr] gap-10 items-start">
            <div>
              <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(44px,6vw,64px)] text-[#2A1B5C] leading-[0.95]">SRJ<br/>Steel</div>
              <p className="text-[12px] mt-3 text-[#5B3FBE] uppercase tracking-[0.06em] font-semibold">Manufacturing · Steel</p>
            </div>
            <div>
              <p className="text-[16px] text-[#3F3F4A] mb-4">Multi-channel digital presence for a steel manufacturer: company website, product catalogue, export-facing pages, and B2B lead generation. Built for credibility with procurement decision-makers.</p>
              <Link href="/work" className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] no-underline hover:underline">See full case study →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-10">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C]">How we work with manufacturers.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.title} className="bg-white border border-[#D8D8DE] rounded-[10px] p-6"
                style={{ borderTopWidth: 3, borderTopColor: s.pillar === "AI Consultation" ? "#D4A537" : "#5B3FBE" }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: s.pillar === "AI Consultation" ? "#9a7b1f" : "#5B3FBE" }}>{s.pillar}</span>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mt-1 mb-2">{s.title}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[780px] mx-auto px-8">
          <hr className="gold-rule mb-6" />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-10">Frequently asked questions.</h2>
          <div className="article-faq flex flex-col gap-6">
            {faq.map((f) => (
              <div key={f.q} className="border-b border-[#D8D8DE] pb-6">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mb-2">{f.q}</h3>
                <p className="text-[15px] text-[#3F3F4A] leading-[1.6]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.5vw,34px)] text-[#F7F3EA] max-w-[560px] mx-auto mb-4">Ready to modernise your digital and AI footprint?</h2>
          <p className="text-[16px] text-[#C8B8FF] mb-8 max-w-[440px] mx-auto">Start with a thirty-minute discovery call.</p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
