import type { Metadata } from "next";
import Link from "next/link";
import WebDevelopmentContactForm from "../WebDevelopmentContactForm";

export const metadata: Metadata = {
  title: "E-commerce Website Development",
  description:
    "Online stores built around the buying journey. AI-native commerce for ambitious roadmaps, or WooCommerce for simpler catalogues, with an AMC tail.",
  alternates: { canonical: "/services/web-development/ecommerce" },
};

const included = [
  "Storefront designed around the buying journey, not just the catalogue",
  "Product and catalogue setup",
  "Payments and checkout optimised to convert",
  "AI-native option: personalised recommendations and intelligent search",
  "WooCommerce option for simpler catalogues",
  "Analytics and conversion tracking from day one",
  "Web AMC retainer available post-launch",
];

const faq = [
  {
    q: "Which platform: AI-native, WooCommerce, or custom?",
    a: "We recommend based on your roadmap. WooCommerce suits simpler catalogues with standard needs. An AI-native build on Next.js suits ambitious, scaling stores that need personalisation, fast performance, and intelligent search.",
  },
  {
    q: "Can you migrate my existing store?",
    a: "Yes, including catalogue, customers, and order history, with care to preserve SEO and URL structure so rankings carry over.",
  },
  {
    q: "Do you handle payments and checkout?",
    a: "Yes, including payment gateway integration and a checkout flow built to minimise drop-off and convert.",
  },
  {
    q: "Who maintains the store after launch?",
    a: "Our Web AMC retainer covers ongoing maintenance for stores we built: security patches, platform updates, content changes, and performance upkeep.",
  },
];

const related = [
  { name: "AI-Native Websites", href: "/services/web-development/ai-native-websites", desc: "The flagship build behind AI-native commerce." },
  { name: "Web AMC", href: "/services/web-development/maintenance-amc", desc: "Ongoing maintenance to keep your store fast and secure." },
  { name: "Site Performance & Conversion", href: "/services/digital-marketing/site-performance-conversion", desc: "Recover ad ROI on a slow or leaky storefront." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/web-development/ecommerce#service",
  name: "E-commerce Website Development",
  description: "Online stores built around the buying journey: AI-native commerce or WooCommerce, with payments, analytics, and an AMC tail.",
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
    { "@type": "ListItem", position: 4, name: "E-commerce", item: "https://magicworksitsolutions.com/services/web-development/ecommerce" },
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
  url: "https://magicworksitsolutions.com/services/web-development/ecommerce",
  name: "E-commerce Website Development · MagicWorks",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".aeo-lede", ".faq-section"],
  },
};

export default function EcommercePage() {
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
            <span className="text-[#F7F3EA]">E-commerce</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 02 · Commerce</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            Stores built around the buying journey, not just the catalogue.
          </h1>
          <p className="aeo-lede text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            We build online stores designed to sell. AI-native commerce on Next.js for businesses with ambitious roadmaps, or WooCommerce for simpler catalogues, both with payments, tracking, and an AMC tail built in.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a href="#web-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Start a project conversation
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
            { label: "Ambitious roadmap", val: "AI-native (Next.js)" },
            { label: "Simpler catalogue", val: "WooCommerce" },
            { label: "Includes", val: "Payments & checkout" },
            { label: "Post-launch", val: "Optional Web AMC" },
          ].map((i) => (
            <div key={i.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{i.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{i.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two options */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              Two honest options.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              We recommend the build that fits your roadmap, not the one that is easiest to sell.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D4A537] mb-3">For ambitious roadmaps</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-3">AI-native commerce.</h3>
              <p className="text-[15px] text-[#3F3F4A] leading-[1.65]">
                Next.js with a commerce backend, personalised recommendations, intelligent search, and the speed to pass Core Web Vitals. For stores that expect to scale, add AI features, or need a storefront that earns organic search as aggressively as it converts paid traffic.
              </p>
            </div>
            <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#9A9AA8] rounded-[10px] p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A9AA8] mb-3">For simpler catalogues</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-3">WooCommerce.</h3>
              <p className="text-[15px] text-[#3F3F4A] leading-[1.65]">
                A curated WooCommerce build for businesses with straightforward catalogue and fulfilment needs. Reliable, well-supported, and the right tool when the extra complexity of an AI-native build is not justified.
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

      {/* Inline enquiry form */}
      <section id="web-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Build a store designed to earn traffic and convert it.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us about your catalogue and roadmap and we will recommend the right build — honestly, not based on what is easier to sell.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Payments, checkout, and analytics included from day one</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>AI-native by default from June 2026</li>
              </ul>
            </div>
            <WebDevelopmentContactForm
              sourcePage="/services/web-development/ecommerce"
              defaultProject="E-commerce"
            />
          </div>
        </div>
      </section>
    </>
  );
}
