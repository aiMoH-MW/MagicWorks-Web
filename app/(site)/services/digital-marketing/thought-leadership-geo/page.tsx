import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thought Leadership & Generative-Engine Visibility · MagicWorks",
  description:
    "Founder-attributed content as a sustained programme, built to earn citations in AI answer engines, not just rankings.",
  alternates: { canonical: "/services/digital-marketing/thought-leadership-geo" },
};

const included = [
  "Editorial calendar and topic strategy",
  "Long-form articles, point-of-view pieces, and white papers",
  "Founder-attributed bylines",
  "Generative-engine visibility work (Google AI Overviews, Perplexity, ChatGPT)",
  "Citation tracking as a measured outcome",
];

const faq = [
  {
    q: "What does GEO mean here?",
    a: "Generative-engine optimisation: structuring authoritative content so AI answer engines cite you. GEO is used only on this service. The search service is SEO / AEO, and local search is GMB Optimisation.",
  },
  {
    q: "Who writes the content?",
    a: "We do, attributed to your founder or expert, in their voice and with their approval before anything is published.",
  },
  {
    q: "How do you measure success?",
    a: "By citations and visibility in AI answers and search, tracked and reported, alongside the audience the content builds over time.",
  },
];

const related = [
  { name: "LinkedIn & Organic Social", href: "/services/digital-marketing/linkedin-organic-social", desc: "Distribute thought-leadership content across LinkedIn and social." },
  { name: "SEO / AEO", href: "/services/digital-marketing/seo-aeo", desc: "Technical foundation that amplifies content authority." },
  { name: "Full-Funnel Programme", href: "/services/digital-marketing/full-funnel-programme", desc: "Thought leadership folded into the complete motion." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Thought Leadership & GEO",
  description: "Founder-attributed long-form content programme built to earn citations in AI answer engines.",
  provider: { "@type": "Organization", name: "MagicWorks IT Solutions Pvt. Ltd.", url: "https://magicworksitsolutions.com" },
  areaServed: "IN",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Digital Marketing", item: "https://magicworksitsolutions.com/services/digital-marketing" },
    { "@type": "ListItem", position: 4, name: "Thought Leadership & GEO", item: "https://magicworksitsolutions.com/services/digital-marketing/thought-leadership-geo" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ThoughtLeadershipGeoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340, 420].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav className="flex items-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/services/digital-marketing" className="hover:text-[#F7F3EA] transition-colors no-underline">Digital Marketing</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Thought Leadership & GEO</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 01 · Authority Content</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[720px]">
            Become the source the experts and the engines cite.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[560px] mt-5 mb-10">
            The most durable marketing asset a founder has is a body of genuine, attributed expertise. We turn yours into a sustained programme of long-form content, and we measure its success by the citations it earns in AI answer engines, not just its rankings.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Book a discovery call
            </Link>
            <Link href="/services/digital-marketing" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              All digital marketing services
            </Link>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="bg-[#F7F3EA] py-10 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Engagement", val: "Monthly retainer" },
            { label: "Output", val: "Long-form content" },
            { label: "Measured by", val: "AI citations & reach" },
            { label: "Best for", val: "Founders with access" },
          ].map((i) => (
            <div key={i.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{i.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{i.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              What is included.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              A sustained programme of founder-attributed content, structured to earn authority in both traditional search and AI answer engines. Citation tracking is a measured output, not a hope.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-4 bg-white border border-[#D8D8DE] rounded-[10px] p-5">
                <span className="mt-[3px] flex-shrink-0 w-5 h-5 rounded-full bg-[#EDE9F7] flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#5B3FBE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <p className="text-[15px] text-[#3F3F4A]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When it fits */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow text-[#D4A537] mb-4">When it fits</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#F7F3EA] mb-5">
              For founders who want to build durable authority.
            </h2>
            <p className="text-[16px] text-[#C8B8FF] leading-[1.65]">
              This is a long-horizon programme for a founder or marketing head with access to genuine expertise. It is distinct from the LinkedIn company-page programme but pairs naturally for B2B. The content compounds over time, and the AI citations are a measurable proof point of that authority, not a vanity metric.
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-[10px] p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-4">Why GEO here</p>
            <p className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#F7F3EA] mb-3">AI assistants cite sources they trust.</p>
            <p className="text-[14px] text-[#C8B8FF] leading-[1.6]">
              Generative-engine optimisation means structuring content so ChatGPT, Perplexity, and Google AI Overviews recognise and cite you. It follows from earned authority, not from tricks, and compounds the longer the programme runs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#EDE9F7] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-8">Common questions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {faq.map((f) => (
              <div key={f.q} className="bg-white border border-[#D8D8DE] rounded-[10px] p-6">
                <h3 className="font-semibold text-[15px] text-[#2A1B5C] mb-2">{f.q}</h3>
                <p className="text-[14px] text-[#3F3F4A] leading-[1.65]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-6">Related services</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.name} href={r.href} className="block bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-6 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(42,27,92,0.08)] transition-all">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] mb-2">{r.name}</h3>
                <p className="text-[13px] text-[#3F3F4A]">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <hr className="gold-rule mx-auto mb-8" style={{ margin: "0 auto 2rem" }} />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(26px,4vw,36px)] text-[#F7F3EA] max-w-[580px] mx-auto mb-4">
            Ready to become the authority AI engines cite?
          </h2>
          <p className="text-[17px] text-[#C8B8FF] max-w-[480px] mx-auto mb-10">
            Thirty minutes to understand your expertise and what a sustained content programme would build.
          </p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[16px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
