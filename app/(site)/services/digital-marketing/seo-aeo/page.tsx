import type { Metadata } from "next";
import Link from "next/link";
import DigitalMarketingContactForm from "../DigitalMarketingContactForm";

export const metadata: Metadata = {
  title: "SEO & AEO · Digital Marketing · MagicWorks",
  description:
    "Be found in search and inside the answer. Technical SEO and answer engine optimisation across ChatGPT, Perplexity, and Google AI Overviews.",
  alternates: { canonical: "/services/digital-marketing/seo-aeo" },
};

const included = [
  "Technical SEO audit and remediation",
  "On-page optimisation and content structure",
  "Entity and schema markup",
  "Answer engine optimisation for AI Overviews, ChatGPT, and Perplexity",
  "Internal linking architecture",
  "Core Web Vitals monitoring",
  "Monthly rank and citation tracking",
];

const faq = [
  {
    q: "What is AEO?",
    a: "Answer Engine Optimisation: structuring your content so AI assistants like ChatGPT, Perplexity, and Google AI Overviews surface and cite you. It runs alongside SEO, not instead of it.",
  },
  {
    q: "How is AEO different from GEO?",
    a: "On this site, GEO (generative-engine optimisation) is reserved for the Thought Leadership service, which measures citations of founder-attributed content. AEO here covers technical and on-page structuring of your service pages to earn AI citations.",
  },
  {
    q: "How long until I see results?",
    a: "Technical fixes can move quickly. Authority and ranking take three to six months to compound. Answer-engine citations typically follow after a site earns consistent organic authority.",
  },
  {
    q: "Is local search covered here?",
    a: "Local search and Google Business Profile management lives in our GMB Optimisation service. The two link together but are scoped separately.",
  },
];

const related = [
  { name: "GMB Optimisation", href: "/services/digital-marketing/gmb-optimisation", desc: "Local-pack visibility and Google Business Profile management." },
  { name: "Thought Leadership & GEO", href: "/services/digital-marketing/thought-leadership-geo", desc: "Founder-attributed content built to earn AI citations." },
  { name: "Site Performance & Conversion", href: "/services/digital-marketing/site-performance-conversion", desc: "Core Web Vitals and load time, before they hurt your rankings." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO & AEO",
  description: "Technical SEO and answer engine optimisation to rank in search and appear in AI-generated answers.",
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
    { "@type": "ListItem", position: 4, name: "SEO & AEO", item: "https://magicworksitsolutions.com/services/digital-marketing/seo-aeo" },
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

export default function SeoAeoPage() {
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
            <span className="text-[#F7F3EA]">SEO / AEO</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 01 · Organic Search</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            Be found in search, and inside the answer.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            Two disciplines, one team. Technical SEO earns you the rank. Answer Engine Optimisation earns you the citation inside ChatGPT, Perplexity, and Google AI Overviews. Both matter; most agencies only do one.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a href="#dm-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Book a discovery call
            </a>
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
            { label: "Disciplines", val: "SEO + AEO" },
            { label: "Horizon", val: "6 to 12 months" },
            { label: "Best for", val: "All four industries" },
          ].map((i) => (
            <div key={i.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{i.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{i.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two disciplines */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              Two disciplines. One retainer.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              Search results and AI answers are converging. You need to be present in both, and the work that earns one usually supports the other.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#5B3FBE] mb-3">SEO</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-3">Technical and on-page authority.</h3>
              <p className="text-[15px] text-[#3F3F4A] leading-[1.65]">
                Site structure, page speed, entity schema, internal linking, and content optimisation so Google understands and trusts your pages enough to rank them.
              </p>
            </div>
            <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D4A537] mb-3">AEO</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-3">Answer-engine visibility.</h3>
              <p className="text-[15px] text-[#3F3F4A] leading-[1.65]">
                Structuring your content so AI assistants quote you. Answer-first content, entity consistency, and schema that answer engines can parse and cite cleanly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-[#EDE9F7] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-8">What is included</h2>
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

      {/* FAQ */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-8">Common questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
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
      <section className="bg-[#F7F3EA] py-16 pt-4">
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

      {/* Inline enquiry form */}
      <section id="dm-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Rank in search and get cited in AI answers.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us about your site and your current visibility and we will outline where SEO and AEO would make the biggest difference.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Both SEO and AEO covered under one retainer</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Transparent attribution, honest reporting</li>
              </ul>
            </div>
            <DigitalMarketingContactForm
              sourcePage="/services/digital-marketing/seo-aeo"
              defaultService="SEO / AEO"
            />
          </div>
        </div>
      </section>
    </>
  );
}
