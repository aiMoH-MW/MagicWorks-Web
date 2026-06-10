import type { Metadata } from "next";
import Link from "next/link";
import DigitalMarketingContactForm from "../DigitalMarketingContactForm";

export const metadata: Metadata = {
  title: "Meta Ads · Facebook & Instagram Advertising · MagicWorks",
  description:
    "Facebook and Instagram campaigns with strong creative and audience automation, often paired with Google Ads for a true full-funnel motion.",
  alternates: { canonical: "/services/digital-marketing/meta-ads" },
};

const included = [
  "Campaign strategy and structure",
  "Creative variants and testing",
  "Audience building and automation",
  "Retargeting campaigns",
  "Supporting organic Instagram and Facebook content",
  "Monthly performance reporting",
];

const faq = [
  {
    q: "Do you also handle organic social?",
    a: "Organic Instagram and Facebook content is included as a supporting deliverable within Meta Ads. For B2B organic presence on LinkedIn, see LinkedIn & Organic Social.",
  },
  {
    q: "Should I run Meta and Google together?",
    a: "Often yes. Meta drives discovery, Google captures intent. Together they form a full funnel. We coordinate both if you run the Full-Funnel Programme.",
  },
  {
    q: "How much creative do you produce?",
    a: "Multiple variants per campaign, tested and iterated on performance. We build a creative rhythm, not a one-time asset.",
  },
];

const related = [
  { name: "Google Ads & Search Marketing", href: "/services/digital-marketing/google-ads-search-marketing", desc: "Capture intent from buyers already searching." },
  { name: "Full-Funnel Programme", href: "/services/digital-marketing/full-funnel-programme", desc: "Meta and Google coordinated as one programme." },
  { name: "GMB Optimisation", href: "/services/digital-marketing/gmb-optimisation", desc: "Local visibility for discovery-to-conversion buyers." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Meta Ads",
  description: "Facebook and Instagram paid campaigns with creative variants, audience automation, and retargeting.",
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
    { "@type": "ListItem", position: 4, name: "Meta Ads", item: "https://magicworksitsolutions.com/services/digital-marketing/meta-ads" },
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

export default function MetaAdsPage() {
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
            <span className="text-[#F7F3EA]">Meta Ads</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 01 · Paid Social</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            Demand and discovery on Facebook and Instagram.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            Meta is where buyers discover before they search. We run Facebook and Instagram campaigns with creative variants and audience automation, frequently paired with Google Ads so discovery and intent work together.
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
            { label: "Channels", val: "Facebook + Instagram" },
            { label: "Includes", val: "Organic support" },
            { label: "Best paired with", val: "Google Ads" },
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
              Campaigns built around the buyer journey, not the platform defaults. We bring a creative-first approach to Meta, with proper audience architecture and performance iteration.
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
              Standalone or as the discovery half of a full funnel.
            </h2>
            <p className="text-[16px] text-[#C8B8FF] leading-[1.65]">
              Meta Ads works on its own for brands building awareness and driving enquiries directly. It is strongest as the discovery half of a full-funnel motion with Google Ads: Meta introduces the brand to a broad audience, Google captures the intent that follows. Organic Instagram and Facebook content is included as a supporting deliverable within this service.
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-[10px] p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-4">Full-funnel motion</p>
            <p className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#F7F3EA] mb-3">Discovery + intent = compounding results.</p>
            <p className="text-[14px] text-[#C8B8FF] leading-[1.6]">
              Meta creates demand at scale. Google Ads captures that demand when the buyer is ready to act. Together, they close the loop between awareness and conversion.
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
                Build demand on Facebook and Instagram that converts.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us about your buyers and budget and we will outline a Meta strategy that pairs discovery with intent.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Creative variants and audience automation included</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Transparent attribution, honest reporting</li>
              </ul>
            </div>
            <DigitalMarketingContactForm
              sourcePage="/services/digital-marketing/meta-ads"
              defaultService="Meta Ads"
            />
          </div>
        </div>
      </section>
    </>
  );
}
