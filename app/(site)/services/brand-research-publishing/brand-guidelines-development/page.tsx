import type { Metadata } from "next";
import Link from "next/link";
import BrandResearchPublishingContactForm from "../BrandResearchPublishingContactForm";

export const metadata: Metadata = {
  title: "Brand Guidelines Development",
  description:
    "A comprehensive brand system built from scratch: visual language, verbal language, template library, and application guidance, delivered as a digital handbook plus source files. 6 to 10 weeks.",
  alternates: { canonical: "/services/brand-research-publishing/brand-guidelines-development" },
};

const included = [
  { t: "Visual language", d: "Logo usage, colour system, typography, and imagery style, documented so any designer can apply it correctly." },
            { t: "Verbal language", d: "Tone of voice, messaging framework, and terminology, so the brand sounds like one company everywhere it speaks." },
            { t: "Template library", d: "Presentation, document, and social templates your team can fill in directly, no design request needed." },
            { t: "Application guidance", d: "Worked examples across channels, so the system holds up in practice, not just on paper." },
            { t: "Digital handbook", d: "A single browseable reference your whole team can access." },
            { t: "Source files", d: "Editable originals handed over in full, so you are never locked in." }
];

const faq = [
  {
    q: "How long does a Brand Guidelines project take?",
    a: "Six to ten weeks for a fixed-fee project, covering visual language, verbal language, a template library, and application guidance.",
  },
  {
    q: "What do we walk away with?",
    a: "A browseable digital handbook plus the full source files, so your team is never locked in.",
  },
  {
    q: "Do you also build our website from these guidelines?",
    a: "That is a separate engagement under Pillar 02 (Web Development), referred as its own contract once the guidelines are complete.",
  },
  {
    q: "What if our guidelines already exist but are incomplete?",
    a: "See Brand Guidelines Correction instead, a faster path that formalises what is missing rather than rebuilding from scratch.",
  }
];

const related = [
  { name: "Brand Guidelines Correction", href: "/services/brand-research-publishing/brand-guidelines-correction", desc: "Already have partial guidelines? Fix the gaps instead." },
  { name: "Whitepaper Production", href: "/services/brand-research-publishing/whitepaper-production", desc: "Turn expertise into published proof." },
  { name: "Video Retainer", href: "/services/brand-research-publishing/video-retainer", desc: "Recurring monthly video production." }
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/brand-research-publishing/brand-guidelines-development#service",
  name: "Brand Guidelines Development",
  description: "A comprehensive brand system built from scratch, delivered as a browseable digital handbook plus source files. 6 to 10 weeks, fixed-fee project.",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
  },
  areaServed: "IN",
  offers: {
    "@type": "Offer",
    description: "Fixed-fee project, 6 to 10 weeks. Delivered as a digital handbook plus source files.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Brand, Research & Publishing", item: "https://magicworksitsolutions.com/services/brand-research-publishing" },
    { "@type": "ListItem", position: 4, name: "Brand Guidelines Development", item: "https://magicworksitsolutions.com/services/brand-research-publishing/brand-guidelines-development" },
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
  url: "https://magicworksitsolutions.com/services/brand-research-publishing/brand-guidelines-development",
  name: "Brand Guidelines Development · MagicWorks",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".aeo-lede", ".faq-section"],
  },
};

export default function BrandGuidelinesDevelopmentPage() {
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
            <Link href="/services/brand-research-publishing" className="hover:text-[#F7F3EA] transition-colors no-underline">Brand, Research &amp; Publishing</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Brand Guidelines Development</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 05 · Flagship engagement</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            A brand system your team can actually use, for years.
          </h1>
          <p className="aeo-lede text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            A comprehensive brand system built from scratch: visual language, verbal language, a template library, and application guidance, delivered as a browseable digital handbook plus source files.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a href="#brp-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Book a discovery call
            </a>
            <Link href="/services/brand-research-publishing" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              Back to pillar overview
            </Link>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="bg-[#F7F3EA] py-10 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Engagement", val: "Fixed-fee project" },
            { label: "Duration", val: "6 to 10 weeks" },
            { label: "Format", val: "Digital handbook + source files" },
            { label: "Built for", val: "Marketing & brand heads, founders, CEOs" }
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
              What a complete brand system covers.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">Everything a growing team needs to look and sound consistent, without a MagicWorks brief for every asset.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {included.map((item) => (
              <div key={item.t} className="flex items-start gap-4 bg-white border border-[#D8D8DE] rounded-[10px] p-5">
                <span className="mt-[3px] flex-shrink-0 w-5 h-5 rounded-full bg-[#EDE9F7] flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#5B3FBE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <p className="text-[15px] text-[#3F3F4A]"><strong className="text-[#2A1B5C]">{item.t}:</strong> {item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-14">
            <p className="eyebrow text-[#5B3FBE] mb-4">Who this is for</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(26px,3.6vw,34px)] text-[#2A1B5C] leading-[1.18]">Being clear about fit saves everyone time.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#D8D8DE] border-t-[4px] border-t-[#5B3FBE] rounded-[12px] p-10 shadow-[0_2px_20px_rgba(42,27,92,0.07)]">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-[10px] h-[10px] rounded-full bg-[#5B3FBE] flex-shrink-0" />
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[21px] text-[#2A1B5C]">A strong fit</h3>
              </div>
              <ul className="space-y-0">
                {[
                  "Annual revenue of ₹10 Cr or more, or a referral from an existing MagicWorks client.",
                  "Going through a rebrand, a repositioning, or a growth phase that has outgrown existing assets.",
                  "Launching a new business line or subsidiary that needs its own coherent identity.",
                  "A leadership team that has noticed brand inconsistency is costing credibility, not just aesthetics."
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 py-[14px] border-b border-[#EDE9F7] last:border-0 list-none">
                    <span className="mt-[7px] flex-shrink-0 w-[8px] h-[8px] rounded-full bg-[#5B3FBE]" />
                    <span className="text-[15px] leading-[1.65] text-[#3F3F4A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#D8D8DE] border-t-[4px] border-t-[#9A9AA8] rounded-[12px] p-10 shadow-[0_2px_20px_rgba(42,27,92,0.07)]">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-[10px] h-[2px] bg-[#9A9AA8] flex-shrink-0" />
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[21px] text-[#9A9AA8]">Not a fit</h3>
              </div>
              <ul className="space-y-0">
                {[
                  "Wants an isolated logo redesign without a full guidelines engagement.",
                  "Only needs one-off print collateral; we do not offer traditional print production.",
                  "Budget does not yet support a comprehensive system. Consider a free Brand Audit first, or a standalone Whitepaper or Case Study project."
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 py-[14px] border-b border-[#EDE9F7] last:border-0 list-none">
                    <span className="mt-[13px] flex-shrink-0 w-[12px] h-[2px] bg-[#9A9AA8]" />
                    <span className="text-[15px] leading-[1.65] text-[#3F3F4A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-pillar callout */}
      <section className="bg-[#2A1B5C] py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="eyebrow text-[#D4A537] mb-6">How this connects to the rest of MagicWorks</p>
          <div className="border-l-[4px] border-[#D4A537] pl-7 py-1">
            <p className="text-[15px] text-[#C8B8FF] leading-[1.65] max-w-[820px]">Guidelines built here become the visual and verbal system Pillar 02 (Web Development) uses to build your AI-native website. That is referred as a separate contract, no bundled pricing, so each engagement is scoped and billed cleanly.</p>
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

      <section id="brp-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Start with a conversation about your brand.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                We will tell you honestly whether a full Guidelines engagement is the right first step, or whether a Brand Audit or Correction fits better.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Fixed-fee project, scoped after discovery</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Delivered as a handbook plus full source files</li>
              </ul>
            </div>
            <BrandResearchPublishingContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
