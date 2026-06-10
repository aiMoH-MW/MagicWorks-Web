import type { Metadata } from "next";
import Link from "next/link";
import DigitalMarketingContactForm from "../DigitalMarketingContactForm";

export const metadata: Metadata = {
  title: "LinkedIn & B2B Organic Social · MagicWorks",
  description:
    "A LinkedIn-led organic presence for B2B brands and founders, including executive thought-leadership ghostwriting and employee advocacy.",
  alternates: { canonical: "/services/digital-marketing/linkedin-organic-social" },
};

const included = [
  "Content calendars",
  "Post writing and scheduling",
  "Founder-voice and executive ghostwriting (where requested)",
  "Company-page engagement",
  "Employee advocacy programmes",
];

const faq = [
  {
    q: "How is this different from Meta Ads?",
    a: "Different buyer and metric. This is B2B organic reputation built over time. Meta Ads is paid discovery and demand for B2C and transactional B2B.",
  },
  {
    q: "Do you ghostwrite for our executives?",
    a: "Yes, in their voice and with their sign-off where requested. The content belongs to them and earns the authority they have built.",
  },
  {
    q: "Is this the same as Thought Leadership & GEO?",
    a: "They pair well but are scoped separately. This is company-page and social presence. Thought Leadership is a sustained founder-attributed long-form programme measured by AI citations.",
  },
];

const related = [
  { name: "Thought Leadership & GEO", href: "/services/digital-marketing/thought-leadership-geo", desc: "Long-form founder content built for AI citation, not just social reach." },
  { name: "YouTube Video Optimisation", href: "/services/digital-marketing/youtube-video-optimisation", desc: "Extend founder authority into video search." },
  { name: "Full-Funnel Programme", href: "/services/digital-marketing/full-funnel-programme", desc: "All channels coordinated as one programme." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "LinkedIn & Organic Social",
  description: "LinkedIn-led B2B organic presence with company-page content, executive ghostwriting, and employee advocacy.",
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
    { "@type": "ListItem", position: 4, name: "LinkedIn & Organic Social", item: "https://magicworksitsolutions.com/services/digital-marketing/linkedin-organic-social" },
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

export default function LinkedInOrganicSocialPage() {
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
            <span className="text-[#F7F3EA]">LinkedIn & Organic Social</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 01 · B2B Organic</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            Build a B2B reputation worth following.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            For B2B, trust is built in public. We run a LinkedIn-led organic presence for your brand and your leaders, turning expertise into visibility and inbound interest.
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
            { label: "Focus", val: "B2B organic" },
            { label: "Ghostwriting", val: "Available on request" },
            { label: "Best for", val: "Manufacturing & Professional Services" },
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
              A consistent, on-brand presence across LinkedIn and supporting social platforms, built to convert industry visibility into inbound interest over time.
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
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="eyebrow text-[#D4A537] mb-4">When it fits</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#F7F3EA] mb-5 max-w-[600px]">
            For B2B clients whose buyers are a marketing head or founder.
          </h2>
          <p className="text-[16px] text-[#C8B8FF] leading-[1.65] max-w-[640px]">
            This service is built for B2B businesses where the success metric is industry visibility and inbound interest, rather than paid lead volume. It pairs naturally with Thought Leadership & GEO but is scoped and priced separately. We write in your team's voice, with their sign-off, and build an editorial rhythm that compounds over time.
          </p>
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
                Build the B2B LinkedIn presence your buyers trust.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us about your brand and your buyers and we will outline how a consistent LinkedIn programme builds the authority that drives inbound.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Executive ghostwriting available in your voice</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Transparent attribution, honest reporting</li>
              </ul>
            </div>
            <DigitalMarketingContactForm
              sourcePage="/services/digital-marketing/linkedin-organic-social"
              defaultService="LinkedIn & Social"
            />
          </div>
        </div>
      </section>
    </>
  );
}
