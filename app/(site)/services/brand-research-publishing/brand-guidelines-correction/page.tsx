import type { Metadata } from "next";
import Link from "next/link";
import BrandResearchPublishingContactForm from "../BrandResearchPublishingContactForm";

export const metadata: Metadata = {
  title: "Brand Guidelines Correction",
  description:
    "For clients with existing but incomplete or inconsistent brand guidelines. Audit, gap analysis, and formalisation, delivered in the same handbook plus source files format as a new build.",
  alternates: { canonical: "/services/brand-research-publishing/brand-guidelines-correction" },
};

const included = [
  { t: "Audit", d: "A review of existing brand assets across your website, decks, social, and collateral to find where the inconsistency lives." },
            { t: "Gap analysis", d: "A clear list of what your current guidelines are missing, measured against a comprehensive standard." },
            { t: "Formalisation", d: "Verbal language, template library, and application rules written up properly, wherever they were previously informal or missing." },
            { t: "Same delivery format", d: "A browseable digital handbook plus full source files, identical in structure to a new build." }
];

const faq = [
  {
    q: "How is this different from a full Guidelines build?",
    a: "It starts from what you already have. We audit, close the gaps, and formalise what is missing, rather than building the system from a blank page.",
  },
  {
    q: "How long does a correction take?",
    a: "Shorter than a full build, and scoped precisely after the initial audit.",
  },
  {
    q: "What format is it delivered in?",
    a: "The same browseable digital handbook plus source files as a new build, so the end result is indistinguishable in quality.",
  },
  {
    q: "What if the audit finds we actually need a full rebuild?",
    a: "We will say so honestly and scope a Brand Guidelines Development engagement instead.",
  }
];

const related = [
  { name: "Brand Guidelines Development", href: "/services/brand-research-publishing/brand-guidelines-development", desc: "Starting from scratch? This is the flagship engagement." },
  { name: "Whitepaper Production", href: "/services/brand-research-publishing/whitepaper-production", desc: "Turn expertise into published proof." },
  { name: "Playbook Production", href: "/services/brand-research-publishing/playbook-production", desc: "Codify how your team does its best work." }
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/brand-research-publishing/brand-guidelines-correction#service",
  name: "Brand Guidelines Correction",
  description: "Audit, gap analysis, and formalisation of incomplete or inconsistent brand guidelines, delivered in the same handbook plus source files format as a new build.",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
  },
  areaServed: "IN",
  offers: {
    "@type": "Offer",
    description: "Fixed-fee project, scoped after a short audit. Delivered as a digital handbook plus source files.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Brand, Research & Publishing", item: "https://magicworksitsolutions.com/services/brand-research-publishing" },
    { "@type": "ListItem", position: 4, name: "Brand Guidelines Correction", item: "https://magicworksitsolutions.com/services/brand-research-publishing/brand-guidelines-correction" },
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
  url: "https://magicworksitsolutions.com/services/brand-research-publishing/brand-guidelines-correction",
  name: "Brand Guidelines Correction · MagicWorks",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".aeo-lede", ".faq-section"],
  },
};

export default function BrandGuidelinesCorrectionPage() {
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
            <span className="text-[#F7F3EA]">Brand Guidelines Correction</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 05 · Brand, Research & Publishing</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            Fix inconsistent guidelines. Same handbook, less time.
          </h1>
          <p className="aeo-lede text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            For clients with existing but incomplete or inconsistent brand guidelines. We audit, close the gaps, and formalise what is missing, delivered in the same handbook-plus-source-files format as a new build.
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
            { label: "Duration", val: "Scoped after audit" },
            { label: "Format", val: "Digital handbook + source files" },
            { label: "Built for", val: "Brands with partial or outdated guidelines" }
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
              What the correction process covers.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">You do not need to start over to get a system that actually holds together.</p>
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
                  "Already has some brand guidelines, but they are incomplete, inconsistently applied, or out of date.",
                  "Wants a faster path to a usable system than starting from zero.",
                  "Has a partial style guide sitting in a slide deck or a shared drive that nobody actually follows."
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
                  "Has no guidelines at all. See Brand Guidelines Development instead.",
                  "Wants a purely stylistic refresh (new colours, new logo lockup) without formalising the underlying system."
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
            <p className="text-[15px] text-[#C8B8FF] leading-[1.65] max-w-[820px]">A corrected guidelines system feeds Pillar 02 (Web Development) the same way a new build does: it becomes the reference for any AI-native website work, referred as a separate contract.</p>
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
                Get your existing guidelines assessed.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                We will look at what you already have and tell you honestly whether a correction is enough, or whether a full rebuild would serve you better.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Fixed-fee, scoped after a short audit</li>
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
