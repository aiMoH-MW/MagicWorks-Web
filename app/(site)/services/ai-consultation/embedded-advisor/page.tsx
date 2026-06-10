import type { Metadata } from "next";
import Link from "next/link";
import AIConsultationForm from "../AIConsultationForm";

export const metadata: Metadata = {
  title: "Embedded AI Advisor · MagicWorks",
  description:
    "Senior AI judgment on call while your team or chosen vendors execute the roadmap. Monthly reviews, escalation support, quarterly re-prioritisation. A follow-on only.",
  alternates: { canonical: "/services/ai-consultation/embedded-advisor" },
};

const included = [
  "Monthly progress review against the roadmap",
  "Escalation support when implementation decisions arise",
  "Quarterly re-prioritisation as the landscape evolves",
  "Capped advisory hours each month, agreed up front",
];

const faq = [
  {
    q: "What is an embedded AI advisor?",
    a: "An embedded AI advisor is a senior AI consultant on a monthly retainer who reviews roadmap progress, supports escalations, and re-prioritises quarterly as the team executes. It is sold as a follow-on to an AI Process Audit, not as a standalone engagement.",
  },
  {
    q: "Can we start here without a Process Audit?",
    a: "No. The Embedded Advisor follows an AI Process Audit because there must be a roadmap to advise against. Starting here without a roadmap would mean advising in a vacuum.",
  },
  {
    q: "Do you manage our vendors?",
    a: "We advise and support escalations. Your team or chosen vendors do the execution. We are not a project manager; we are an independent advisor.",
  },
  {
    q: "How much time is included each month?",
    a: "A capped number of advisory hours, agreed at the start of the engagement. The cap ensures predictable cost and keeps the relationship advisory rather than operational.",
  },
];

const related = [
  { name: "AI Process Audit & Roadmap", href: "/services/ai-consultation/process-audit", desc: "The prerequisite: the roadmap this advisor supports." },
  { name: "AI Vendor & Build-vs-Buy Sprint", href: "/services/ai-consultation/vendor-sprint", desc: "A focused sprint on a specific decision during execution." },
  { name: "AI Consultation", href: "/services/ai-consultation", desc: "All AI consultation engagement formats." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Embedded AI Advisor",
  description: "Monthly AI advisory retainer with roadmap reviews, escalation support, and quarterly re-prioritisation. Follow-on to an AI Process Audit only.",
  provider: { "@type": "Organization", "@id": "https://magicworksitsolutions.com/#organization", name: "MagicWorks IT Solutions Pvt. Ltd." },
  areaServed: "IN",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "AI Consultation", item: "https://magicworksitsolutions.com/services/ai-consultation" },
    { "@type": "ListItem", position: 4, name: "Embedded AI Advisor", item: "https://magicworksitsolutions.com/services/ai-consultation/embedded-advisor" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function EmbeddedAdvisorPage() {
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
            <Link href="/services/ai-consultation" className="hover:text-[#F7F3EA] transition-colors no-underline">AI Consultation</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Embedded AI Advisor</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 03 · Ongoing Retainer</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            Senior AI judgment on call, while you execute.
          </h1>
          <p className="aeo-lede text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            For teams executing an AI roadmap who want a steady, senior hand. We review progress monthly, support escalations, and re-prioritise quarterly. Your team or your chosen vendors build; we advise. Sold as a follow-on to an AI Process Audit only.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <Link href="/services/ai-consultation/process-audit" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Start with a Process Audit
            </Link>
            <Link href="/services/ai-consultation" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              All AI consultation services
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

      <section id="ai-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Have a roadmap and need a senior advisor to see it through?
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-4">
                The Embedded Advisor follows an AI Process Audit. If you have completed one, tell us where you are in execution.
              </p>
              <p className="text-[15px] text-[#3F3F4A] mb-6">
                No audit yet?{" "}
                <Link href="/services/ai-consultation/process-audit" className="text-[#5B3FBE] font-semibold hover:underline">
                  Start with a Process Audit.
                </Link>
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Monthly retainer, capped hours agreed up front</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Follow-on engagement only</li>
              </ul>
            </div>
            <AIConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
