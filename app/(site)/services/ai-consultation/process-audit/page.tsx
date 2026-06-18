import type { Metadata } from "next";
import Link from "next/link";
import AIConsultationForm from "../AIConsultationForm";

export const metadata: Metadata = {
  title: "AI Process Audit & Roadmap · MagicWorks",
  description:
    "A defensible map of where AI can and cannot help one or two named processes, with build-vs-buy decisions and a sequenced 12-month roadmap. 4 to 6 weeks.",
  alternates: { canonical: "/services/ai-consultation/process-audit" },
};

const deliverables = [
  "A defensible map of where AI can and cannot help the named processes",
  "Honest opportunity ranking, no inflated projections",
  "Build-versus-buy decisions with the reasoning made explicit",
  "Vendor recommendations where relevant",
  "A sequenced 12-month roadmap you can act on with any partner",
];

const method = [
  { n: "01", t: "Discovery interviews", d: "We talk to the people who actually run the process, not just leadership. What works, what breaks, where the friction is." },
  { n: "02", t: "Process mapping", d: "We map the process as it is today (not the idealised version) against AI capability as it exists today." },
  { n: "03", t: "Opportunity ranking", d: "We rank the opportunities honestly: effort, risk, cost, and genuine potential. Some things AI cannot help with yet; we say so." },
  { n: "04", t: "Roadmap workshop", d: "We present our findings, make the build-versus-buy calls, and agree the sequenced twelve-month roadmap together." },
];

const faq = [
  {
    q: "What is an AI process audit?",
    a: "An AI process audit is a structured four-to-six-week engagement in which an advisor maps one or two named business processes against current AI capability, ranks the opportunities honestly, makes the build-versus-buy calls, and delivers a sequenced twelve-month roadmap the client can act on with any partner.",
  },
  {
    q: "What processes do you audit?",
    a: "One or two named processes per engagement. In manufacturing, common ones are RFQ-to-quote, proposal generation, and quality inspection reporting. In professional services, document drafting and review, client intake, and knowledge discovery.",
  },
  {
    q: "Do you build what you recommend?",
    a: "No. AI Consultation at MagicWorks is consultation only. The roadmap is the deliverable; execution is your team, an external vendor, or one of our sibling products under a separate engagement.",
  },
  {
    q: "What do we walk away with?",
    a: "A sequenced twelve-month roadmap and clear build-versus-buy decisions, written to be acted on with any partner, not just us.",
  },
  {
    q: "Does this follow a workshop, or can it stand alone?",
    a: "It can stand alone when leadership already has alignment. It frequently follows the AI Literacy Workshop when teams need shared vocabulary before committing to an audit.",
  },
];

const related = [
  { name: "AI Literacy Workshop", href: "/services/ai-consultation/workshop", desc: "Align leadership before committing to an audit." },
  { name: "AI Vendor & Build-vs-Buy Sprint", href: "/services/ai-consultation/vendor-sprint", desc: "A focused sprint on a single build-or-buy decision." },
  { name: "Embedded AI Advisor", href: "/services/ai-consultation/embedded-advisor", desc: "Senior judgment on call as your team executes the roadmap." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/ai-consultation/process-audit#service",
  name: "AI Process Audit & Roadmap",
  description:
    "A four-to-six-week engagement that maps one or two named processes against AI capability, ranks opportunities honestly, makes build-versus-buy calls, and delivers a sequenced twelve-month roadmap.",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
  },
  areaServed: "IN",
  offers: {
    "@type": "Offer",
    description: "Fixed-scope AI process audit, 4 to 6 weeks. Consultation only; no build obligation.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "AI Consultation", item: "https://magicworksitsolutions.com/services/ai-consultation" },
    { "@type": "ListItem", position: 4, name: "AI Process Audit", item: "https://magicworksitsolutions.com/services/ai-consultation/process-audit" },
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
  url: "https://magicworksitsolutions.com/services/ai-consultation/process-audit",
  name: "AI Process Audit & Roadmap · MagicWorks",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".aeo-lede", ".faq-section"],
  },
};

export default function ProcessAuditPage() {
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
            <Link href="/services/ai-consultation" className="hover:text-[#F7F3EA] transition-colors no-underline">AI Consultation</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">AI Process Audit & Roadmap</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 03 · Flagship Engagement</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            A defensible AI roadmap you can act on with any partner.
          </h1>
          <p className="aeo-lede text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            Our flagship. Over four to six weeks we map one or two named processes, rank the opportunities honestly, make the build-versus-buy calls, and hand you a sequenced twelve-month roadmap. The deliverable is a decision, not a sales pitch, and you execute with whoever you choose.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a href="#ai-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Book a discovery call
            </a>
            <Link href="/services/ai-consultation" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              All AI consultation services
            </Link>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="bg-[#F7F3EA] py-10 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Duration", val: "4 to 6 weeks" },
            { label: "Scope", val: "1 to 2 named processes" },
            { label: "Deliverable", val: "12-month roadmap" },
            { label: "Boundary", val: "Consultation only" },
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
              We design the roadmap. You choose who executes it.
            </h2>
            <p className="text-[16px] text-[#C8B8FF] leading-[1.65]">
              MagicWorks AI Consultation is consultation only. We advise, audit, and design the roadmap. We do not build, deploy, or operate AI on the client's behalf. That boundary is not a limitation; it is the differentiator. A consultant who also builds has an incentive to recommend building. We do not.
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-[10px] p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-4">You execute with</p>
            <ul className="space-y-3">
              {["Your own team", "An external build vendor", "MagicFlow AI (our SaaS product, separate contract)", "Magic Pipeline (our SaaS product, separate contract)"].map((opt) => (
                <li key={opt} className="flex items-center gap-3 text-[15px] text-[#F7F3EA]">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4A537]" />
                  {opt}
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

      {/* Industries */}
      <section className="bg-[#2A1B5C] py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="eyebrow text-[#D4A537] mb-6">Priority verticals</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                industry: "Manufacturing",
                processes: ["RFQ-to-quote", "Proposal generation", "Quality inspection reporting", "Supplier communication", "Production scheduling inputs"],
              },
              {
                industry: "Professional Services",
                processes: ["Document drafting and review", "Client intake and conflict checks", "Knowledge discovery", "Proposal and pricing generation", "Compliance and regulatory tracking"],
              },
            ].map((v) => (
              <div key={v.industry} className="bg-white/10 border border-white/20 rounded-[10px] p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#D4A537] mb-3">{v.industry}</p>
                <ul className="space-y-2">
                  {v.processes.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[14px] text-[#C8B8FF]">
                      <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#D4A537]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-[#9A8FBF] mt-6">These are example processes. Any audit scopes the named processes at the start based on where you believe the opportunity is.</p>
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

      <section id="ai-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Ready to find out honestly where AI fits in your business?
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us about your business processes and we will confirm whether an audit is the right next step.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Fixed-scope audit, consultation only</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>You choose what to build and with whom</li>
              </ul>
            </div>
            <AIConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
