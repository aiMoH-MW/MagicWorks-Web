import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Platform Roadmap Audit · MagicWorks",
  description:
    "A fixed-scope sprint that pressure-tests your platform strategy and returns a sequenced, defensible roadmap you can act on with any partner.",
  alternates: { canonical: "/services/platform-consultation/roadmap-audit" },
};

const deliverables = [
  "A pressure-tested platform thesis, stress-tested against real market and technical constraints",
  "Risk and sequencing analysis: what to do first, and what to defer",
  "Build-or-buy calls on key modules with reasoning made explicit",
  "A sequenced platform roadmap you can act on with any partner",
];

const method = [
  { n: "01", t: "Thesis review", d: "We examine your platform thesis, the model, the target network, and the monetisation logic." },
  { n: "02", t: "Risk mapping", d: "We surface the real risks: supply-side cold start, demand aggregation, margin structure, regulatory exposure." },
  { n: "03", t: "Sequencing and build-or-buy", d: "We decide what to build first, what to buy or integrate, and what to defer. Module by module, with clear reasoning." },
  { n: "04", t: "Roadmap delivery", d: "A sequenced, written roadmap delivered in a working session, built to be taken into a build engagement with any partner." },
];

const faq = [
  {
    q: "What is a platform roadmap audit?",
    a: "A platform roadmap audit is a four-to-eight-week consultation sprint that stress-tests a platform founder's strategy, surfaces risks and sequencing decisions, makes build-or-buy calls on key modules, and delivers a defensible roadmap the founder can execute with any build partner.",
  },
  {
    q: "What does the audit cover?",
    a: "Platform thesis, business model, supply and demand network strategy, risk and sequencing analysis, and build-or-buy decisions on the key modules.",
  },
  {
    q: "Do you build the platform?",
    a: "No. This is consultation only. The roadmap is the deliverable; the build is a separate engagement with your team, an external vendor, or our Web Development team under a clean, separate contract.",
  },
  {
    q: "Which platform types do you prioritise?",
    a: "Industry-agnostic, with the most depth in edtech platforms, B2B sourcing and trade marketplaces, and wellness and lifestyle marketplaces.",
  },
  {
    q: "Does it follow a workshop, or can it stand alone?",
    a: "Either. It frequently follows the Platform Strategy Workshop when teams need alignment first. It can stand alone when a founder already has a clear thesis and wants it stress-tested.",
  },
];

const related = [
  { name: "Platform Strategy Workshop", href: "/services/platform-consultation/workshop", desc: "Align on the thesis and model before the full audit." },
  { name: "Targeted Advisory Sprint", href: "/services/platform-consultation/advisory-sprint", desc: "One hard platform decision, resolved in two to four weeks." },
  { name: "Embedded Platform Advisor", href: "/services/platform-consultation/embedded-advisor", desc: "Senior judgment on call as your team executes the roadmap." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/platform-consultation/roadmap-audit#service",
  name: "Platform Roadmap Audit",
  description:
    "A four-to-eight-week consultation sprint that stress-tests a platform strategy, surfaces risks, makes build-or-buy calls, and delivers a sequenced, defensible roadmap.",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
  },
  areaServed: "IN",
  offers: {
    "@type": "Offer",
    description: "Fixed-scope platform roadmap audit, 4 to 8 weeks. Consultation only; no build obligation.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Platform Consultation", item: "https://magicworksitsolutions.com/services/platform-consultation" },
    { "@type": "ListItem", position: 4, name: "Platform Roadmap Audit", item: "https://magicworksitsolutions.com/services/platform-consultation/roadmap-audit" },
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
  url: "https://magicworksitsolutions.com/services/platform-consultation/roadmap-audit",
  name: "Platform Roadmap Audit · MagicWorks",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".aeo-lede", ".faq-section"],
  },
};

export default function RoadmapAuditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340, 420].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav className="flex items-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/services/platform-consultation" className="hover:text-[#F7F3EA] transition-colors no-underline">Platform Consultation</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Platform Roadmap Audit</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 04 · Flagship Engagement</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[720px]">
            A defensible platform roadmap, pressure-tested.
          </h1>
          <p className="aeo-lede text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[600px] mt-5 mb-10">
            Our flagship platform engagement. A fixed-scope sprint that stress-tests your strategy, surfaces the real risks and sequencing decisions, and returns a defensible roadmap you can execute with whoever is right for you.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Request a strategy workshop
            </Link>
            <Link href="/services/platform-consultation" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              All platform consultation services
            </Link>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="bg-[#F7F3EA] py-10 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Duration", val: "4 to 8 weeks" },
            { label: "Deliverable", val: "Sequenced roadmap" },
            { label: "Boundary", val: "Consultation only" },
            { label: "Led by", val: "Founder-level advisory" },
          ].map((i) => (
            <div key={i.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{i.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{i.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The boundary */}
      <section className="bg-[#2A1B5C] py-20">
        <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow text-[#D4A537] mb-4">The boundary</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,32px)] text-[#F7F3EA] mb-5">
              We advise and design. You choose who builds.
            </h2>
            <p className="text-[16px] text-[#C8B8FF] leading-[1.65]">
              Marketplace and Platform Consultation at MagicWorks is consultation only. We provide independent judgment on your strategy, model, and roadmap. The build is your team, an external vendor, or our Web Development team under a separate, clean contract. That independence is the point.
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-[10px] p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-4">Priority platform types</p>
            <ul className="space-y-3">
              {["Edtech platforms and learning marketplaces", "B2B sourcing and trade marketplaces", "Wellness and lifestyle marketplaces"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[14px] text-[#C8B8FF]">
                  <span className="flex-shrink-0 mt-[6px] w-1.5 h-1.5 rounded-full bg-[#D4A537]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              What you walk away with.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {deliverables.map((item) => (
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

      {/* How it runs */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">How the audit runs.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {method.map((s) => (
              <div key={s.n} className="pt-6 border-t-2 border-[#D4A537]">
                <span className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#2A1B5C] leading-none">{s.n}</span>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mt-3 mb-2">{s.t}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{s.d}</p>
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
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-6">Related engagements</h2>
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

      {/* CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <hr className="gold-rule mx-auto mb-8" style={{ margin: "0 auto 2rem" }} />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(26px,4vw,36px)] text-[#F7F3EA] max-w-[600px] mx-auto mb-4">
            Ready to pressure-test your platform strategy?
          </h2>
          <p className="text-[17px] text-[#C8B8FF] max-w-[480px] mx-auto mb-10">
            Thirty minutes to understand your platform thesis and whether a roadmap audit is the right next step.
          </p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[16px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Request a strategy workshop
          </Link>
        </div>
      </section>
    </>
  );
}
