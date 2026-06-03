import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Consultation for Founders & Operators",
  description:
    "A clear, defensible AI roadmap. Consultation only: we advise and design the path, and you choose who builds it. Independent AI advisory for Indian businesses.",
  alternates: { canonical: "/services/ai-consultation" },
};

/* ─── JSON-LD schemas ─────────────────────────────────────── */

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Consultation",
  provider: {
    "@type": "Organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
    url: "https://magicworksitsolutions.com",
  },
  serviceType: "AI Strategy Advisory",
  description:
    "Consultation-only AI advisory. MagicWorks audits your processes, designs the AI roadmap, and helps you choose the right vendors. We do not build or deploy AI on your behalf.",
  areaServed: { "@type": "Country", name: "India" },
  url: "https://magicworksitsolutions.com/services/ai-consultation",
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
    a: "Founders, CEOs, COOs, and CXOs at businesses with ₹25 Cr revenue or more in manufacturing or professional services.",
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

/* ─── Engagement formats ──────────────────────────────────── */

const formats = [
  {
    flagship: false,
    label: "Wedge",
    title: "AI Literacy Workshop",
    body: "1 to 3 days. For leadership teams who need a shared foundation before making AI decisions. The most common starting point.",
    link: null,
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
    body: "A focused, fixed-fee sprint around a single critical decision — which AI vendor, tool, or build approach is right for your use case.",
    link: null,
  },
  {
    flagship: false,
    label: null,
    title: "Embedded AI Advisor",
    body: "A recurring retainer engagement, sold only as a follow-on after an audit or sprint. Senior advisory presence on an ongoing basis.",
    link: null,
  },
];

/* ─── Page ────────────────────────────────────────────────── */

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

      {/* ── 1. HERO ────────────────────────────────────────────── */}
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

          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(38px,5.8vw,60px)] leading-[1.08] tracking-[-0.01em] text-[#F7F3EA] max-w-[760px] mt-3">
            A clear, defensible AI roadmap.
          </h1>

          <p className="text-[18px] leading-[1.6] text-[#C8B8FF] max-w-[560px] mt-6 mb-10">
            Consultation only. We advise, audit, and design the AI roadmap. You decide who builds it.
            Independent advice, no bundling, no conflict of interest.
          </p>

          <div className="flex gap-4 flex-wrap items-center">
            <Link
              href="/contact"
              className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block"
            >
              Book an AI Literacy Workshop
            </Link>
            <Link
              href="/tools/ai-readiness-assessment"
              className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors inline-block"
            >
              Take the AI Readiness Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. CONSULTATION-ONLY BOUNDARY ─────────────────────── */}
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

      {/* ── 3. FOUR ENGAGEMENT FORMATS ────────────────────────── */}
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
                    Learn more →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PRIORITY VERTICALS ─────────────────────────────── */}
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
                demand forecasting, and supplier intelligence — mapped to a roadmap you can defend
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

      {/* ── 5. BUYER PROFILE ──────────────────────────────────── */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-14 items-start">
            {/* Left */}
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.2vw,30px)] text-[#2A1B5C] mb-5">
                This practice is built for senior buyers.
              </h2>
              <p className="text-[17px] leading-[1.65] text-[#3F3F4A]">
                The right buyer is a founder, CEO, COO, or CXO at a business with revenue of
                ₹25&nbsp;Cr or more, who needs a clear AI strategy before committing to any vendor
                or build.
              </p>
            </div>

            {/* Right — not-a-fit callout */}
            <div className="bg-white border border-[#D4A537] rounded-[10px] p-8">
              <p className="eyebrow text-[#D4A537] mb-3">Not the right fit?</p>
              <p className="text-[16px] leading-[1.65] text-[#3F3F4A]">
                If you need someone to build or deploy AI tools, we will point you to{" "}
                <strong className="text-[#2A1B5C]">MagicFlow AI</strong> or{" "}
                <strong className="text-[#2A1B5C]">Magic Pipeline</strong> — two products built by
                the MagicWorks Group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ────────────────────────────────────────────── */}
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

      {/* ── 7. FINAL CTA ──────────────────────────────────────── */}
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
            the right fit — and what the first step looks like.
          </p>
          <div className="flex gap-4 flex-wrap items-center justify-center">
            <Link
              href="/contact"
              className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-9 py-[15px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block"
            >
              Book a discovery call
            </Link>
            <Link
              href="/tools/ai-readiness-assessment"
              className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-9 py-[15px] rounded-full no-underline hover:bg-white/10 transition-colors inline-block"
            >
              Take the AI Readiness Assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
