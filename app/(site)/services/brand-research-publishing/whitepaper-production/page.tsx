import type { Metadata } from "next";
import Link from "next/link";
import BrandResearchPublishingContactForm from "../BrandResearchPublishingContactForm";

export const metadata: Metadata = {
  title: "Whitepaper Production",
  description:
    "Senior-written research pieces on topics where credible expertise exists. Sold as one-off projects or as a quarterly retainer. Includes research, drafting, senior review, and design.",
  alternates: { canonical: "/services/brand-research-publishing/whitepaper-production" },
};

const included = [
  { t: "Research", d: "Source-gathering and structuring around a topic with real substance behind it." },
            { t: "Senior drafting", d: "Written by senior writers, not templated or AI-only output." },
            { t: "Senior review", d: "A second senior pass before anything goes to design." },
            { t: "Design", d: "Laid out as a publishable, on-brand document, ready to gate or distribute." },
            { t: "Derivative content", d: "For retainer clients: supporting social and email assets drawn from each issue." }
];

const faq = [
  {
    q: "What is the difference between the project and the retainer?",
    a: "The project is a single paper over 4 to 8 weeks. The retainer is ongoing output, typically one whitepaper per quarter, over a 12-month minimum.",
  },
  {
    q: "Who writes the whitepaper?",
    a: "Senior writers, with a second senior review pass before design, on topics where real credible expertise exists.",
  },
  {
    q: "Can you write about any topic we choose?",
    a: "Only where credible expertise exists, ours or yours. We do not ghostwrite on topics without real substance behind them.",
  },
  {
    q: "Does this help with AI search visibility?",
    a: "Yes. Whitepapers feed the Thought Leadership & GEO programme under Pillar 01, built to earn citations in AI answer engines.",
  }
];

const related = [
  { name: "Playbook Production", href: "/services/brand-research-publishing/playbook-production", desc: "Codify a proprietary method instead of arguing a point of view." },
  { name: "Video Retainer", href: "/services/brand-research-publishing/video-retainer", desc: "Recurring monthly video production." },
  { name: "Brand Guidelines Development", href: "/services/brand-research-publishing/brand-guidelines-development", desc: "The flagship brand system engagement." }
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/brand-research-publishing/whitepaper-production#service",
  name: "Whitepaper Production",
  description: "Senior-written research whitepapers, sold as one-off projects (4 to 8 weeks) or as a 12-month minimum retainer with quarterly output.",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
  },
  areaServed: "IN",
  offers: {
    "@type": "Offer",
    description: "Fixed-fee project (4 to 8 weeks) or monthly retainer (12-month minimum).",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Brand, Research & Publishing", item: "https://magicworksitsolutions.com/services/brand-research-publishing" },
    { "@type": "ListItem", position: 4, name: "Whitepaper Production", item: "https://magicworksitsolutions.com/services/brand-research-publishing/whitepaper-production" },
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
  url: "https://magicworksitsolutions.com/services/brand-research-publishing/whitepaper-production",
  name: "Whitepaper Production · MagicWorks",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".aeo-lede", ".faq-section"],
  },
};

export default function WhitepaperProductionPage() {
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
            <span className="text-[#F7F3EA]">Whitepaper Production</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 05 · Hero service</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            Turn your expertise into published proof.
          </h1>
          <p className="aeo-lede text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            Senior-written research pieces on topics where real credible expertise exists. Sold as one-off projects or as a quarterly retainer. Includes research, drafting, senior review, and design.
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
            { label: "Project", val: "4 to 8 weeks, fixed-fee" },
            { label: "Retainer", val: "12 months minimum, monthly fee" },
            { label: "Format", val: "Research, drafting, review, design" },
            { label: "Built for", val: "Teams with real expertise worth publishing" }
          ].map((i) => (
            <div key={i.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{i.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{i.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -- TWO WAYS TO ENGAGE -- */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-4">Two ways to engage</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              A single project, or an ongoing programme.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">Both variants include the same rigour: research, senior drafting, review, and design. The difference is commitment and cadence.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-8 flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9A9AA8] mb-3">PROJECT</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-3">Whitepaper project</h3>
              <p className="text-[15px] text-[#3F3F4A] leading-[1.65] flex-1">A single senior-written research whitepaper on one topic where credible expertise exists. The right start for a first paper or a specific launch moment.</p>
              <div className="border-t border-[#F0F0F6] mt-6 pt-4">
                <p className="text-[13px] text-[#9A9AA8]">4 to 8 weeks · fixed-fee project</p>
              </div>
            </div>
            <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-8 flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9A9AA8] mb-3">RETAINER</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-3">Whitepaper retainer</h3>
              <p className="text-[15px] text-[#3F3F4A] leading-[1.65] flex-1">Ongoing thought-leadership output, typically one whitepaper per quarter plus supporting derivative content between issues.</p>
              <div className="border-t border-[#F0F0F6] mt-6 pt-4">
                <p className="text-[13px] text-[#9A9AA8]">12 months minimum · monthly retainer fee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              What every whitepaper includes.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">The same production discipline whether it is a single project or a running retainer.</p>
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
                  "Has real expertise, data, or a point of view worth publishing.",
                  "Wants inbound thought-leadership credibility, including presence in AI answer engines.",
                  "Has one clear topic ready now (project), or wants sustained quarterly output (retainer)."
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
                  "Wants ghostwriting on a topic where no credible in-house expertise exists.",
                  "Is looking for volume content-mill output rather than a small number of substantial pieces."
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
            <p className="text-[15px] text-[#C8B8FF] leading-[1.65] max-w-[820px]">Whitepapers produced here become primary assets in the Thought Leadership & GEO programme under Pillar 01 (Digital Marketing). Distribution and promotion are referred there as a separate contract.</p>
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
                Start your first whitepaper.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us the topic and we will tell you honestly whether it is ready for a project, or needs more groundwork first.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Fixed-fee project or monthly retainer</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Research, drafting, senior review, and design included</li>
              </ul>
            </div>
            <BrandResearchPublishingContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
