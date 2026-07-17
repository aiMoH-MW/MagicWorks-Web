import type { Metadata } from "next";
import Link from "next/link";
import BrandResearchPublishingContactForm from "./BrandResearchPublishingContactForm";

export const metadata: Metadata = {
  title: "Brand Guidelines, Whitepapers & Video Retainers",
  description:
    "Durable creative assets your team keeps using: brand guidelines, whitepapers and playbooks, and recurring video production. A delivery pillar, not advisory.",
  alternates: { canonical: "/services/brand-research-publishing" },
};

const services = [
  {
    slug: "brand-guidelines-development",
    name: "Brand Guidelines Development",
    desc: "A comprehensive brand system built from scratch: visual language, verbal language, template library, and application guidance. The flagship engagement.",
    flagship: true,
  },
  {
    slug: "brand-guidelines-correction",
    name: "Brand Guidelines Correction",
    desc: "For clients with existing but incomplete or inconsistent guidelines. Audit, gap analysis, and formalisation, delivered in the same handbook format as a new build.",
    flagship: false,
  },
  {
    slug: "whitepaper-production",
    name: "Whitepaper Production",
    desc: "Senior-written research pieces on topics where credible expertise exists. Sold as one-off projects or as a quarterly retainer.",
    flagship: false,
  },
  {
    slug: "playbook-production",
    name: "Playbook Production",
    desc: "Longer-form methodology documents that codify how something is done. Similar economics to whitepapers.",
    flagship: false,
  },
  {
    slug: "case-study-production",
    name: "Case Study Production",
    desc: "Turning a client's actual results into a documented case study. Bundled inside Pillar 01 retainers as standard, sold standalone only for special cases.",
    flagship: false,
  },
  {
    slug: "video-retainer",
    name: "Video Retainer",
    desc: "Recurring monthly video production for established brands: training, explainer, A-roll and B-roll, and podcast formats.",
    flagship: false,
  },
  {
    slug: "website-content-writing",
    name: "Website Content Writing",
    desc: "Structured content writing for the pages of a new website build. Bundled as a Pillar 02 add-on only, not sold standalone.",
    flagship: false,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Brand, Research & Publishing an advisory service like AI Consultation?",
      acceptedAnswer: { "@type": "Answer", text: "No. It is a delivery pillar, sibling to Digital Marketing and Web Development. We produce the brand guidelines, whitepapers, playbooks, and video content directly, not a roadmap for someone else to build." },
    },
    {
      "@type": "Question",
      name: "What is the Brand Audit, and is it really free?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. The Brand Audit is a free, written PDF report identifying inconsistency in your brand assets across your website, decks, social, and collateral. It is offered to qualified prospects (₹25 Cr+ annual revenue, or by referral) and delivered as a report only, not a live presentation." },
    },
    {
      "@type": "Question",
      name: "Do you sell one-off videos or social graphics?",
      acceptedAnswer: { "@type": "Answer", text: "No. Video is sold only as a recurring monthly retainer with a defined output volume. One-off reels, batch social graphics, and animated explainer videos are explicitly out of scope for this pillar." },
    },
    {
      "@type": "Question",
      name: "Can I buy Website Content Writing on its own?",
      acceptedAnswer: { "@type": "Answer", text: "No. Website Content Writing is bundled as an add-on to a Pillar 02 (Web Development) engagement. It is not sold as a standalone service." },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/brand-research-publishing#service",
  name: "Brand, Research & Publishing",
  serviceType: "Brand Strategy and Content Production",
  category: "Brand and Creative Services",
  description:
    "Durable creative assets: Brand Guidelines Development and Correction, Whitepaper Production, Playbook Production, Case Study Production, Video Retainer, and Website Content Writing.",
  url: "https://magicworksitsolutions.com/services/brand-research-publishing",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
    url: "https://magicworksitsolutions.com",
  },
  areaServed: { "@type": "Country", name: "India" },
  audience: {
    "@type": "Audience",
    audienceType: "Marketing heads, brand heads, founders, and CEOs at businesses with ₹25 Cr+ annual revenue seeking durable brand assets and published thought leadership.",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Brand, Research & Publishing Services",
    itemListElement: services.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: { "@type": "Service", name: s.name, description: s.desc },
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Brand, Research & Publishing", item: "https://magicworksitsolutions.com/services/brand-research-publishing" },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://magicworksitsolutions.com/services/brand-research-publishing",
  url: "https://magicworksitsolutions.com/services/brand-research-publishing",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".eyebrow"],
  },
};

export default function BrandResearchPublishingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      {/* -- HERO -- */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[760px] h-[760px] pointer-events-none opacity-70" aria-hidden="true">
          {[120, 200, 280, 360, 440].map((r, i) => (
            <circle key={r} cx="380" cy="380" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex gap-2 items-center text-[12px] text-[#9A8FBF]">
              <li><Link href="/" className="hover:text-[#C8B8FF] transition-colors no-underline">Home</Link></li>
              <li aria-hidden="true" className="text-[#5B3FBE]">/</li>
              <li><Link href="/services" className="hover:text-[#C8B8FF] transition-colors no-underline">Services</Link></li>
              <li aria-hidden="true" className="text-[#5B3FBE]">/</li>
              <li className="text-[#C8B8FF]" aria-current="page">Brand, Research &amp; Publishing</li>
            </ol>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 05</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(36px,5.6vw,58px)] leading-[1.1] tracking-[-0.01em] text-[#F7F3EA] max-w-[820px] mt-3">
            Brand assets your team keeps using, long after we deliver them.
          </h1>
          <hr className="w-[64px] h-[3px] bg-[#D4A537] border-0 my-6" />
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[640px] mb-10">
            Brand guidelines, whitepapers and playbooks, and recurring video production. A delivery pillar, sibling to Digital Marketing and Web Development, not an advisory practice.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a href="#brp-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
              Book a discovery call
            </a>
            <a href="#services" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors inline-block">
              See the services
            </a>
          </div>
        </div>
      </section>

      {/* -- AT A GLANCE -- */}
      <section className="bg-[#F7F3EA] py-10 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Pillar type", val: "Delivery, sibling to Pillars 01 & 02" },
            { label: "Hero services", val: "Guidelines, Whitepaper, Video Retainer" },
            { label: "Pricing", val: "Fixed-fee project or monthly retainer" },
            { label: "Built for", val: "₹25 Cr+ revenue, marketing & brand heads" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{item.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{item.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -- SERVICES -- */}
      <section id="services" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-4">What is in scope</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              Seven services. Three hero services, four supporting or bundled.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              Each hero service is sellable on its own as a project or retainer. Case Study Production and Website Content Writing are bundled add-ons, not standalone lines, listed here for completeness.
            </p>
          </div>

          {/* Brand Audit: free funnel wedge */}
          <div className="bg-[#2A1B5C] text-[#F7F3EA] rounded-[10px] border-t-[3px] border-t-[#D4A537] p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center mb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4A537] mb-2">Free funnel wedge</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#F7F3EA] mb-3">
                Brand Audit
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#C8B8FF] max-w-[620px]">
                A free, written PDF report identifying inconsistency in your brand assets across website, decks, social, and collateral. Delivered as a report only, not a live presentation. Offered to prospects who meet a size bar (₹25 Cr+ revenue) or come by referral.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a href="#brp-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block whitespace-nowrap">
                Ask about a Brand Audit
              </a>
            </div>
          </div>

          {/* Flagship card */}
          <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center mb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a7b1f] mb-2">The flagship engagement</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-3">
                Brand Guidelines Development
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#3F3F4A] max-w-[620px]">
                {services[0].desc}
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/services/brand-research-publishing/brand-guidelines-development"
                className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block whitespace-nowrap"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Remaining six services, 3-column grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {services.filter((s) => !s.flagship).map((s) => (
              <div
                key={s.slug}
                className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-8 flex flex-col transition-all hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)]"
              >
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-3">{s.name}</h3>
                <p className="text-[14px] leading-[1.6] text-[#3F3F4A] flex-1 mb-6">{s.desc}</p>
                <Link
                  href={`/services/brand-research-publishing/${s.slug}`}
                  className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] no-underline hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- WHO THIS IS FOR -- */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-14">
            <p className="eyebrow text-[#5B3FBE] mb-4">Who this is for</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(26px,3.6vw,34px)] text-[#2A1B5C] leading-[1.18] mb-3">
              Being clear about fit saves everyone time.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#D8D8DE] border-t-[4px] border-t-[#5B3FBE] rounded-[12px] p-10 shadow-[0_2px_20px_rgba(42,27,92,0.07)] hover:shadow-[0_6px_28px_rgba(42,27,92,0.12)] transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-[10px] h-[10px] rounded-full bg-[#5B3FBE] flex-shrink-0" />
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[21px] text-[#2A1B5C]">A strong fit</h3>
              </div>
              <ul className="space-y-0">
                {[
                  "Annual revenue of ₹25 Cr or more, or a referral from an existing MagicWorks client.",
                  "Buyer is a marketing head, brand head, founder, or CEO with authority to invest in durable assets.",
                  "Trigger is a rebrand, repositioning, outgrown assets, a new business line, or a thought-leadership goal.",
                  "In Education, Real Estate, or Manufacturing for retainer work; industry-agnostic for standalone brand and whitepaper projects.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 py-[14px] border-b border-[#EDE9F7] last:border-0 list-none">
                    <span className="mt-[7px] flex-shrink-0 w-[8px] h-[8px] rounded-full bg-[#5B3FBE]" />
                    <span className="text-[15px] leading-[1.65] text-[#3F3F4A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[#D8D8DE] border-t-[4px] border-t-[#9A9AA8] rounded-[12px] p-10 shadow-[0_2px_20px_rgba(42,27,92,0.07)] hover:shadow-[0_6px_28px_rgba(42,27,92,0.12)] transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-[10px] h-[2px] bg-[#9A9AA8] flex-shrink-0" />
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[21px] text-[#9A9AA8]">Not a fit</h3>
              </div>
              <ul className="space-y-0">
                {[
                  "Wants one-off reels, batch social graphics, or animated explainer videos as standalone deliverables.",
                  "Wants avatar or AI-speaking videos as a publicly listed service (private, high-value clients only).",
                  "Wants isolated logo design without a Guidelines engagement, or traditional print production.",
                  "Wants Website Content Writing without an active Pillar 02 website build.",
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

      {/* -- CROSS-PILLAR HANDOFF -- */}
      <section className="bg-[#2A1B5C] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="eyebrow text-[#D4A537] mb-6">How this pillar hands off to the rest of MagicWorks</p>
          <div className="border-l-[4px] border-[#D4A537] pl-7 py-1">
            <p className="text-[15px] text-[#C8B8FF] leading-[1.65]">
              A website need routes to Pillar 02 (Web Development). A digital marketing or GEO need routes to Pillar 01. A platform strategy need routes to Pillar 04. An AI process opportunity routes to Pillar 03. Every handoff is a separate contract, no bundled pricing.
            </p>
          </div>
        </div>
      </section>

      {/* -- FINAL CTA -- */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-24 relative overflow-hidden">
        <svg className="absolute left-1/2 -translate-x-1/2 bottom-[-360px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[150, 240, 330].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.65 : 0.4} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#F7F3EA] max-w-[640px] mx-auto mb-4">
            Ready for brand assets that outlast the project?
          </h2>
          <hr className="w-[64px] h-[3px] bg-[#D4A537] border-0 mx-auto my-6" />
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[560px] mx-auto mb-10">
            A thirty-minute discovery call, no obligation. We will tell you honestly which engagement fits, starting with a free Brand Audit if that is the right first step.
          </p>
          <a href="#brp-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-9 py-[15px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Book a discovery call
          </a>
        </div>
      </section>

      {/* -- CONTACT FORM -- */}
      <section id="brp-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Start with a conversation, not a brief.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us what prompted the enquiry, a rebrand, a launch, an inconsistency you have noticed, and we will recommend where to start.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Fixed-fee projects or monthly retainers, scoped after discovery</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Free Brand Audit available to qualified prospects</li>
              </ul>
            </div>
            <BrandResearchPublishingContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
