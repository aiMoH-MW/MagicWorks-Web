import type { Metadata } from "next";
import Link from "next/link";
import AIConsultationForm from "./AIConsultationForm";

export const metadata: Metadata = {
  title: "AI Consultation for Founders & Operators",
  description:
    "A clear, defensible AI roadmap. Consultation only: we advise and design the path, and you choose who builds it. Independent AI advisory for Indian businesses.",
  alternates: { canonical: "/services/ai-consultation" },
};

/* --- JSON-LD schemas --------------------------------------- */

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/ai-consultation#service",
  name: "AI Consultation",
  alternateName: "AI Strategy Advisory",
  serviceType: "AI Strategy Advisory",
  category: "Technology Consulting",
  description:
    "Consultation-only AI advisory for founders and operators. MagicWorks audits your processes, designs the AI roadmap, and helps you choose the right vendors. We do not build or deploy AI on your behalf.",
  url: "https://magicworksitsolutions.com/services/ai-consultation",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
    url: "https://magicworksitsolutions.com",
  },
  areaServed: { "@type": "Country", name: "India" },
  audience: {
    "@type": "Audience",
    audienceType:
      "Founders, CEOs, COOs, and CXOs at Indian businesses with ₹25 Cr+ revenue in manufacturing or professional services seeking a defensible AI roadmap.",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Consultation Engagement Formats",
    itemListElement: [
      { "@type": "Offer", position: 1, itemOffered: { "@type": "Service", name: "AI Literacy Workshop", description: "One to three days to get your leadership team fluent and aligned on what AI can and cannot do for your business." } },
      { "@type": "Offer", position: 2, itemOffered: { "@type": "Service", name: "AI Process Audit & Roadmap", description: "A fixed-scope sprint that maps your processes, finds the highest-value automation opportunities, and returns a prioritised, build-or-buy roadmap." } },
      { "@type": "Offer", position: 3, itemOffered: { "@type": "Service", name: "Vendor & Build-vs-Buy Sprint", description: "A focused, fixed-fee engagement to evaluate vendors or decide whether to build, buy, or wait on a specific AI initiative." } },
      { "@type": "Offer", position: 4, itemOffered: { "@type": "Service", name: "Embedded AI Advisor", description: "An ongoing advisory retainer for teams executing a roadmap who want senior judgment on call." } },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is AI consultation?", acceptedAnswer: { "@type": "Answer", text: "We advise on AI strategy, audit processes, and design roadmaps. We do not build or deploy AI." } },
    { "@type": "Question", name: "What does consultation-only mean?", acceptedAnswer: { "@type": "Answer", text: "MagicWorks does not bundle advisory with implementation. You stay free to choose your own vendors." } },
    { "@type": "Question", name: "Who is this for?", acceptedAnswer: { "@type": "Answer", text: "Founders, CEOs, COOs, and CXOs at businesses with ₹25 Cr revenue or more in manufacturing or professional services." } },
    { "@type": "Question", name: "What is the AI Literacy Workshop?", acceptedAnswer: { "@type": "Answer", text: "A 1 to 3 day workshop for leadership teams, designed to build a shared foundation before making AI investment decisions." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "AI Consultation", item: "https://magicworksitsolutions.com/services/ai-consultation" },
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://magicworksitsolutions.com/services/ai-consultation",
  url: "https://magicworksitsolutions.com/services/ai-consultation",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".eyebrow"],
  },
};

/* --- Page -------------------------------------------------- */

export default function AIConsultationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      {/* -- 1. HERO -- */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg
          className="absolute right-[-220px] top-[-180px] w-[800px] h-[800px] pointer-events-none opacity-70"
          aria-hidden="true"
        >
          {[110, 190, 270, 350, 430].map((r, i) => (
            <circle
              key={r}
              cx="400"
              cy="400"
              r={r}
              fill="none"
              stroke={i % 2 === 1 ? "#D4A537" : "#7C63D8"}
              strokeWidth="1.5"
              opacity={i % 2 === 1 ? 0.65 : 0.4}
            />
          ))}
        </svg>

        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex gap-2 items-center text-[12px] text-[#9A8FBF]">
              <li>
                <Link href="/" className="hover:text-[#C8B8FF] transition-colors no-underline">Home</Link>
              </li>
              <li aria-hidden="true" className="text-[#5B3FBE]">/</li>
              <li>
                <Link href="/services" className="hover:text-[#C8B8FF] transition-colors no-underline">Services</Link>
              </li>
              <li aria-hidden="true" className="text-[#5B3FBE]">/</li>
              <li className="text-[#C8B8FF]" aria-current="page">AI Consultation</li>
            </ol>
          </nav>

          <p className="eyebrow text-[#D4A537] mb-4">Pillar 03 · Advisory · Consultation only</p>

          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(38px,5.8vw,60px)] leading-[1.08] tracking-[-0.01em] text-[#F7F3EA] max-w-[820px] mt-3">
            A clear, defensible AI roadmap.
          </h1>

          <hr className="w-[64px] h-[3px] bg-[#D4A537] border-0 my-6" />

          <p className="text-[18px] leading-[1.6] text-[#C8B8FF] max-w-[620px] mb-10">
            Senior, independent AI advice for founders and operators. We help you decide what to automate, in what order, and whether to build or buy. Then you choose who executes. We do not build it for you, and that is exactly the point.
          </p>

          <div className="flex gap-4 flex-wrap items-center">
            <Link
              href="/tools/ai-readiness-assessment"
              className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block"
            >
              Take the AI readiness assessment
            </Link>
            <a
              href="#formats"
              className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors inline-block"
            >
              See how we engage
            </a>
          </div>
        </div>
      </section>

      {/* -- 2. AT A GLANCE -- */}
      <section className="bg-[#F7F3EA] py-12 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Engagement", value: "Fixed-scope sprint" },
              { label: "Length", value: "4 to 8 weeks" },
              { label: "Built for", value: "Founders, CEOs, COOs" },
              { label: "Boundary", value: "Consultation only" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{item.label}</p>
                <p className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- 3. BOUNDARY -- */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg
          className="absolute left-[-180px] bottom-[-220px] w-[640px] h-[640px] pointer-events-none opacity-70"
          aria-hidden="true"
        >
          {[140, 225, 310].map((r, i) => (
            <circle
              key={r}
              cx="320"
              cy="320"
              r={r}
              fill="none"
              stroke={i === 1 ? "#D4A537" : "#7C63D8"}
              strokeWidth="1.5"
              opacity={i === 1 ? 0.65 : 0.4}
            />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">The boundary</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4.2vw,42px)] leading-[1.18] text-[#F7F3EA] max-w-[780px] my-6">
            We advise. You choose who builds.
          </h2>
          <p className="text-[17px] leading-[1.6] text-[#C8B8FF] max-w-[680px]">
            Most AI consultancies sell you a roadmap and then sell you the build. The incentive is to recommend more work, not the right work. We made a deliberate choice not to do that. MagicWorks AI Consultation is consultation only. We run the workshop, audit your processes, and design the roadmap. When you are ready to execute, the choice is entirely yours: your own team, an external vendor, or one of our sibling products. That independence is what makes our advice worth paying for.
          </p>
          <div className="mt-12 border-l-[4px] border-[#D4A537] pl-6 max-w-[680px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4A537] mb-2">No bundling, ever</p>
            <p className="text-[14.5px] text-[#C8B8FF] leading-[1.65]">
              Execution, when you want it, runs through MagicFlow AI, Magic Pipeline, or your chosen partner, always under a separate and clean engagement. You never pay us to recommend ourselves.
            </p>
          </div>
        </div>
      </section>

      {/* -- 4. ENGAGEMENT FORMATS -- */}
      <section id="formats" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-4">How we engage</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              Four ways in. One honest direction.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              Most clients start with a workshop and move to the audit. Some come straight for the audit. The embedded advisor is a follow-on for teams already executing a roadmap.
            </p>
          </div>

          {/* Featured card */}
          <div className="bg-[#2A1B5C] text-[#F7F3EA] rounded-[10px] border-t-[3px] border-t-[#D4A537] p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center mb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4A537] mb-2">The flagship</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#F7F3EA] mb-3">
                AI Process Audit &amp; Roadmap
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#C8B8FF] max-w-[640px]">
                A fixed-scope sprint that maps your processes, finds the highest-value automation opportunities, and returns a prioritised, build-or-buy roadmap you can act on with any partner. The deliverable is a decision, not a sales pitch.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/services/ai-consultation/process-audit"
                className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block whitespace-nowrap"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Three smaller cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "Usual entry point",
                title: "AI Literacy Workshop",
                body: "One to three days to get your leadership team fluent and aligned on what AI can and cannot do for your business. The most common way clients begin.",
                link: "/services/ai-consultation/workshop",
              },
              {
                tag: "A single decision",
                title: "Vendor & Build-vs-Buy Sprint",
                body: "A focused, fixed-fee engagement to evaluate vendors or decide whether to build, buy, or wait on a specific AI initiative. Clear recommendation, clear reasoning.",
                link: "/services/ai-consultation/vendor-sprint",
              },
              {
                tag: "Follow-on only",
                title: "Embedded AI Advisor",
                body: "An ongoing advisory retainer for teams executing a roadmap who want senior judgment on call. A follow-on engagement, never a starting point.",
                link: "/services/ai-consultation/embedded-advisor",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-8 flex flex-col transition-all hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)]"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A9AA8] mb-1">{f.tag}</p>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mt-1 mb-4">{f.title}</h3>
                <p className="text-[14px] leading-[1.6] text-[#3F3F4A] flex-1 mb-6">{f.body}</p>
                <Link
                  href={f.link}
                  className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] no-underline hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- 5. VERTICALS -- */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-4">Where we focus</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              Depth in two sectors.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              AI advice is only as good as the understanding behind it. We concentrate where we know the processes well enough to have a real opinion.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-12 relative transition-all hover:-translate-y-[2px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)]">
              <span className="absolute top-12 right-12 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a7b1f]">
                Priority 1
              </span>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-4">
                Manufacturing
              </h3>
              <p className="text-[15px] leading-[1.65] text-[#3F3F4A]">
                Mid-market manufacturers, roughly ₹100 to ₹500 Cr in revenue, with clean processes and an appetite to lead rather than follow. An under-served market in India where the right AI roadmap becomes a durable advantage.
              </p>
            </div>
            <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-12 relative transition-all hover:-translate-y-[2px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)]">
              <span className="absolute top-12 right-12 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a7b1f]">
                Priority 2
              </span>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-4">
                Professional Services
              </h3>
              <p className="text-[15px] leading-[1.65] text-[#3F3F4A]">
                CA, law, consulting, and advisory firms with 50 or more professionals. Process-rich, founder-led, and uniquely able to refer: trusted advisors who trust our judgment tend to introduce us to others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -- 6. WHO THIS IS FOR -- */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-14">
            <p className="eyebrow text-[#5B3FBE] mb-4">Who this is for</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(26px,3.6vw,34px)] text-[#2A1B5C] leading-[1.18]">
              Best for leaders who want direction, not a sales pitch.
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
                  "A founder, CEO, COO, or CXO who wants honest direction before spending on a build.",
                  "Willing to invest in getting the strategy right first, then execute with the partner of your choice.",
                  "Has real processes worth examining, in manufacturing or professional services especially.",
                  "Open to involving the people who actually run those processes day to day.",
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
                  "Wanting us to build and run the AI for you. That is a separate engagement with a separate brand.",
                  "Looking for a quick stamp of approval on a decision already made.",
                  "Expecting a tool recommendation without examining the underlying process.",
                  "Unwilling to share how the business actually works.",
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

      {/* -- 7. FINAL CTA -- */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-24 relative overflow-hidden">
        <svg
          className="absolute left-1/2 -translate-x-1/2 bottom-[-360px] w-[680px] h-[680px] pointer-events-none opacity-60"
          aria-hidden="true"
        >
          {[150, 240, 330].map((r, i) => (
            <circle
              key={r}
              cx="340"
              cy="340"
              r={r}
              fill="none"
              stroke={i === 1 ? "#D4A537" : "#7C63D8"}
              strokeWidth="1.5"
              opacity={i === 1 ? 0.65 : 0.4}
            />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#F7F3EA] max-w-[640px] mx-auto mb-4">
            Not sure where to start?
          </h2>
          <hr className="w-[64px] h-[3px] bg-[#D4A537] border-0 mx-auto my-6" />
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mx-auto mb-10">
            Take our five-minute AI readiness assessment, or book a literacy workshop. Either way, we will tell you honestly what is worth doing and what is not.
          </p>
          <Link
            href="/tools/ai-readiness-assessment"
            className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-9 py-[15px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block"
          >
            Take the AI readiness assessment
          </Link>
        </div>
      </section>

      {/* -- 8. FORM -- */}
      <section id="ai-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Start with a conversation.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                A thirty-minute discovery call, no obligation. We will tell you honestly whether we are the right fit and what the first step looks like.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Consultation only, no build obligation</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Independent advice, no vendor conflict</li>
              </ul>
            </div>
            <AIConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
