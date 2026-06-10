import type { Metadata } from "next";
import Link from "next/link";
import DigitalMarketingContactForm from "../DigitalMarketingContactForm";

export const metadata: Metadata = {
  title: "Site Performance & Conversion Optimisation · MagicWorks",
  description:
    "Recover ad ROI on a slow or leaky site. Core Web Vitals, load time, and landing-page conversion, fixed scope, with measurable before-and-after numbers.",
  alternates: { canonical: "/services/digital-marketing/site-performance-conversion" },
};

const included = [
  "Core Web Vitals and load-time optimisation",
  "Mobile performance audit and fixes",
  "Landing-page diagnostics",
  "Conversion-rate audit",
  "On-site issues that directly hurt paid campaign performance",
];

const faq = [
  {
    q: "Do you need to have built my site?",
    a: "No. We work on any site, including ones built and hosted elsewhere.",
  },
  {
    q: "How long does it take?",
    a: "Usually two to six weeks, fixed scope. You know what is covered and what it will cost before we start.",
  },
  {
    q: "How do you prove the result?",
    a: "With before-and-after metrics on speed, Core Web Vitals scores, and conversion rate. The numbers are the proof.",
  },
];

const related = [
  { name: "Google Ads & Search Marketing", href: "/services/digital-marketing/google-ads-search-marketing", desc: "Paid campaigns whose ROI this service protects." },
  { name: "SEO / AEO", href: "/services/digital-marketing/seo-aeo", desc: "Core Web Vitals matter for organic ranking, not just paid." },
  { name: "Web Development", href: "/services/web-development", desc: "If the site needs rebuilding, not just fixing." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Site Performance & Conversion Optimisation",
  description: "Core Web Vitals, load-time optimisation, and landing-page CRO to recover ad ROI on slow or leaky sites.",
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
    { "@type": "ListItem", position: 4, name: "Site Performance & Conversion", item: "https://magicworksitsolutions.com/services/digital-marketing/site-performance-conversion" },
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

export default function SitePerformanceConversionPage() {
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
            <span className="text-[#F7F3EA]">Site Performance & Conversion</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 01 · CRO & Speed</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            Stop paying for clicks your site loses.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            You can run perfect campaigns and still lose the sale to a slow, confusing site. This is a focused engagement to recover that lost ad ROI, with clear before-and-after numbers.
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
            { label: "Engagement", val: "Fixed scope" },
            { label: "Duration", val: "2 to 6 weeks" },
            { label: "Works on", val: "Any site" },
            { label: "Proof", val: "Before-and-after metrics" },
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
              A focused, fixed-scope engagement covering the technical and conversion issues that are leaking your ad ROI. We work on any site regardless of who built it.
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
              When campaigns are running but results are not.
            </h2>
            <p className="text-[16px] text-[#C8B8FF] leading-[1.65]">
              This is the right engagement when you are already spending on paid channels but conversion rates are below benchmark, or when Core Web Vitals scores are hurting your Quality Score and search rankings. We work on any site, built by anyone, and report clear before-and-after numbers. It is not a retainer; it is a fixed-scope sprint with a clean handover.
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-[10px] p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-4">This site is the proof</p>
            <p className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#F7F3EA] mb-3">We run this service on our own site first.</p>
            <p className="text-[14px] text-[#C8B8FF] leading-[1.6]">
              The MagicWorks site is built to demonstrate the capabilities it sells. Core Web Vitals, load time, and conversion are held to the same standard we bring to clients.
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

      {/* Inline enquiry form */}
      <section id="dm-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Recover the ROI your site is leaking right now.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us about your site and campaigns and we will identify where slow load times and poor conversion are costing you the spend you have already committed.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Fixed-scope engagement — you know the cost before we start</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Transparent attribution, honest reporting</li>
              </ul>
            </div>
            <DigitalMarketingContactForm
              sourcePage="/services/digital-marketing/site-performance-conversion"
              defaultService="Site Performance & CRO"
            />
          </div>
        </div>
      </section>
    </>
  );
}
