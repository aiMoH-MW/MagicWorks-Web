import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI-Native Website Development · MagicWorks",
  description:
    "Websites built on Next.js with an LLM-backed backend and intelligent features, from chat to smart search. Our default build, live in 8 to 16 weeks.",
  alternates: { canonical: "/services/web-development/ai-native-websites" },
};

const included = [
  "Next.js front-end — React, Tailwind, mobile-first",
  "LLM-backed backend with edge functions for speed",
  "Headless CMS (Sanity, Payload, or Strapi, chosen per project)",
  "AI chat agents that qualify leads 24/7",
  "Intelligent search, content personalisation, recommendations",
  "Conversational lead capture built into the site structure",
  "SEO and AEO foundation with structured data throughout",
  "Passes Core Web Vitals — LCP, INP, CLS — green on launch",
];

const steps = [
  { n: "01", t: "Discovery and scope", d: "Business goals, user journeys, AI features, and technical requirements. A clear written scope in five working days." },
  { n: "02", t: "Design and build", d: "Brand-aligned design, Next.js build, CMS setup, AI feature integration, QA and device testing." },
  { n: "03", t: "Launch and AMC", d: "Staged launch, performance verification, team handover, and optional Web AMC retainer." },
];

const faq = [
  {
    q: "What is an AI-native website?",
    a: "An AI-native website is a site built on a modern stack — Next.js with an LLM-backed backend and a headless CMS — with intelligent features such as chat, smart search, personalisation, and conversational lead capture built in from the start, rather than added later as plugins.",
  },
  {
    q: "Do I need AI features to choose this stack?",
    a: "No. The stack gives you speed, strong SEO foundations, and easy content management even without heavy AI. For a simple brochure site, WordPress is still an option.",
  },
  {
    q: "Do you still build WordPress sites?",
    a: "Yes, on request, for simple brochure sites or when you specifically require WordPress. AI-native is our default for all other builds from June 2026.",
  },
  {
    q: "How long does an AI-native build take?",
    a: "Typically 8 to 16 weeks from kick-off to launch, depending on scope, number of AI features, and content readiness.",
  },
];

const related = [
  { name: "E-commerce", href: "/services/web-development/ecommerce", desc: "Stores built around the buying journey." },
  { name: "Web AMC", href: "/services/web-development/maintenance-amc", desc: "Keep the site fast, secure, and current after launch." },
  { name: "SEO / AEO", href: "/services/digital-marketing/seo-aeo", desc: "Organic search and answer-engine visibility built on top of the stack." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/web-development/ai-native-websites#service",
  name: "AI-Native Website Development",
  description:
    "Websites built on Next.js with an LLM-backed backend and a headless CMS. Intelligent features — chat, smart search, personalisation, conversational lead capture — built in from the start.",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
  },
  areaServed: "IN",
  offers: {
    "@type": "Offer",
    description: "AI-native website build, 8 to 16 weeks, with optional Web AMC retainer.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Web Development", item: "https://magicworksitsolutions.com/services/web-development" },
    { "@type": "ListItem", position: 4, name: "AI-Native Websites", item: "https://magicworksitsolutions.com/services/web-development/ai-native-websites" },
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

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://magicworksitsolutions.com/services/web-development/ai-native-websites#webpage",
  url: "https://magicworksitsolutions.com/services/web-development/ai-native-websites",
  name: "AI-Native Website Development · MagicWorks",
  description: "Websites built on Next.js with an LLM-backed backend and intelligent features. Our default build since June 2026.",
  isPartOf: { "@id": "https://magicworksitsolutions.com/#website" },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".aeo-lede", ".faq-section"],
  },
};

export default function AiNativeWebsitesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340, 420].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav className="flex items-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/services/web-development" className="hover:text-[#F7F3EA] transition-colors no-underline">Web Development</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">AI-Native Websites</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 02 · Flagship Build</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[720px]">
            Websites that work, not just sit there.
          </h1>
          <p className="aeo-lede text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[600px] mt-5 mb-10">
            An AI-native website is built on Next.js with an LLM-backed backend and a headless CMS, with intelligent features — chat that qualifies leads, smart search, personalisation — built in from the start. It is our default for all new builds since June 2026, and the kind of site a competitor cannot copy without significant rework.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Start a project conversation
            </Link>
            <Link href="/services/web-development" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              All web development services
            </Link>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="bg-[#F7F3EA] py-10 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Stack", val: "Next.js + LLM backend" },
            { label: "CMS", val: "Sanity / Payload / Strapi" },
            { label: "Timeline", val: "8 to 16 weeks" },
            { label: "Default since", val: "June 2026" },
          ].map((i) => (
            <div key={i.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{i.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{i.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why AI-native */}
      <section className="bg-[#2A1B5C] py-20">
        <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow text-[#D4A537] mb-4">Why AI-native</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,32px)] text-[#F7F3EA] mb-5">
              A site built to compound, not just launch.
            </h2>
            <p className="text-[16px] text-[#C8B8FF] leading-[1.65]">
              Most agencies hand you a brochure site. An AI-native build has intelligent features that learn from visitors: a chat agent that qualifies leads while you sleep, search that surfaces the right content, and personalisation that shows each visitor what is relevant to them. The site gets more useful over time, not more stale.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: "WordPress (typical agency)", value: "Static, plugin-dependent, ages fast" },
              { label: "AI-native (our default)", value: "Intelligent, fast, compounding" },
            ].map((r) => (
              <div key={r.label} className="bg-white/10 border border-white/20 rounded-[10px] p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D4A537] mb-2">{r.label}</p>
                <p className="text-[15px] text-[#F7F3EA]">{r.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              What every build includes.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              The same technical foundation on every project. AI features are scoped per build; the stack and quality baseline are not negotiable.
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

      {/* How a build runs */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">
              How a build runs.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="pt-6 border-t-2 border-[#D4A537]">
                <span className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#2A1B5C] leading-none">{s.n}</span>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mt-3 mb-2">{s.t}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section bg-[#F7F3EA] py-20">
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

      {/* Related */}
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

      {/* CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <hr className="gold-rule mx-auto mb-8" style={{ margin: "0 auto 2rem" }} />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(26px,4vw,36px)] text-[#F7F3EA] max-w-[580px] mx-auto mb-4">
            Ready to build a site that actually generates business?
          </h2>
          <p className="text-[17px] text-[#C8B8FF] max-w-[480px] mx-auto mb-10">
            The right trigger is a relaunch, a rebrand, or a new business line. Thirty minutes to explore the fit.
          </p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[16px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Start a project conversation
          </Link>
        </div>
      </section>
    </>
  );
}
