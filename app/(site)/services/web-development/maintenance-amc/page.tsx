import type { Metadata } from "next";
import Link from "next/link";
import WebDevelopmentContactForm from "../WebDevelopmentContactForm";

export const metadata: Metadata = {
  title: "Web AMC & Website Maintenance",
  description:
    "Ongoing maintenance for sites we built: uptime monitoring, security patches, content updates, and LLM cost management for AI-native sites.",
  alternates: { canonical: "/services/web-development/maintenance-amc" },
};

const included = [
  "Uptime monitoring: alerts before visitors notice a problem",
  "Security patches and platform updates",
  "Content updates and editorial changes",
  "Performance and load-time upkeep",
  "For AI-native builds: LLM cost management and model upgrades",
];

const faq = [
  {
    q: "Do you maintain sites you did not build?",
    a: "New AMC engagements are for sites we built. For a site built elsewhere that needs performance or conversion fixes, our Site Performance & Conversion service in Digital Marketing handles that.",
  },
  {
    q: "What is different about maintaining an AI-native site?",
    a: "An AI-native site adds LLM cost management and model upgrade planning on top of the usual monitoring, patches, and content updates. As models evolve, the AI features need to be kept current.",
  },
  {
    q: "Is AMC required after a build?",
    a: "It is optional, but recommended. Without ongoing maintenance a site degrades: security vulnerabilities accumulate, performance slips, and content becomes stale.",
  },
  {
    q: "How is AMC priced?",
    a: "A fixed monthly retainer, scoped to the site's complexity and the volume of expected content and maintenance tasks. Final pricing is set at launch handover.",
  },
];

const related = [
  { name: "AI-Native Websites", href: "/services/web-development/ai-native-websites", desc: "The build that this AMC service maintains." },
  { name: "E-commerce", href: "/services/web-development/ecommerce", desc: "AMC is also available for stores we built." },
  { name: "Site Performance & Conversion", href: "/services/digital-marketing/site-performance-conversion", desc: "For performance fixes on any site, regardless of who built it." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/web-development/maintenance-amc#service",
  name: "Web AMC & Website Maintenance",
  description: "Ongoing maintenance retainer for MagicWorks-built sites: monitoring, patches, content updates, and LLM cost management for AI-native builds.",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
  },
  areaServed: "IN",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Web Development", item: "https://magicworksitsolutions.com/services/web-development" },
    { "@type": "ListItem", position: 4, name: "Web AMC", item: "https://magicworksitsolutions.com/services/web-development/maintenance-amc" },
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
  url: "https://magicworksitsolutions.com/services/web-development/maintenance-amc",
  name: "Web AMC & Website Maintenance · MagicWorks",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".aeo-lede", ".faq-section"],
  },
};

export default function MaintenanceAmcPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340, 420].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav className="flex items-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/services/web-development" className="hover:text-[#F7F3EA] transition-colors no-underline">Web Development</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Web AMC</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 02 · Ongoing</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            Keep the site we built fast, secure, and current.
          </h1>
          <p className="aeo-lede text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            Web AMC is an optional monthly retainer for sites MagicWorks built. It covers uptime monitoring, security patches, content updates, and for AI-native builds, LLM cost management and model upgrades as the technology evolves.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a href="#web-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Talk to us about AMC
            </a>
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
            { label: "Engagement", val: "Monthly retainer" },
            { label: "Eligibility", val: "MagicWorks-built sites" },
            { label: "AI-native extra", val: "LLM cost management" },
            { label: "Required?", val: "Optional but recommended" },
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
              Everything needed to keep a live site healthy. AI-native sites get an additional layer to manage the evolving LLM layer.
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

      {/* Boundary */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="eyebrow text-[#D4A537] mb-4">The quality boundary</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#F7F3EA] mb-5 max-w-[600px]">
            We maintain what we built. Deliberately.
          </h2>
          <p className="text-[16px] text-[#C8B8FF] leading-[1.65] max-w-[640px]">
            New AMC is for MagicWorks-built sites. That boundary exists because proper maintenance requires deep knowledge of how the site was built. Taking on any site from any source would compromise the quality of care we can provide. For performance or conversion fixes on a site built elsewhere, our Site Performance & Conversion service in Digital Marketing covers that scope.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section bg-[#EDE9F7] py-20">
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

      {/* Inline enquiry form */}
      <section id="web-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Keep your MagicWorks site fast, secure, and current.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us about the site we built for you and we will scope an AMC retainer that fits its complexity and your expected maintenance volume.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>LLM cost management included for AI-native sites</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>AI-native by default from June 2026</li>
              </ul>
            </div>
            <WebDevelopmentContactForm
              sourcePage="/services/web-development/maintenance-amc"
              defaultProject="Web AMC"
            />
          </div>
        </div>
      </section>
    </>
  );
}
