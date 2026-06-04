import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Google Ads & Search Marketing Agency · MagicWorks",
  description:
    "Search, Performance Max, Display, and YouTube campaigns with proper tracking and audiences. Paid acquisition built to scale, with a commission tier for larger spends.",
  alternates: { canonical: "/services/digital-marketing/google-ads-search-marketing" },
};

const included = [
  "Account structure and migration",
  "Search, Performance Max, and Display campaigns",
  "YouTube campaigns (paid)",
  "Conversion tracking and GTM setup",
  "Audience strategy and remarketing",
  "Landing-page and offer guidance",
  "Monthly reporting on spend, cost per lead, and return",
];

const faq = [
  {
    q: "What is Performance Max?",
    a: "Google's goal-based campaign type that serves across Search, Display, YouTube, Gmail, and Maps from one campaign. We use it where it earns its place, not by default.",
  },
  {
    q: "How is this priced?",
    a: "A monthly retainer, or the commission tier for confirmed ad spends of ₹5 lakh or more with clean attribution and a twelve-month commitment.",
  },
  {
    q: "Do you guarantee a cost per lead?",
    a: "No. We commit to proper setup, honest reporting, and steady improvement against your target.",
  },
];

const related = [
  { name: "Meta Ads", href: "/services/digital-marketing/meta-ads", desc: "Discovery on Facebook and Instagram, paired with search intent." },
  { name: "Site Performance & Conversion", href: "/services/digital-marketing/site-performance-conversion", desc: "Stop paying for clicks your site loses." },
  { name: "Full-Funnel Programme", href: "/services/digital-marketing/full-funnel-programme", desc: "All channels run as one accountable motion." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Google Ads & Search Marketing",
  description: "Search, Performance Max, Display, and YouTube campaigns with conversion tracking and proper audience setup.",
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
    { "@type": "ListItem", position: 4, name: "Google Ads & Search Marketing", item: "https://magicworksitsolutions.com/services/digital-marketing/google-ads-search-marketing" },
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

export default function GoogleAdsPage() {
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
            <span className="text-[#F7F3EA]">Google Ads & Search Marketing</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 01 · Paid Search</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[720px]">
            Paid search that scales, without the wasted spend.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[560px] mt-5 mb-10">
            Our headline service. We run Search, Performance Max, Display, and YouTube campaigns with conversion tracking, Google Tag Manager, and audiences set up properly from day one, so every rupee is accountable to a result.
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
            { label: "Commission tier", val: "₹5L+ ad spend" },
            { label: "Recommended term", val: "12 months" },
            { label: "Best for", val: "Founders & marketing heads" },
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
              Every Google Ads engagement is set up with proper tracking and attribution from week one. No black-box reporting.
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
              The headline service for scaling paid acquisition.
            </h2>
            <p className="text-[16px] text-[#C8B8FF] leading-[1.65]">
              This is the right engagement for clients ready to scale paid acquisition. For confirmed monthly spends of ₹5 lakh or more, we offer a commission tier that aligns our incentives directly with your growth, replacing or reducing the standard retainer fee.
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-[10px] p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-4">Commission tier</p>
            <p className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#F7F3EA] mb-3">Aligned incentives at scale.</p>
            <p className="text-[14px] text-[#C8B8FF] leading-[1.6]">
              For confirmed ad spend of ₹5 lakh or more per month. Clean attribution and a twelve-month commitment required. Our growth is tied to yours.
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
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-8">Related services</h2>
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
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(26px,4vw,36px)] text-[#F7F3EA] max-w-[560px] mx-auto mb-4">
            Ready to make every rupee of ad spend accountable?
          </h2>
          <p className="text-[17px] text-[#C8B8FF] max-w-[460px] mx-auto mb-10">
            Thirty minutes to understand your goals and tell you honestly whether we are the right fit.
          </p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[16px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
