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
      { "@type": "Offer", position: 1, itemOffered: { "@type": "Service", name: "AI Literacy Workshop", description: "A 1 to 3 day workshop for leadership teams to build a shared foundation before making AI investment decisions." } },
      { "@type": "Offer", position: 2, itemOffered: { "@type": "Service", name: "AI Process Audit & Roadmap", description: "A full structured audit of your operations to surface AI opportunities, followed by a prioritised, defensible roadmap." } },
      { "@type": "Offer", position: 3, itemOffered: { "@type": "Service", name: "Vendor & Build-vs-Buy Sprint", description: "A focused sprint for a single critical AI decision — which vendor to choose, whether to build or buy, and how to evaluate options." } },
      { "@type": "Offer", position: 4, itemOffered: { "@type": "Service", name: "Embedded AI Advisor", description: "A recurring advisory retainer, available as a follow-on after an audit, providing ongoing senior AI advisory presence." } },
    ],
  },
};

const faqItems = [
  {
    q: "What is AI consultation?",
    a: "We advise on AI strategy, audit processes, and design roadmaps. We do not build or deploy AI.",
  },
  {
    q: "What does consultation-only mean?",
    a: "MagicWorks does not bundle advisory with implementation. You stay free to choose your own vendors.",
  },
  {
    q: "Who is this for?",
    a: "Founders, CEOs, COOs, and CXOs at businesses with ?25 Cr revenue or more in manufacturing or professional services.",
  },
  {
    q: "What is the AI Literacy Workshop?",
    a: "A 1 to 3 day workshop for leadership teams, designed to build a shared foundation before making AI investment decisions.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://magicworksitsolutions.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://magicworksitsolutions.com/services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "AI Consultation",
      item: "https://magicworksitsolutions.com/services/ai-consultation",
    },
  ],
};

/* --- Engagement formats ------------------------------------ */

const formats = [
  {
    flagship: false,
    label: "Wedge",
    title: "AI Literacy Workshop",
    body: "1 to 3 days. For leadership teams who need a shared foundation before making AI decisions. The most common starting point.",
    link: "/services/ai-consultation/workshop",
  },
  {
    flagship: true,
    label: "Flagship",
    title: "AI Process Audit + Roadmap",
    body: "The flagship. A structured audit of your processes to identify AI opportunities, followed by a prioritised roadmap with build-vs-buy guidance.",
    link: "/services/ai-consultation/process-audit",
  },
  {
    flagship: false,
    label: null,
    title: "Vendor & Build-vs-Buy Sprint",
    body: "A focused, fixed-fee sprint around a single critical decision: which AI vendor, tool, or build approach is right for your use case.",
    link: "/services/ai-consultation/vendor-sprint",
  },
  {
    flagship: false,
    label: null,
    title: "Embedded AI Advisor",
    body: "A recurring retainer engagement, sold only as a follow-on after an audit or sprint. Senior advisory presence on an ongoing basis.",
    link: "/services/ai-consultation/embedded-advisor",
  },
];

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

      {/* -- 1. HERO ---------------------------------------------- */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-32 pb-24 relative overflow-hidden">
        {/* Ring SVG — 5 circles alternating violet / gold */}
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
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex gap-2 items-center text-[12px] text-[#9A8FBF]">
              <li>
                <Link href="/" className="hover:text-[#C8B8FF] transition-colors no-underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#5B3FBE]">
                /
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C8B8FF] transition-colors no-underline">
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#5B3FBE]">
                /
              </li>
              <li className="text-[#C8B8FF]" aria-current="page">
                AI Consultation
              </li>
            </ol>
          </nav>

          <p className="eyebrow text-[#D4A537] mb-4">Pillar 03 · Advisory</p>

          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(38px,5.8vw,60px)] leading-[1.08] tracking-[-0.01em] text-[#F7F3EA] max-w-[820px] mt-3">
            A clear, defensible AI roadmap.
          </h1>

          <p className="text-[18px] leading-[1.6] text-[#C8B8FF] max-w-[620px] mt-6 mb-10">
            Consultation only. We advise, audit, and design the AI roadmap. You decide who builds it.
            Independent advice, no bundling, no conflict of interest.
          </p>

          <div className="flex gap-4 flex-wrap items-center">
            <a
              href="#ai-enquiry"
              className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block"
            >
              Book an AI Literacy Workshop
            </a>
            <Link
              href="/tools/ai-readiness-assessment"
              className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors inline-block"
            >
              Take the AI Readiness Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* -- 2. CONSULTATION-ONLY BOUNDARY ----------------------- */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[760px]">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-5">
              We advise. You choose who builds.
            </h2>
            <p className="text-[17px] leading-[1.65] text-[#3F3F4A] mb-10">
              MagicWorks does not build, deploy, or operate AI on your behalf. We audit your
              processes, design the roadmap, and help you choose the right vendors and tools. That
              boundary keeps our advice honest and your options open.
            </p>

            {/* Pullquote */}
            <blockquote className="border-l-[3px] border-[#D4A537] pl-7 py-1">
              <p className="pullquote">
                &ldquo;The most useful AI advisor in the room is the one with nothing to sell you.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* -- 3. FOUR ENGAGEMENT FORMATS -------------------------- */}
      <section className="bg-[#F7F3EA] py-6 pb-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-3">
              Four ways to engage.
            </h2>
            <p className="text-[15px] text-[#3F3F4A]">
              Each format is designed for a specific moment in your AI journey. Most clients start
              with the Workshop or the Process Audit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formats.map((f) => (
              <div
                key={f.title}
                className={`bg-white border border-[#D8D8DE] rounded-[10px] p-8 relative transition-all hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)] ${
                  f.flagship
                    ? "border-t-[3px] border-t-[#D4A537]"
                    : "border-t-[3px] border-t-[#5B3FBE]"
                }`}
              >
                {/* Label badge */}
                {f.flagship && (
                  <span className="absolute top-7 right-7 bg-[#D4A537] text-[#2A1B5C] text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full">
                    Flagship
                  </span>
                )}
                {f.label === "Wedge" && (
                  <span className="absolute top-7 right-7 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5B3FBE]">
                    Wedge
                  </span>
                )}

                <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-3 pr-20">
                  {f.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-[#3F3F4A] mb-6">{f.body}</p>

                {f.link && (
                  <Link
                    href={f.link}
                    className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] no-underline hover:underline"
                  >
                    Learn more ?
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- 4. PRIORITY VERTICALS ------------------------------- */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#F7F3EA]">
              Two priority verticals.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Manufacturing — Priority 1, large card */}
            <div className="bg-[#3A2A6E] border border-[#5B3FBE]/40 border-t-[3px] border-t-[#D4A537] rounded-[10px] p-10 md:col-span-2 lg:col-span-1 transition-all hover:-translate-y-[2px] hover:shadow-[0_14px_40px_rgba(0,0,0,0.25)]">
              <span className="eyebrow text-[#D4A537] mb-3 block">Priority 1</span>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,2.8vw,28px)] text-[#F7F3EA] mb-4">
                Manufacturing
              </h3>
              <p className="text-[16px] leading-[1.65] text-[#C8B8FF]">
                For manufacturers with complex operations. Process automation, quality control,
                demand forecasting, and supplier intelligence, mapped to a roadmap you can defend
                to your board.
              </p>
            </div>

            {/* Professional Services — Priority 2 */}
            <div className="bg-[#3A2A6E] border border-[#5B3FBE]/40 border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-10 transition-all hover:-translate-y-[2px] hover:shadow-[0_14px_40px_rgba(0,0,0,0.25)]">
              <span className="eyebrow text-[#C8B8FF] mb-3 block">Priority 2</span>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,2.8vw,28px)] text-[#F7F3EA] mb-4">
                Professional Services
              </h3>
              <p className="text-[16px] leading-[1.65] text-[#C8B8FF]">
                For CA firms, law practices, consultancies, and advisory firms with 50 or more
                professionals. Knowledge work is where AI delivers the fastest measurable gains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -- 5. WHO THIS IS FOR ---------------------------------- */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-14">
            <hr className="gold-rule mb-5" />
            <p className="eyebrow text-[#5B3FBE] mb-4">Who this is for</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(26px,3.6vw,34px)] text-[#2A1B5C] leading-[1.18]">
              Best for leaders who want direction, not a sales pitch.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* A strong fit */}
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

            {/* Not a fit */}
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

      {/* -- 6. FAQ ---------------------------------------------- */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-10">
            Common questions
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {faqItems.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-[15px] text-[#2A1B5C] mb-2">{f.q}</h3>
                <p className="text-[14px] leading-[1.65] text-[#3F3F4A]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- 7. FINAL CTA ---------------------------------------- */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-24 relative overflow-hidden">
        {/* Decorative ring */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 bottom-[-380px] w-[720px] h-[720px] pointer-events-none opacity-60"
          aria-hidden="true"
        >
          {[120, 200, 280, 360, 440].map((r, i) => (
            <circle
              key={r}
              cx="360"
              cy="360"
              r={r}
              fill="none"
              stroke={i % 2 === 1 ? "#D4A537" : "#7C63D8"}
              strokeWidth="1.5"
              opacity={i % 2 === 1 ? 0.65 : 0.4}
            />
          ))}
        </svg>

        <div className="max-w-[1120px] mx-auto px-8 relative">
          <hr className="gold-rule mx-auto mb-8" style={{ margin: "0 auto 2rem" }} />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#F7F3EA] max-w-[600px] mx-auto mb-4">
            Start with a conversation.
          </h2>
          <p className="text-[18px] text-[#C8B8FF] max-w-[500px] mx-auto mb-10">
            A thirty-minute discovery call, no obligation. We will tell you honestly whether we are
            the right fit, and what the first step looks like.
          </p>
          <div className="flex gap-4 flex-wrap items-center justify-center">
            <a
              href="#ai-enquiry"
              className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-9 py-[15px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block"
            >
              Book a discovery call
            </a>
            <Link
              href="/tools/ai-readiness-assessment"
              className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-9 py-[15px] rounded-full no-underline hover:bg-white/10 transition-colors inline-block"
            >
              Take the AI Readiness Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* AI Enquiry form */}
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
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Consultation only — no build obligation</li>
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
