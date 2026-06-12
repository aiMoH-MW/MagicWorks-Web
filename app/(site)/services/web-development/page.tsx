import type { Metadata } from "next";
import Link from "next/link";
import WebDevelopmentContactForm from "./WebDevelopmentContactForm";

export const metadata: Metadata = {
  title: "AI-Native Website Development",
  description:
    "AI-native websites that compound brand and conversion. Built on Next.js to generate business, not just to look good. From idea to live in 8 to 16 weeks.",
  alternates: { canonical: "/services/web-development" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/web-development#service",
  name: "Web Development",
  alternateName: "AI-Native Website Development",
  serviceType: "Web Development",
  category: "Technology Services",
  description:
    "AI-native websites built on Next.js with LLM-backed backends and headless CMS. From idea to live in 8 to 16 weeks. Builds include AI-native websites, e-commerce, portals and member sites, WordPress, and Web AMC.",
  url: "https://magicworksitsolutions.com/services/web-development",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
    url: "https://magicworksitsolutions.com",
  },
  areaServed: { "@type": "Country", name: "India" },
  audience: {
    "@type": "Audience",
    audienceType:
      "Businesses in India seeking modern, AI-native websites that generate enquiries and compound brand value.",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Build Types",
    itemListElement: [
      { "@type": "Offer", position: 1, itemOffered: { "@type": "Service", name: "AI-Native Website", description: "Next.js front-end, LLM-backed backend, headless CMS with embedded AI features: chat agents, intelligent search, content personalisation, and conversational lead capture." } },
      { "@type": "Offer", position: 2, itemOffered: { "@type": "Service", name: "E-commerce", description: "Headless commerce builds designed for conversion, catalogue management, and integration with Indian payment gateways." } },
      { "@type": "Offer", position: 3, itemOffered: { "@type": "Service", name: "Portals & Member Sites", description: "Custom portals with authentication, gated content, dashboards, and role-based access for B2B and B2C use cases." } },
      { "@type": "Offer", position: 4, itemOffered: { "@type": "Service", name: "WordPress", description: "WordPress builds for clients who specifically require the platform or need a simple brochure site." } },
      { "@type": "Offer", position: 5, itemOffered: { "@type": "Service", name: "Web AMC", description: "Ongoing maintenance retainer covering monitoring, security, content updates, and LLM cost management for AI-native sites." } },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Web Development", item: "https://magicworksitsolutions.com/services/web-development" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI-native website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A site built on a modern stack (Next.js with an LLM-backed backend and a headless CMS) with intelligent features such as chat, smart search, personalisation, and conversational lead capture built in from the start, rather than added later.",
      },
    },
    {
      "@type": "Question",
      name: "Do you still build WordPress sites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, when it is genuinely the right tool: a simple brochure site, or when you specifically require WordPress. AI-native is our default for everything else.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a website take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically 8 to 16 weeks from kick-off to launch, depending on scope.",
      },
    },
    {
      "@type": "Question",
      name: "Do you maintain the site after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, through an optional Web AMC retainer for sites we built, covering monitoring, security, content updates, and, for AI-native sites, LLM cost management.",
      },
    },
  ],
};

const builds = [
  {
    title: "AI-native website",
    tag: "Flagship",
    tagColor: "#D4A537",
    body: "Next.js front-end, LLM-backed backend, headless CMS. Embedded AI features: chat agents, intelligent search, content personalisation, conversational lead capture. The default for all new builds.",
    href: "/services/web-development/ai-native-websites",
  },
  {
    title: "E-commerce",
    tag: "Delivery",
    tagColor: "#5B3FBE",
    body: "AI-native commerce for ambitious roadmaps, or WooCommerce for simpler catalogues. Built around the buying journey, with an AMC tail.",
    href: "/services/web-development/ecommerce",
  },
  {
    title: "Portals & member sites",
    tag: "Delivery",
    tagColor: "#5B3FBE",
    body: "AI-native only, with authentication, role-based access, and at least one AI-assisted workflow as standard. Strategy for these sits in Platform Consultation.",
    href: "/services/platform-consultation",
  },
  {
    title: "WordPress (on request)",
    tag: "When right",
    tagColor: "#9A9AA8",
    body: "A curated plugin stack on managed hosting, for simple brochure sites or when you require WordPress specifically. Not the default.",
    href: "/contact",
  },
  {
    title: "Web AMC",
    tag: "Ongoing",
    tagColor: "#5B3FBE",
    body: "Ongoing maintenance for sites we built: uptime monitoring, security patches, content updates, and LLM cost management for AI-native builds.",
    href: "/services/web-development/maintenance-amc",
  },
];

const steps = [
  { n: "01", t: "Discovery & scope", d: "Business goals, user journeys, and technical requirements. A clear scope in five working days." },
  { n: "02", t: "Design & build", d: "Brand-aligned design, Next.js build, CMS setup, AI feature integration, QA and testing." },
  { n: "03", t: "Launch & AMC", d: "Staged launch, handover, and optional ongoing maintenance retainer." },
];

const faq = [
  { q: "What is an AI-native website?", a: "A site built on a modern stack (Next.js with an LLM-backed backend and a headless CMS) with intelligent features such as chat, smart search, personalisation, and conversational lead capture built in from the start, rather than added later." },
  { q: "Do you still build WordPress sites?", a: "Yes, when it is genuinely the right tool: a simple brochure site, or when you specifically require WordPress. AI-native is our default for everything else." },
  { q: "How long does a website take?", a: "Typically 8 to 16 weeks from kick-off to launch, depending on scope." },
  { q: "Do you maintain the site after launch?", a: "Yes, through an optional Web AMC retainer for sites we built, covering monitoring, security, content updates, and, for AI-native sites, LLM cost management." },
];

export default function WebDevelopmentPage() {
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
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex gap-2 items-center text-[12px] text-[#9A8FBF]">
              <li>
                <Link href="/" className="hover:text-[#C8B8FF] transition-colors no-underline">Home</Link>
              </li>
              <li aria-hidden="true" className="text-[#5B3FBE]">/</li>
              <li>
                <Link href="/services" className="hover:text-[#C8B8FF] transition-colors no-underline">Services</Link>
              </li>
              <li aria-hidden="true" className="text-[#5B3FBE]">/</li>
              <li className="text-[#C8B8FF]" aria-current="page">Web Development</li>
            </ol>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 02 · Execution</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[780px]">
            AI-native websites that compound brand and conversion.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            From idea to live. A website built to generate enquiries, not just to look good. From June 2026, every new build is AI-native by default: fast, intelligent, and hard for a competitor to copy without significant rework.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a href="#web-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Start a project conversation
            </a>
            <Link href="/work" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              See what we build
            </Link>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="bg-[#F7F3EA] py-10 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Engagement", val: "One-time project" },
            { label: "Delivery", val: "8 to 16 weeks" },
            { label: "Tail support", val: "Optional Web AMC" },
            { label: "Built for", val: "Founders, marketing & product heads" },
          ].map((i) => (
            <div key={i.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{i.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{i.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack shift */}
      <section className="bg-[#2A1B5C] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="eyebrow text-[#D4A537] mb-4">What changed in 2026</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,34px)] text-[#F7F3EA] max-w-[640px] mb-5">
            We moved our default stack from WordPress to AI-native.
          </h2>
          <p className="text-[17px] leading-[1.6] text-[#C8B8FF] max-w-[640px]">
            Most agencies still hand you a brochure site. From June 2026 our default is an AI-native build: a Next.js front-end, an LLM-backed backend, and a headless CMS, with intelligent features built in rather than bolted on. WordPress is still available when it is genuinely the right tool. Every site we ship should be one a competitor cannot ship without significant rework.
          </p>
        </div>
      </section>

      {/* What we build */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              What we build.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {builds.map((b) => (
              <div key={b.title} className="bg-white border border-[#D8D8DE] rounded-[10px] p-7 relative transition-all hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)]"
                style={{ borderTopWidth: 3, borderTopColor: b.tagColor }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: b.tagColor }}>{b.tag}</span>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[19px] text-[#2A1B5C] mt-2 mb-3">{b.title}</h3>
                <p className="text-[14px] text-[#3F3F4A] mb-5">{b.body}</p>
                <Link href={b.href} className="text-[#5B3FBE] font-bold text-[12px] uppercase tracking-[0.06em] no-underline hover:underline">
                  Learn more ?
                </Link>
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
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-8">Common questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faq.map((f) => (
              <div key={f.q} className="bg-white border border-[#D8D8DE] rounded-[10px] p-6">
                <h3 className="font-semibold text-[15px] text-[#2A1B5C] mb-2">{f.q}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline contact form */}
      <section id="web-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Ready to build a site that actually generates business?
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                The right trigger is a relaunch, a rebrand, or a new business line. Thirty minutes to explore the fit.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>8 to 16 week build, clear scope agreed up front</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>AI-native by default from June 2026</li>
              </ul>
            </div>
            <WebDevelopmentContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
