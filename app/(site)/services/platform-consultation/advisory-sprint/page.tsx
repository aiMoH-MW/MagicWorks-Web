import type { Metadata } from "next";
import Link from "next/link";
import PlatformContactForm from "../PlatformContactForm";

export const metadata: Metadata = {
  title: "Targeted Advisory Sprint · Platform Consultation · MagicWorks",
  description:
    "A focused, fixed-fee engagement on a single hard platform decision: pricing model, marketplace liquidity, or build-or-buy on a specific module. 2 to 4 weeks.",
  alternates: { canonical: "/services/platform-consultation/advisory-sprint" },
};

const faq = [
  {
    q: "What is a targeted advisory sprint?",
    a: "A targeted advisory sprint is a focused, fixed-fee consultation of two to four weeks on a single high-stakes platform decision, such as a pricing model, marketplace liquidity strategy, or build-or-buy on a specific module. It ends with a clear recommendation and the reasoning behind it.",
  },
  {
    q: "What kinds of decisions does it cover?",
    a: "Pricing models, marketplace liquidity strategy, build-or-buy on a specific module, go-to-market sequencing, or any other focused platform decision where you need independent senior judgment quickly.",
  },
  {
    q: "Is it standalone?",
    a: "Yes, or it can follow a Platform Roadmap Audit when a specific decision needs deeper focus. It is scoped to one named decision.",
  },
  {
    q: "Do you build?",
    a: "No. This is advisory only. The recommendation is the deliverable.",
  },
];

const related = [
  { name: "Platform Roadmap Audit", href: "/services/platform-consultation/roadmap-audit", desc: "The full strategy sprint before zooming into one decision." },
  { name: "Embedded Platform Advisor", href: "/services/platform-consultation/embedded-advisor", desc: "Ongoing advisory as your team executes the roadmap." },
  { name: "Platform Consultation", href: "/services/platform-consultation", desc: "All Platform Consultation engagement formats." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Targeted Advisory Sprint",
  description: "A two-to-four-week fixed-fee consultation sprint focused on one specific platform decision, delivering a clear recommendation with reasoning.",
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
    { "@type": "ListItem", position: 4, name: "Targeted Advisory Sprint", item: "https://magicworksitsolutions.com/services/platform-consultation/advisory-sprint" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function AdvisorySprintPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340, 420].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav className="flex items-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/services/platform-consultation" className="hover:text-[#F7F3EA] transition-colors no-underline">Platform Consultation</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Targeted Advisory Sprint</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 04 · Focused Sprint</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            One hard decision, resolved.
          </h1>
          <p className="aeo-lede text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            A focused, fixed-fee engagement on a single high-stakes platform decision (pricing model, marketplace liquidity, build-or-buy on a module) that ends with a clear recommendation and the reasoning behind it.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a href="#platform-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Book a discovery call
            </a>
            <Link href="/services/platform-consultation" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              All platform consultation services
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F3EA] py-10 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ label: "Duration", val: "2 to 4 weeks" }, { label: "Scope", val: "One named decision" }, { label: "Deliverable", val: "Clear recommendation" }, { label: "Boundary", val: "Advisory only" }].map((i) => (
            <div key={i.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{i.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{i.val}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#2A1B5C] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="eyebrow text-[#D4A537] mb-4">Example decisions</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#F7F3EA] mb-8 max-w-[600px]">
            When one question is blocking progress.
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Which pricing model (subscription, transaction fee, or freemium) fits this market and network?", "How do we solve the supply-side cold-start problem before we can grow demand?", "Build this module ourselves, buy an off-the-shelf tool, or integrate an API?", "Which vertical or geography do we enter first to create a defensible foothold?"].map((d) => (
              <div key={d} className="flex items-start gap-4 bg-white/10 border border-white/20 rounded-[10px] p-5">
                <span className="mt-[3px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4A537] mt-2" />
                <p className="text-[15px] text-[#C8B8FF]">{d}</p>
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
                Ready to get a clear answer on your hardest platform decision?
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us the decision you are facing and we will confirm whether a sprint is the right scope and approach.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">?</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">?</span>Fixed scope, fixed fee — one named decision</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">?</span>Independent advice, no downstream obligation</li>
              </ul>
            </div>
            <PlatformContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
