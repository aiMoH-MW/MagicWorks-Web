import type { Metadata } from "next";
import Link from "next/link";
import DigitalMarketingContactForm from "../DigitalMarketingContactForm";

export const metadata: Metadata = {
  title: "Full-Funnel Digital Marketing Programme · MagicWorks",
  description:
    "Google Ads, SEO, Meta, email, and reporting run as one quarterly programme with a single point of contact. The complete motion, accountable to one number.",
  alternates: { canonical: "/services/digital-marketing/full-funnel-programme" },
};

const channels = [
  { name: "Google Ads & Search", desc: "Capture intent from buyers already searching." },
  { name: "SEO / AEO", desc: "Build organic authority that compounds." },
  { name: "Meta Ads", desc: "Create demand before buyers search." },
  { name: "Email Marketing", desc: "Nurture and convert the leads channels bring." },
  { name: "Reporting & attribution", desc: "One unified report tied to revenue, not vanity." },
];

const included = [
  "Quarterly strategy across paid, organic, social, and email",
  "A single accountable point of contact",
  "Larger, coordinated team allocation",
  "A quarterly business review",
  "Unified reporting tied to revenue",
];

const faq = [
  {
    q: "How is Full-Funnel different from buying services separately?",
    a: "It is coordinated as one programme with shared strategy, one contact, and one report, rather than channels working in isolation. The whole should outperform the sum of its parts.",
  },
  {
    q: "Is there a business review?",
    a: "Yes, quarterly, where we review performance against goals and re-plan the next quarter together.",
  },
  {
    q: "Is it more expensive?",
    a: "It carries a premium over a single-channel retainer because of the larger team and coordination. It is designed to outperform the combined cost of running channels separately.",
  },
  {
    q: "What is the minimum commitment?",
    a: "Twelve months. Marketing compounds, and the Full-Funnel motion takes time to build the data and attribution quality that makes it work.",
  },
];

const related = [
  { name: "Google Ads & Search Marketing", href: "/services/digital-marketing/google-ads-search-marketing", desc: "The intent-capture engine inside the programme." },
  { name: "Meta Ads", href: "/services/digital-marketing/meta-ads", desc: "The demand-creation half of the funnel." },
  { name: "Email Marketing", href: "/services/digital-marketing/email-marketing", desc: "The owned channel that converts leads to pipeline." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Full-Funnel Digital Marketing Programme",
  description: "Google Ads, SEO, Meta, email, and reporting run as one quarterly programme with a single point of contact.",
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
    { "@type": "ListItem", position: 4, name: "Full-Funnel Programme", item: "https://magicworksitsolutions.com/services/digital-marketing/full-funnel-programme" },
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

export default function FullFunnelProgrammePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340, 420].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav className="flex items-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/services/digital-marketing" className="hover:text-[#F7F3EA] transition-colors no-underline">Digital Marketing</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Full-Funnel Programme</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 01 · Flagship</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            The complete motion, accountable to one number.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            Our flagship programme. Instead of stitching channels together, we run Google Ads, SEO, Meta, email, and reporting as a single quarterly motion with one point of contact and one number to answer to.
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
            { label: "Engagement", val: "Quarterly programme" },
            { label: "Channels", val: "All five" },
            { label: "Contact", val: "Single POC" },
            { label: "Commitment", val: "12 months" },
          ].map((i) => (
            <div key={i.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{i.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{i.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Channels */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              Five channels. One programme.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              Each channel plays a specific role in the funnel. Coordinated, they compound. Run separately, they compete for credit and leave gaps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {channels.map((c) => (
              <div key={c.name} className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-6">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] mb-2">{c.name}</h3>
                <p className="text-[13px] text-[#3F3F4A]">{c.desc}</p>
              </div>
            ))}
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

      {/* When it fits */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="eyebrow text-[#D4A537] mb-4">When it fits</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#F7F3EA] mb-5 max-w-[600px]">
            For clients who want the bundled motion, not separate retainers.
          </h2>
          <p className="text-[16px] text-[#C8B8FF] leading-[1.65] max-w-[640px]">
            The Full-Funnel Programme carries a premium over a single-channel retainer because of the larger team and coordination. It is priced for the business that needs integrated execution, not individual tactics. The twelve-month commitment gives the programme time to build the attribution quality and channel learning that separate retainers never achieve. The quarterly business review keeps strategy and results aligned.
          </p>
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

      {/* What's inside */}
      <section className="bg-[#F7F3EA] py-16 pt-4">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-6">The services inside this programme</h2>
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
                Start the conversation about your full-funnel programme.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us where your marketing stands today and we will outline how a coordinated programme could close the gaps.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We scope the right channels for your stage and goals</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Transparent attribution, honest reporting</li>
              </ul>
            </div>
            <DigitalMarketingContactForm
              sourcePage="/services/digital-marketing/full-funnel-programme"
              defaultService="Full-Funnel Programme"
            />
          </div>
        </div>
      </section>
    </>
  );
}
