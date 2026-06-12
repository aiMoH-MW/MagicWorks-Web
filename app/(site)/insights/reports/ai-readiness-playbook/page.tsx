import type { Metadata } from "next";
import Link from "next/link";
import GateForm from "./_GateForm";

export const metadata: Metadata = {
  title: "AI Readiness Playbook (Free) · A Founder's Guide to AI Without the Hype · MagicWorks",
  description:
    "Free playbook for Indian founders: assess your AI readiness, find where AI pays off first, decide build vs buy, and get a real result in 90 days. Vendor-neutral. Download with your email.",
  alternates: {
    canonical: "/insights/reports/ai-readiness-playbook",
  },
  openGraph: {
    title: "The AI Readiness Playbook · MagicWorks",
    description:
      "A founder's guide to putting AI to work without the hype. Vendor-neutral, for Indian businesses.",
    type: "website",
  },
};

const PILLARS = [
  {
    num: "01",
    title: "Readiness over adoption",
    body: "Why most AI projects fail for reasons that have nothing to do with the technology.",
  },
  {
    num: "02",
    title: "The five-dimension assessment",
    body: "Strategy, processes, data, people, and governance. Find your weakest link first.",
  },
  {
    num: "03",
    title: "Where AI pays off first",
    body: "The boring, valuable, low-risk wins, and the use cases to leave for later.",
  },
  {
    num: "04",
    title: "Build versus buy",
    body: "A simple, honest framework so you do not overspend on bespoke AI.",
  },
  {
    num: "05",
    title: "A 90-day plan",
    body: "Assess, pilot small, measure, and decide, with a number you agree up front.",
  },
  {
    num: "+",
    title: "Myths and the checklist",
    body: "The myths that sink AI projects, plus a one-page readiness checklist to keep.",
    gold: true,
  },
];

const LEARNINGS = [
  "Why readiness beats adoption",
  "How to assess your business across five dimensions",
  "Where AI pays off first, and where to wait",
  "How to decide build versus buy",
  "How to run a contained 90-day pilot",
  "How to keep a human in the loop and stay DPDP-compliant",
  "The myths that sink AI projects",
  "How to brief independent, vendor-neutral help",
];

const FAQ = [
  {
    q: "What is the AI Readiness Playbook?",
    a: "A vendor-neutral guide for founders and operations leaders: how to assess your AI readiness across five dimensions, where AI pays off first, how to decide build versus buy, and a 90 day plan to get a real result. It includes a one-page readiness checklist.",
  },
  {
    q: "Is it really free?",
    a: "Yes. We email you the PDF in exchange for your details, and occasionally share relevant insights. You can unsubscribe anytime.",
  },
  {
    q: "Do I need a big budget or a data team to start?",
    a: "No. Most early wins use proven tools on a well-chosen, contained use case. You need a clear problem and a willingness to measure more than a large budget.",
  },
  {
    q: "Should we build our own AI or buy tools?",
    a: "For most needs, buy or configure a proven tool. Build only where AI is core to your advantage and nothing off the shelf will do. The playbook gives you a simple framework to decide.",
  },
  {
    q: "Will MagicWorks contact me?",
    a: "We will email you the playbook and occasionally share relevant insights. No spam, and you can unsubscribe at any time.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://magicworksitsolutions.com/insights/reports/ai-readiness-playbook",
      name: "The AI Readiness Playbook",
      description:
        "A founder's guide to putting AI to work without the hype. Assess readiness, find where AI pays off first, and get a real result in 90 days.",
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
          name: "AI Readiness Playbook",
          item: "https://magicworksitsolutions.com/insights/reports/ai-readiness-playbook",
        },
      ],
    },
    {
      "@type": "Report",
      name: "The AI Readiness Playbook",
      headline: "A founder's guide to putting AI to work, without the hype",
      about: ["Artificial intelligence", "AI strategy", "AI readiness", "Build vs buy", "Digital transformation"],
      audience: {
        "@type": "Audience",
        audienceType: "Founders, CEOs, and operations leaders at Indian businesses",
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

export default function AIReadinessPlaybookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero + Gate ────────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-24 relative overflow-hidden">
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
            <span className="text-[#F7F3EA]">AI Readiness Playbook</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
            {/* Left col */}
            <div>
              <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#D4A537] mb-4">
                Free Playbook · 2026
              </span>
              <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(30px,4.4vw,46px)] leading-[1.12] text-[#F7F3EA] my-4">
                The AI Readiness Playbook
              </h1>
              <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mb-8">
                A founder&apos;s guide to putting AI to work without the hype. Assess your
                readiness, find where AI pays off first, and get a real result in 90 days.
                Vendor-neutral, from an AI-first agency.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["7 pages", "10 min read", "Founders & operations leaders"].map((c) => (
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
                  "A five-dimension readiness assessment you can run today",
                  "An honest build-versus-buy framework",
                  "A 90-day plan to a real, measurable result",
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
              A way to decide, not a sales pitch.
            </h2>
            <p className="text-[18px] leading-[1.55] text-[#3F3F4A] mt-3">
              A readiness assessment, an honest build-versus-buy framework, a 90-day plan, and a
              one-page checklist.
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
                <div className="font-[family-name:var(--font-head)] font-bold text-[14px] text-[#D4A537]">
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
              Make good AI decisions, and avoid expensive ones.
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
                <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(36px,5.4vw,58px)] text-[#D4A537] leading-tight">
                  Independent
                </div>
                <div className="text-[14px] font-semibold text-[#C8B8FF] tracking-[0.04em] mt-2 max-w-[250px]">
                  vendor-neutral advice. we have no tool to sell you.
                </div>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[26px] text-[#F7F3EA] mb-3">
                  That is the whole point.
                </h2>
                <p className="text-[#C8B8FF] max-w-[560px] leading-[1.6]">
                  Our AI Consultation is consultation only and vendor-neutral. We advise and design;
                  you choose who builds. With nothing to sell you, the advice in this playbook, and
                  from our team, is the kind worth having.
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
              Founders, CEOs, and operations leaders at Indian businesses who keep hearing they must
              &ldquo;do something with AI&rdquo; and want a clear, honest way to decide what is
              actually worth doing. If that is on your desk, this is written for you.
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
            Put AI to work, without the hype.
          </h2>
          <div className="w-16 h-[3px] bg-[#D4A537] mx-auto my-6" />
          <p className="text-[#3F3F4A] max-w-[520px] mx-auto mb-8">
            Download the playbook and start with readiness, not the tool.
          </p>
          <a
            href="#get"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[15px] rounded-full hover:scale-[1.02] transition-transform no-underline"
          >
            Get the playbook
          </a>
        </div>
      </section>
    </>
  );
}
