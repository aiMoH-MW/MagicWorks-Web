import type { Metadata } from "next";
import Link from "next/link";
import PlatformContactForm from "../PlatformContactForm";

export const metadata: Metadata = {
  title: "Embedded Platform Advisor · MagicWorks",
  description:
    "Ongoing, founder-level platform judgment for founders executing a roadmap. Regular reviews, escalation support, and re-prioritisation. A follow-on only.",
  alternates: { canonical: "/services/platform-consultation/embedded-advisor" },
};

const included = [
  "Regular progress reviews against the platform roadmap",
  "Escalation support when critical platform decisions arise",
  "Periodic re-prioritisation as the market and product evolve",
  "Capped advisory hours each month, agreed up front",
];

const faq = [
  {
    q: "What is an embedded platform advisor?",
    a: "An embedded platform advisor is a senior, founder-level advisor on a monthly retainer who reviews progress against a platform roadmap, supports escalations, and re-prioritises periodically. It is sold as a follow-on to a Platform Roadmap Audit, not as a standalone engagement.",
  },
  {
    q: "Can we start here?",
    a: "No. The Embedded Platform Advisor follows a Roadmap Audit or a Platform Strategy Workshop, so there is an agreed direction to advise against. Starting here without a roadmap would mean advising without context.",
  },
  {
    q: "Do you run the platform?",
    a: "No. You execute; we advise. This is an advisory retainer, not an operational role.",
  },
  {
    q: "How much time is included?",
    a: "A capped number of advisory hours each month, agreed up front. The cap keeps the engagement advisory and the cost predictable.",
  },
];

const related = [
  { name: "Platform Roadmap Audit", href: "/services/platform-consultation/roadmap-audit", desc: "The prerequisite: the roadmap this advisor supports." },
  { name: "Targeted Advisory Sprint", href: "/services/platform-consultation/advisory-sprint", desc: "A focused sprint on a single hard decision during execution." },
  { name: "Platform Consultation", href: "/services/platform-consultation", desc: "All Platform Consultation engagement formats." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Embedded Platform Advisor",
  description: "Monthly founder-level advisory retainer with roadmap reviews, escalation support, and periodic re-prioritisation. Follow-on to a Platform Roadmap Audit only.",
  provider: { "@type": "Organization", "@id": "https://magicworksitsolutions.com/#organization", name: "MagicWorks IT Solutions Pvt. Ltd." },
  areaServed: "IN",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Platform Consultation", item: "https://magicworksitsolutions.com/services/platform-consultation" },
    { "@type": "ListItem", position: 4, name: "Embedded Platform Advisor", item: "https://magicworksitsolutions.com/services/platform-consultation/embedded-advisor" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function EmbeddedPlatformAdvisorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
            <span className="text-[#F7F3EA]">Embedded Platform Advisor</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 04 · Ongoing Retainer</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            A senior platform advisor in your corner.
          </h1>
          <p className="aeo-lede text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            For founders executing a roadmap who want a steady, senior advisor on call. Regular reviews, escalation support, and re-prioritisation as the platform evolves. Sold as a follow-on only.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <Link href="/services/platform-consultation/roadmap-audit" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Start with a Roadmap Audit
            </Link>
            <Link href="/services/platform-consultation" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              All platform consultation services
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F3EA] py-10 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ label: "Duration", val: "6 to 18 months" }, { label: "Engagement", val: "Monthly retainer" }, { label: "Hours", val: "Capped, agreed up front" }, { label: "Availability", val: "Follow-on only" }].map((i) => (
            <div key={i.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{i.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{i.val}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">What is included each month.</h2>
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

      <section className="faq-section bg-[#EDE9F7] py-20">
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

      <section className="bg-[#F7F3EA] py-16">
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

      <section id="platform-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Executing a platform roadmap and want a senior advisor on call?
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-4">
                The Embedded Platform Advisor follows a Roadmap Audit. If you have already completed one, tell us about your platform and where you are in the execution.
              </p>
              <p className="text-[15px] text-[#3F3F4A] mb-6">
                Not done a Roadmap Audit yet?{" "}
                <Link href="/services/platform-consultation/roadmap-audit" className="text-[#5B3FBE] font-semibold hover:underline">
                  Start there first.
                </Link>
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">?</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">?</span>Monthly retainer, capped hours agreed up front</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">?</span>Follow-on engagement only</li>
              </ul>
            </div>
            <PlatformContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
