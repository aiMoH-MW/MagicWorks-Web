import type { Metadata } from "next";
import Link from "next/link";
import GateForm from "./_GateForm";

export const metadata: Metadata = {
  title: "AI for Professional Services Firms (Free) · A Partner's Guide to Confidentiality, Process & ROI · MagicWorks",
  description:
    "Free guide for partners at CA, law, consulting, and advisory firms: where AI creates value, how to handle confidentiality and risk, and a staged, safe path to adoption. Vendor-neutral. Download with your email.",
  alternates: {
    canonical: "/insights/reports/ai-for-professional-services",
  },
  openGraph: {
    title: "AI for Professional Services Firms · MagicWorks",
    description:
      "A partner's guide to confidentiality, process, and ROI. Vendor-neutral, for Indian firms.",
    type: "website",
  },
};

const PILLARS = [
  {
    num: "01",
    title: "Why firms are different",
    body: "Confidentiality, privilege, and judgement are the product, so the approach must differ.",
  },
  {
    num: "02",
    title: "Where AI creates value",
    body: "The internal-leverage use cases, ordered by how safely you can start.",
  },
  {
    num: "03",
    title: "Confidentiality & risk",
    body: "The core: client data rules, vendor and data choices, accuracy, and a use policy.",
  },
  {
    num: "04",
    title: "A staged adoption path",
    body: "Internal, then review, then client-facing, earning trust at each stage.",
  },
  {
    num: "05",
    title: "Build versus buy",
    body: "Why most firms should buy secure, proven tools, and how to vet a vendor.",
  },
  {
    num: "+",
    title: "90-day plan & checklist",
    body: "A safe sequence to a first measured pilot, plus a one-page checklist.",
    gold: true,
  },
];

const LEARNINGS = [
  "Why confidentiality and risk come before capability",
  "Where AI gives your experts genuine leverage",
  "What client data may and may not enter a tool",
  "How to vet a vendor's data handling and security",
  "How to keep a human accountable for every output",
  "A staged path from internal use to client-facing",
  "What belongs in a firm-wide AI use policy",
  "How to measure ROI in expert time and turnaround",
];

const FAQ = [
  {
    q: "Is it safe to use AI with confidential client data?",
    a: "Only with tools you have vetted and contracted for exactly that, with clear data-handling terms. Confidential and privileged material should never go into unvetted or consumer tools. Start with internal, non-sensitive work.",
  },
  {
    q: "Is it really free?",
    a: "Yes. We email you the PDF in exchange for your details, and occasionally share relevant insights. You can unsubscribe anytime.",
  },
  {
    q: "Will AI replace our associates?",
    a: "No. It removes repetitive drafting and research load so your people spend more time on judgement and client work. The expertise and accountability stay with them.",
  },
  {
    q: "What about our professional and regulatory obligations?",
    a: "They are unchanged. Accountability stays with the firm and the partner. Confirm your specific duties with your professional body and counsel before AI touches regulated work.",
  },
  {
    q: "Where should a firm start?",
    a: "Internally and low-risk: drafting, research, and knowledge, under a clear use policy. Prove value and build trust before anything client-facing.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://magicworksitsolutions.com/insights/reports/ai-for-professional-services",
      name: "AI for Professional Services Firms",
      description:
        "A partner's guide to confidentiality, process, and ROI. Where AI creates value in a firm, and how to adopt it safely.",
      isPartOf: {
        "@type": "WebSite",
        name: "MagicWorks IT Solutions",
        url: "https://magicworksitsolutions.com",
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com/" },
        { "@type": "ListItem", position: 2, name: "Insights", item: "https://magicworksitsolutions.com/insights" },
        { "@type": "ListItem", position: 3, name: "Reports", item: "https://magicworksitsolutions.com/insights/reports" },
        {
          "@type": "ListItem",
          position: 4,
          name: "AI for Professional Services Firms",
          item: "https://magicworksitsolutions.com/insights/reports/ai-for-professional-services",
        },
      ],
    },
    {
      "@type": "Report",
      name: "AI for Professional Services Firms",
      headline: "A partner's guide to confidentiality, process, and ROI",
      about: ["AI in professional services", "Client confidentiality", "Legal technology", "Accounting technology", "AI governance"],
      audience: {
        "@type": "Audience",
        audienceType: "Partners and leaders at accounting, law, consulting, and advisory firms in India",
      },
      numberOfPages: 7,
      inLanguage: "en-IN",
      isAccessibleForFree: true,
      author: { "@type": "Organization", name: "MagicWorks IT Solutions Pvt. Ltd." },
      publisher: {
        "@type": "Organization",
        name: "MagicWorks IT Solutions Pvt. Ltd.",
        url: "https://magicworksitsolutions.com",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function AiForProfessionalServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero + Gate ────────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg
          className="absolute right-[-220px] bottom-[-260px] w-[640px] h-[640px] pointer-events-none"
          viewBox="0 0 640 640"
          aria-hidden="true"
        >
          <circle cx="320" cy="320" r="310" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
          <circle cx="320" cy="320" r="225" fill="none" stroke="#D4A537" strokeWidth="1.5" opacity="0.7" />
          <circle cx="320" cy="320" r="140" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#C8B8FF] mb-6">
            <Link href="/" className="hover:text-[#D4A537] transition-colors no-underline text-[#C8B8FF]">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/insights" className="hover:text-[#D4A537] transition-colors no-underline text-[#C8B8FF]">Insights</Link>
            <span className="opacity-50">/</span>
            <Link href="/insights/reports" className="hover:text-[#D4A537] transition-colors no-underline text-[#C8B8FF]">Reports</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">AI for Professional Services Firms</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
            {/* Left col */}
            <div>
              <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#D4A537] mb-4">
                Free Playbook · 2026
              </span>
              <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4.2vw,44px)] leading-[1.12] text-[#F7F3EA] my-4">
                AI for Professional Services Firms
              </h1>
              <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mb-8">
                A partner&apos;s guide to confidentiality, process, and ROI. Where AI creates value
                in a firm, how to handle the risk, and a staged, safe path to adoption.
                Vendor-neutral.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["7 pages", "10 min read", "Partners & firm leaders"].map((c) => (
                  <span
                    key={c}
                    className="text-[12px] font-semibold text-[#F7F3EA] bg-white/[0.08] border border-white/[0.16] rounded-full px-3.5 py-[7px]"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <ul className="list-none space-y-1">
                {[
                  "Where AI creates real value in a firm, in order of safety",
                  "The confidentiality and risk framework partners need",
                  "A staged adoption path and a 90-day plan",
                ].map((b) => (
                  <li key={b} className="relative pl-6 py-1.5 text-[15px] text-[#F7F3EA]">
                    <span className="absolute left-0 top-[13px] w-2 h-2 rounded-full bg-[#D4A537]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gate form card */}
            <div id="get">
              <div className="bg-white rounded-[14px] border-t-[4px] border-t-[#D4A537] shadow-[0_24px_60px_rgba(0,0,0,0.28)] p-12">
                <GateForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's Inside ─────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#5B3FBE] mb-3">
              What is inside
            </span>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#2A1B5C] mt-3">
              Risk first, then value.
            </h2>
            <p className="text-[18px] leading-[1.55] text-[#3F3F4A] mt-3">
              A value map, a confidentiality and risk framework, a staged adoption path, a 90-day
              plan, and a one-page checklist.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div
                key={p.num}
                className={`bg-white border border-[#D8D8DE] border-t-[3px] ${
                  p.gold ? "border-t-[#D4A537]" : "border-t-[#5B3FBE]"
                } rounded-[10px] p-8`}
              >
                <div className="font-[family-name:var(--font-head)] font-bold text-[13px] text-[#D4A537]">
                  {p.num}
                </div>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mt-1.5 mb-2">
                  {p.title}
                </h3>
                <p className="text-[14px] text-[#3F3F4A]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ─────────────────────────────────────────────── */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#5B3FBE] mb-3">
              What you will learn
            </span>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#2A1B5C] mt-3">
              Adopt AI without risking client trust.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-1">
            {LEARNINGS.map((l) => (
              <div key={l} className="relative pl-8 py-2 text-[15.5px] text-[#1A1A22]">
                <span className="absolute left-0 top-[14px] w-[9px] h-[9px] rounded-full border-2 border-[#5B3FBE]" />
                {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="relative">
            <svg
              className="absolute left-[-200px] top-[-160px] w-[520px] h-[520px] pointer-events-none"
              viewBox="0 0 520 520"
              aria-hidden="true"
            >
              <circle cx="260" cy="260" r="250" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
              <circle cx="260" cy="260" r="180" fill="none" stroke="#D4A537" strokeWidth="1.5" opacity="0.7" />
              <circle cx="260" cy="260" r="110" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
            </svg>
            <div className="relative grid md:grid-cols-[auto_1fr] gap-12 items-center">
              <div>
                <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,44px)] text-[#D4A537] leading-tight">
                  Independent
                </div>
                <div className="text-[14px] font-semibold text-[#C8B8FF] tracking-[0.03em] mt-2 max-w-[250px]">
                  vendor-neutral advice, with confidentiality first
                </div>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[26px] text-[#F7F3EA] mb-3">
                  We will never put client trust at risk.
                </h2>
                <p className="text-[#C8B8FF] max-w-[560px] leading-[1.6]">
                  Our AI Consultation is consultation only and vendor-neutral. We partner with you
                  and your specialists, advise and design, and you choose who builds or supplies.
                  With nothing to sell you, the counsel is independent, and confidentiality always
                  comes first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who It's For ──────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="bg-white border border-[#D8D8DE] border-l-[4px] border-l-[#D4A537] rounded-[10px] p-12">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[24px] text-[#2A1B5C] mb-3">
              Who it is for
            </h2>
            <p className="text-[18px] leading-[1.55] text-[#3F3F4A] max-w-[720px]">
              Partners and leaders at professional services firms in India — accounting and CA
              firms, law firms, consulting and advisory firms — weighing where AI fits without
              putting client trust or reputation at risk. If your name is on the work, this is
              written for you.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-10">
            <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#5B3FBE] mb-3">
              Questions
            </span>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#2A1B5C] mt-3">
              Before you download
            </h2>
          </div>
          <div>
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group border-t border-[#D8D8DE] last:border-b">
                <summary className="flex justify-between items-center gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C]">
                  {q}
                  <span className="flex-none w-5 h-5 relative">
                    <span className="absolute top-[9px] left-0 w-5 h-[2px] bg-[#D4A537]" />
                    <span className="absolute top-0 left-[9px] w-[2px] h-5 bg-[#D4A537] transition-transform duration-200 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="text-[15.5px] text-[#3F3F4A] pb-6 leading-[1.6]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-[#EDE9F7] py-24 text-center">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#2A1B5C] max-w-[600px] mx-auto">
            Put AI to work safely in your firm.
          </h2>
          <div className="w-16 h-[3px] bg-[#D4A537] mx-auto my-6" />
          <p className="text-[#3F3F4A] max-w-[520px] mx-auto mb-8">
            Download the guide and start with the risk question, then the value.
          </p>
          <a
            href="#get"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[15px] rounded-full hover:scale-[1.02] transition-transform no-underline"
          >
            Get the guide
          </a>
        </div>
      </section>
    </>
  );
}
