import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marketplace & Platform Consultation",
  description:
    "Founder-led judgment for portal and platform builders. Independent advice, no bundling. Strategy for edtech, B2B trade, and wellness platforms.",
  alternates: { canonical: "/services/platform-consultation" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Marketplace & Platform Consultation",
  description: "Founder-led advisory for portal and platform builders. Platform strategy, roadmap audits, and targeted advisory sprints.",
  provider: { "@type": "Organization", name: "MagicWorks IT Solutions Pvt. Ltd.", url: "https://magicworksitsolutions.com" },
  areaServed: "IN",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What does MagicWorks advise on for platforms?", acceptedAnswer: { "@type": "Answer", text: "Platform strategy, build-vs-buy decisions, vendor selection, monetisation model design, feature roadmap sequencing, and market entry approach. We do not build or manage platforms on your behalf." } },
    { "@type": "Question", name: "What is a Platform Strategy Workshop?", acceptedAnswer: { "@type": "Answer", text: "A focused session — typically one to two days — that maps your platform vision, the core use case, the monetisation model, and the first 90 days of execution. The most common starting point." } },
    { "@type": "Question", name: "Who is this for?", acceptedAnswer: { "@type": "Answer", text: "Founders and product leaders building edtech platforms, B2B sourcing and trade marketplaces, and wellness and lifestyle platforms. The advisory is most useful before or during the build, not after." } },
    { "@type": "Question", name: "Is this consultation-only?", acceptedAnswer: { "@type": "Answer", text: "Yes. MagicWorks advises, designs roadmaps, and guides decisions. You choose who builds and operates the platform. That boundary keeps the advice independent and conflict-free." } },
  ],
};

const formats = [
  { tag: "Wedge", tagColor: "#5B3FBE", title: "Platform Strategy Workshop", body: "A focused session — typically one to two days — that maps your platform vision, core use case, monetisation model, and first 90 days of execution. The most common starting point.", href: "/contact" },
  { tag: "Flagship", tagColor: "#D4A537", title: "Platform Roadmap Audit", body: "A structured audit of your existing platform or pre-launch plan. Surfaces gaps in the business model, sequencing errors, build-vs-buy misalignments, and vendor risk. Delivers a prioritised roadmap.", href: "/services/platform-consultation/roadmap-audit" },
  { tag: "Fixed-scope", tagColor: "#5B3FBE", title: "Targeted Advisory Sprint", body: "A specific decision, fixed scope, fixed fee. Right for a single critical question — which vendor, which monetisation model, which partner structure.", href: "/contact" },
  { tag: "Follow-on only", tagColor: "#9A9AA8", title: "Embedded Platform Advisor", body: "A recurring retainer, sold only as a follow-on after an audit or workshop. Senior advisory presence on platform decisions on an ongoing basis.", href: "/contact" },
];

const platforms = [
  { title: "Edtech platforms", body: "Course delivery, cohort management, admission funnels, and credential systems for education businesses building at scale." },
  { title: "B2B Sourcing & Trade Marketplaces", body: "Supplier discovery, RFQ workflows, and catalogue management for industrial and trade sectors." },
  { title: "Wellness & Lifestyle Marketplaces", body: "Booking, practitioner management, and community features for wellness, fitness, and lifestyle businesses." },
];

const faq = [
  { q: "What does MagicWorks advise on for platforms?", a: "Platform strategy, build-vs-buy decisions, vendor selection, monetisation model design, feature roadmap sequencing, and market entry approach. We do not build or manage platforms on your behalf." },
  { q: "What is a Platform Strategy Workshop?", a: "A focused session — typically one to two days — that maps your platform vision, the core use case, the monetisation model, and the first 90 days of execution. The most common starting point." },
  { q: "Who is this for?", a: "Founders and product leaders building edtech platforms, B2B sourcing and trade marketplaces, and wellness and lifestyle platforms. The advisory is most useful before or during the build, not after." },
  { q: "Is this consultation-only?", a: "Yes. MagicWorks advises, designs roadmaps, and guides decisions. You choose who builds and operates the platform. That boundary keeps the advice independent and conflict-free." },
];

export default function PlatformConsultationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 04 · Advisory</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[700px]">
            Founder-led judgment for platform builders.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[540px] mt-5 mb-10">
            Independent advice on platform strategy, roadmap design, and build-vs-buy decisions. We advise. You choose who builds. No bundling, no conflict of interest.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Request a Strategy Workshop
            </Link>
            <Link href="/services" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              All services
            </Link>
          </div>
        </div>
      </section>

      {/* Boundary statement */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[720px]">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-4">
              We advise. You choose who builds.
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
              MagicWorks does not build, deploy, or operate platforms on your behalf. We advise on strategy, audit roadmaps, and guide decisions. That boundary is deliberate — it means our advice is never shaped by what we sell next, and your options remain open.
            </p>
            <p className="font-[family-name:var(--font-head)] italic text-[clamp(18px,2.4vw,24px)] text-[#2A1B5C] border-l-4 border-[#D4A537] pl-5">
              &ldquo;The most valuable platform advisor is one who has nothing to sell you after the engagement ends.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Four formats */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">
              Four engagement formats.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {formats.map((f) => (
              <div key={f.title} className="bg-white border border-[#D8D8DE] rounded-[10px] p-8 transition-all hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)]"
                style={{ borderTopWidth: 3, borderTopColor: f.tagColor }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: f.tagColor }}>{f.tag}</span>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mt-2 mb-3">{f.title}</h3>
                <p className="text-[15px] text-[#3F3F4A] mb-5">{f.body}</p>
                <Link href={f.href} className="text-[#5B3FBE] font-bold text-[12px] uppercase tracking-[0.06em] no-underline hover:underline">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform types */}
      <section className="bg-[#2A1B5C] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#F7F3EA]">
              Three priority platform types.
            </h2>
            <p className="text-[16px] text-[#C8B8FF] mt-3">
              The advisory is industry-agnostic, but we go deepest in these three.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {platforms.map((p, i) => (
              <div key={p.title} className="bg-[#3A2A6E] border border-white/10 rounded-[10px] p-7">
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#D4A537] font-bold mb-2 block">Priority {i + 1}</span>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[19px] text-[#F7F3EA] mb-3">{p.title}</h3>
                <p className="text-[14px] text-[#C8B8FF]">{p.body}</p>
              </div>
            ))}
          </div>
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
                <p className="text-[14px] text-[#3F3F4A]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <hr className="gold-rule mx-auto mb-8" style={{ margin: "0 auto 2rem" }} />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(26px,4vw,38px)] text-[#F7F3EA] max-w-[600px] mx-auto mb-4">
            Building a platform and need senior judgment?
          </h2>
          <p className="text-[17px] text-[#C8B8FF] max-w-[480px] mx-auto mb-10">
            Start with a Platform Strategy Workshop. One to two days, focused, and actionable.
          </p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[16px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Request a Strategy Workshop
          </Link>
        </div>
      </section>
    </>
  );
}
