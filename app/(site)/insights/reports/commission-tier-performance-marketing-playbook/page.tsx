import type { Metadata } from "next";
import Link from "next/link";
import GateForm from "./_GateForm";

export const metadata: Metadata = {
  title: "Commission-Tier Performance Marketing Playbook | Free Guide",
  description:
    "How to run Google Ads and Meta Ads at ₹5 lakh or more per month with the agency accountable to actual outcomes, not hours billed. A 22-page operator playbook from MagicWorks. Free download.",
  alternates: {
    canonical: "/insights/reports/commission-tier-performance-marketing-playbook",
  },
  openGraph: {
    title: "The Commission-Tier Performance Marketing Playbook",
    description:
      "How to run Google Ads and Meta Ads at ₹5 lakh or more per month with the agency accountable to actual outcomes, not hours billed.",
    type: "website",
  },
};

const CHAPTERS = [
  {
    num: "Chapter 1",
    title: "Why commission-tier changes everything about the agency-client relationship",
    body: "The retainer model was built for a different era of performance marketing. Commission-tier reshapes the relationship around shared outcomes and eliminates the argument about creative velocity.",
  },
  {
    num: "Chapter 2",
    title: "The ₹5 lakh minimum: why the threshold matters",
    body: "Below ₹5 lakh per month in paid media, the commission structure does not produce enough absolute rupees to fund dedicated attention on either side. The threshold is a filter, not a barrier.",
  },
  {
    num: "Chapter 3",
    title: "The commission-tier account audit: six diagnostic questions",
    body: "Is performance measurable? Is the baseline defensible? Is the market opportunity large enough? Is the CFO aligned? Is the client team operationally ready? Is there data transparency?",
  },
  {
    num: "Chapter 4",
    title: "The anchor case study: ₹19.8M ad spend, 50,000+ leads at ₹396 CPL",
    body: "A 16-month commission-tier engagement for an Indian distance-education platform. The three strategic shifts that moved the account. Month-by-month trajectory, and what is transferable to other categories.",
  },
  {
    num: "Chapter 5",
    title: "Google Ads and Meta Ads together: why the combination matters",
    body: "Google Ads captures existing demand. Meta Ads creates future demand. Running them under a single commission-tier engagement produces materially better outcomes than running them separately.",
  },
  {
    num: "Chapter 6",
    title: "The 90-day commission-tier onboarding plan",
    body: "Days 1-30: audit, baseline, and infrastructure. Days 31-60: creative velocity and account restructuring. Days 61-90: stabilisation and rhythm, the disciplined foundation that sustains months 4-12.",
  },
];

const LEARNINGS = [
  {
    title: "The economics of commission-tier",
    body: "Base fee floor, commission rate on incremental revenue, cap structure, and why each parameter exists. How to model the monthly agency payout for your specific account size before you sign.",
  },
  {
    title: "The diagnostic filter",
    body: "Six honest questions that determine whether commission-tier fits your business. Businesses that answer them clearly produce successful engagements. Businesses that skip them produce disputes.",
  },
  {
    title: "The measurable playbook",
    body: "How baseline is calculated, how attribution methodology gets defined and stays defined, how the commission calculation actually works each month, and how both parties keep the numbers honest.",
  },
  {
    title: "The 90-day onboarding discipline",
    body: "The specific 3-phase plan that establishes audit, drives creative velocity, and stabilises performance. Rushing this phase is the single most reliable way to produce a failed engagement.",
  },
];

const WHO_FOR = [
  {
    title: "Marketing heads and CMOs",
    body: "At businesses spending ₹5 lakh or more per month on paid media, evaluating whether the current agency arrangement is producing outcomes proportionate to the fee being paid.",
  },
  {
    title: "Founders and CEOs",
    body: "Of ₹5 to ₹100 crore businesses, who want a shared language for holding their marketing agency to genuine performance accountability rather than hours billed.",
  },
  {
    title: "CFOs and finance leaders",
    body: "Evaluating how commission-tier structures actually affect the paid media P&L, cash flow, and vendor payment discipline compared to fixed-retainer alternatives.",
  },
];

const FAQ = [
  {
    q: "What is commission-tier performance marketing?",
    a: "A hybrid pricing structure where the agency earns a fixed base fee every month, plus a commission on incremental attributable revenue above a defined baseline. The base fee covers the ongoing cost of running the account professionally. The commission rewards outcomes that exceed baseline, and both parties see the same numbers.",
  },
  {
    q: "Why is the minimum ad spend ₹5 lakh per month?",
    a: "Below ₹5 lakh per month in combined Google Ads and Meta Ads spend, the absolute rupees of commission do not scale with the effort required to run the account professionally. The threshold protects both sides from a bad-fit engagement. Below it, a well-structured retainer with clear performance dashboards is genuinely the honest choice.",
  },
  {
    q: "Is this Playbook a sales pitch for MagicWorks?",
    a: "No. The Playbook is operator guidance. The frameworks and diagnostic questions are transferable to any commission-tier agency engagement, regardless of who is offering it. If, after reading, you conclude commission-tier fits your business, we welcome a conversation. If not, we hope the frameworks are useful in shaping your ongoing agency relationships.",
  },
  {
    q: "Does this cover Google Ads only or Meta Ads as well?",
    a: "Both, together. Chapter 5 specifically addresses why Google Ads and Meta Ads must be run under a single commission-tier engagement rather than as separate workstreams, and why running them together eliminates the incentive-misalignment that makes single-platform optimisation counterproductive.",
  },
  {
    q: "How long is the Playbook and how long does it take to read?",
    a: "22 pages, roughly 9,500 words of substantive operator content. The full read is about 45 minutes. The Playbook includes three reading modes: a 10-minute path (executive summary plus Chapter 3), a 30-minute path (executive summary plus Chapters 1 to 3), and the full 45-minute path.",
  },
  {
    q: "Will I be added to a mailing list or contacted by sales?",
    a: "You will be added to MagicWorks occasional updates, typically one email per fortnight covering new research, playbooks, and observations from our operator work. You will not be contacted by sales unless you specifically request a conversation. Unsubscribe from the updates at any time.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://magicworksitsolutions.com/insights/reports/commission-tier-performance-marketing-playbook",
      name: "The Commission-Tier Performance Marketing Playbook",
      description:
        "How to run Google Ads and Meta Ads at ₹5 lakh or more per month with the agency accountable to actual outcomes, not hours billed. A free playbook from MagicWorks.",
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
          name: "Commission-Tier Performance Marketing Playbook",
          item: "https://magicworksitsolutions.com/insights/reports/commission-tier-performance-marketing-playbook",
        },
      ],
    },
    {
      "@type": "Report",
      name: "The Commission-Tier Performance Marketing Playbook",
      headline:
        "How to run Google Ads and Meta Ads at ₹5 lakh or more per month with the agency accountable to actual outcomes",
      about: ["Performance Marketing", "Commission-Tier Pricing", "Google Ads", "Meta Ads", "Digital Marketing Strategy"],
      audience: {
        "@type": "Audience",
        audienceType: "Marketing heads, CMOs, founders, and CFOs at Indian businesses spending ₹5 lakh or more per month on paid media",
      },
      inLanguage: "en-IN",
      isAccessibleForFree: true,
      author: { "@type": "Person", name: "Swapnil Ughade", jobTitle: "Founder and Managing Director" },
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

export default function CommissionTierPlaybookPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
          <nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#C8B8FF] mb-6">
            <Link href="/" className="hover:text-[#D4A537] transition-colors no-underline text-[#C8B8FF]">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/insights" className="hover:text-[#D4A537] transition-colors no-underline text-[#C8B8FF]">Insights</Link>
            <span className="opacity-50">/</span>
            <Link href="/insights/reports" className="hover:text-[#D4A537] transition-colors no-underline text-[#C8B8FF]">Reports</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Commission-Tier Performance Marketing Playbook</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
            <div>
              <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#D4A537] mb-4">
                Free Playbook · FY 2026-27
              </span>
              <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,44px)] leading-[1.12] text-[#F7F3EA] my-4">
                The Commission-Tier Performance Marketing Playbook
              </h1>
              <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[540px] mb-8">
                How to run Google Ads and Meta Ads at ₹5 lakh or more per month, with the agency
                accountable to actual outcomes rather than hours billed. Written for marketing
                heads, founders, and CFOs evaluating whether their current agency arrangement
                makes honest sense.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["22 pages", "45-minute read", "FY 2026-27 edition"].map((c) => (
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
                  "The six diagnostic questions you must answer honestly before signing any commission-tier agreement",
                  "The anchor case study: ₹19.8M managed ad spend, 50,000+ qualified leads at ₹396 CPL over 16 months",
                  "The 90-day commission-tier onboarding plan, and how attribution, baseline, and creative velocity actually work",
                ].map((b) => (
                  <li key={b} className="relative pl-6 py-1.5 text-[15px] text-[#F7F3EA]">
                    <span className="absolute left-0 top-[13px] w-2 h-2 rounded-full bg-[#D4A537]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

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
          <div className="max-w-[720px] mb-12">
            <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#5B3FBE] mb-3">
              What is inside
            </span>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#2A1B5C] mt-3">
              Six chapters. One honest framework.
            </h2>
            <p className="text-[18px] leading-[1.55] text-[#3F3F4A] mt-3">
              Each chapter builds on the previous one. The executive summary and Chapter 3 alone
              give you the essential filter to decide whether commission-tier fits your business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {CHAPTERS.map((c) => (
              <div
                key={c.num}
                className="bg-white border border-[#D8D8DE] border-l-[3px] border-l-[#D4A537] rounded-[10px] p-8 hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(42,27,92,0.08)] transition-all"
              >
                <div className="font-bold text-[11px] uppercase tracking-[0.15em] text-[#D4A537] mb-2">
                  {c.num}
                </div>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mb-2 leading-[1.35]">
                  {c.title}
                </h3>
                <p className="text-[14px] text-[#3F3F4A] leading-[1.55]">{c.body}</p>
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
              Operator clarity, not agency marketing.
            </h2>
            <p className="text-[18px] leading-[1.55] text-[#3F3F4A] mt-3">
              Written for readers who want the honest structural view of commission-tier
              engagements, not tactical Google Ads or Meta Ads tips.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {LEARNINGS.map((l) => (
              <div key={l.title} className="border-t-2 border-[#D4A537] pt-5">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-2">
                  {l.title}
                </h3>
                <p className="text-[14.5px] text-[#3F3F4A] leading-[1.6]">{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ──────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="text-center mb-12">
            <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#D4A537] mb-3">
              Who this is for
            </span>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#F7F3EA] mt-3">
              Three specific readers.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {WHO_FOR.map((w) => (
              <div key={w.title} className="border-l-2 border-[#D4A537] pl-6">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#D4A537] mb-2">
                  {w.title}
                </h3>
                <p className="text-[14px] text-[#C8B8FF] leading-[1.55]">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[720px] mb-10">
            <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#5B3FBE] mb-3">
              The anchor case study
            </span>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#2A1B5C] mt-3">
              ₹19.8M ad spend, 16 months, 50,000+ qualified leads.
            </h2>
          </div>
          <div className="bg-white border border-[#D8D8DE] rounded-[12px] p-12 max-w-[860px] mx-auto shadow-[0_4px_16px_rgba(42,27,92,0.06)]">
            <p className="font-[family-name:var(--font-head)] italic text-[19px] text-[#2A1B5C] leading-[1.5] border-l-[3px] border-[#D4A537] pl-6 mb-8">
              The engagement produced 50,000+ qualified leads at an average cost per lead of ₹396,
              on total managed ad spend of ₹19.8 million over 16 months. Both parties considered
              the engagement successful, and both acknowledged in the final review that
              commission-tier was the right structure for the account.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#D8D8DE]">
              {[
                { v: "₹19.8M", l: "Total managed ad spend across Google Ads and Meta Ads" },
                { v: "₹396", l: "Average cost per qualified lead across the engagement" },
                { v: "50,000+", l: "Qualified leads generated over 16 months" },
              ].map((m) => (
                <div key={m.v}>
                  <div className="font-[family-name:var(--font-head)] font-bold text-[26px] text-[#D4A537] leading-none mb-1.5">
                    {m.v}
                  </div>
                  <div className="text-[12.5px] text-[#3F3F4A] leading-[1.4]">{m.l}</div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-[#9A9AA8] italic mt-6">
              Client name anonymised at implicit preference. Category and numbers stated exactly
              as they occurred.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="pb-24 pt-4">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[720px] mb-10">
            <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#5B3FBE] mb-3">
              Frequently asked
            </span>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#2A1B5C] mt-3">
              Questions we hear before people download.
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
            Ready to read the full Playbook?
          </h2>
          <div className="w-16 h-[3px] bg-[#D4A537] mx-auto my-6" />
          <p className="text-[#3F3F4A] max-w-[600px] mx-auto mb-8">
            Free download. 22 pages. No sales call unless you request one. Apply the six
            diagnostic questions to your own business, and make an honest decision about
            commission-tier for your paid media engagement.
          </p>
          <a
            href="#get"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[15px] rounded-full hover:scale-[1.02] transition-transform no-underline"
          >
            Get the Playbook
          </a>
        </div>
      </section>
    </>
  );
}
