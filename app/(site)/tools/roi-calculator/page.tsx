"use client";

import { useState } from "react";
import Link from "next/link";

type Sector = "education" | "realestate" | "manufacturing" | "ecommerce" | "professional" | "other";

const sectors: { value: Sector; label: string }[] = [
  { value: "education", label: "Education (admissions / courses)" },
  { value: "realestate", label: "Real Estate (residential / commercial)" },
  { value: "manufacturing", label: "Manufacturing (B2B)" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "professional", label: "Professional Services" },
  { value: "other", label: "Other / General" },
];

const benchmarks: Record<Sector, { leadRate: [number, number]; closeRate: [number, number]; label: string; note: string }> = {
  education: {
    leadRate: [0.04, 0.10],
    closeRate: [0.10, 0.25],
    label: "Qualified lead rate (ad click to enquiry)",
    note: "Admission-cycle campaigns in education typically convert at 4–10% click-to-enquiry, and 10–25% enquiry to admission.",
  },
  realestate: {
    leadRate: [0.02, 0.06],
    closeRate: [0.03, 0.10],
    label: "Qualified lead rate (ad click to site visit / call)",
    note: "Residential real estate campaigns typically see 2–6% click-to-lead, and 3–10% of those converting to a site visit or booking.",
  },
  manufacturing: {
    leadRate: [0.03, 0.08],
    closeRate: [0.08, 0.20],
    label: "Qualified inbound lead rate",
    note: "B2B manufacturing campaigns typically generate 3–8% qualified lead rates, with 8–20% converting to a qualified conversation.",
  },
  ecommerce: {
    leadRate: [0.015, 0.04],
    closeRate: [0.10, 0.30],
    label: "Visitor-to-purchase conversion rate",
    note: "E-commerce conversion rates typically range from 1.5–4% of ad-driven traffic, depending on product category and checkout quality.",
  },
  professional: {
    leadRate: [0.02, 0.06],
    closeRate: [0.10, 0.25],
    label: "Inbound enquiry rate",
    note: "Professional services campaigns typically generate 2–6% inbound enquiry rates, with 10–25% of those progressing to a meeting.",
  },
  other: {
    leadRate: [0.02, 0.06],
    closeRate: [0.05, 0.15],
    label: "Lead rate (general)",
    note: "General benchmarks. Actual rates vary widely by product type, targeting quality, and landing page conversion.",
  },
};

function fmt(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n.toFixed(0)}`;
}

export default function RoiCalculatorPage() {
  const [budget, setBudget] = useState<string>("50000");
  const [dealValue, setDealValue] = useState<string>("50000");
  const [sector, setSector] = useState<Sector>("education");
  const [calculated, setCalculated] = useState(false);

  const numBudget = Math.max(1000, Number(budget) || 0);
  const numDeal = Math.max(100, Number(dealValue) || 0);
  const b = benchmarks[sector];

  const lowLeads = Math.floor(numBudget * b.leadRate[0] / 300);
  const highLeads = Math.floor(numBudget * b.leadRate[1] / 200);
  const lowRevenue = Math.floor(lowLeads * b.closeRate[0] * numDeal);
  const highRevenue = Math.floor(highLeads * b.closeRate[1] * numDeal);
  const lowROI = lowRevenue / numBudget;
  const highROI = highRevenue / numBudget;

  return (
    <div className="min-h-screen bg-[#F7F3EA]">
      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-20 pb-16 relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[600px] h-[600px] pointer-events-none opacity-50" aria-hidden="true">
          {[100, 180, 260, 340].map((r, i) => (
            <circle key={r} cx="300" cy="300" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[800px] mx-auto px-8 relative text-center">
          <nav className="flex items-center justify-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/services/digital-marketing" className="hover:text-[#F7F3EA] transition-colors no-underline">Digital Marketing</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Ad-Spend ROI Calculator</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Honest tool</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4.5vw,46px)] leading-[1.1] text-[#F7F3EA] mb-4">
            What could your ad spend return?
          </h1>
          <p className="text-[17px] text-[#C8B8FF] max-w-[520px] mx-auto">
            A realistic range based on sector benchmarks, not a false-precise promise. Enter your numbers to see what is possible, and what moves it.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16">
        <div className="max-w-[760px] mx-auto px-8">
          <div className="bg-white border border-[#D8D8DE] rounded-[14px] p-8 mb-6">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-7">Your inputs</h2>
            <div className="space-y-7">
              {/* Monthly budget */}
              <div>
                <label className="block text-[13px] font-semibold text-[#2A1B5C] mb-2">
                  Monthly ad budget (₹)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => { setBudget(e.target.value); setCalculated(false); }}
                  min={1000}
                  step={5000}
                  placeholder="e.g. 50000"
                  className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[15px] text-[#2A1B5C] outline-none focus:border-[#5B3FBE] transition-colors"
                />
                <p className="text-[12px] text-[#9A9AA8] mt-1">Your confirmed monthly ad spend, not including agency fees.</p>
              </div>

              {/* Sector */}
              <div>
                <label className="block text-[13px] font-semibold text-[#2A1B5C] mb-2">Your sector</label>
                <select
                  value={sector}
                  onChange={(e) => { setSector(e.target.value as Sector); setCalculated(false); }}
                  className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[15px] text-[#2A1B5C] outline-none focus:border-[#5B3FBE] transition-colors bg-white"
                >
                  {sectors.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Deal value */}
              <div>
                <label className="block text-[13px] font-semibold text-[#2A1B5C] mb-2">
                  Average deal / order value (₹)
                </label>
                <input
                  type="number"
                  value={dealValue}
                  onChange={(e) => { setDealValue(e.target.value); setCalculated(false); }}
                  min={100}
                  step={1000}
                  placeholder="e.g. 50000"
                  className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[15px] text-[#2A1B5C] outline-none focus:border-[#5B3FBE] transition-colors"
                />
                <p className="text-[12px] text-[#9A9AA8] mt-1">The average value of a customer or order you close from a lead.</p>
              </div>
            </div>

            <button
              onClick={() => setCalculated(true)}
              className="mt-8 w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-[15px] rounded-full hover:scale-[1.01] transition-transform"
            >
              Calculate realistic range →
            </button>
          </div>

          {/* Results */}
          {calculated && (
            <div className="space-y-5">
              {/* Range card */}
              <div className="bg-[#2A1B5C] rounded-[14px] p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-4">Estimated pipeline value per month</p>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-white/10 border border-white/20 rounded-[10px] p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#C8B8FF] mb-1">Conservative</p>
                    <p className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#F7F3EA]">{fmt(lowRevenue)}</p>
                    <p className="text-[12px] text-[#9A9AA8] mt-1">{lowROI.toFixed(1)}x ROAS</p>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-[10px] p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#C8B8FF] mb-1">Optimistic</p>
                    <p className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#D4A537]">{fmt(highRevenue)}</p>
                    <p className="text-[12px] text-[#9A9AA8] mt-1">{highROI.toFixed(1)}x ROAS</p>
                  </div>
                </div>
                <p className="text-[13px] text-[#C8B8FF] leading-[1.65]">
                  Based on {sectors.find((s) => s.value === sector)?.label} benchmarks: {b.note}
                </p>
              </div>

              {/* The levers */}
              <div className="bg-white border border-[#D8D8DE] rounded-[14px] p-7">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] mb-5">The three levers that move this number</h3>
                <div className="space-y-4">
                  {[
                    { lever: "Landing page quality", impact: "The biggest single variable. A slow or confusing page can cut conversion rate in half regardless of campaign quality. See: Site Performance & Conversion.", href: "/services/digital-marketing/site-performance-conversion" },
                    { lever: "Audience and targeting precision", impact: "Wasted budget on the wrong audience lowers the lead rate floor. Proper audience architecture and negative targeting keep CPL inside the benchmark.", href: "/services/digital-marketing/google-ads-search-marketing" },
                    { lever: "Speed and quality of follow-up", impact: "A lead contacted within 5 minutes is 9x more likely to convert than one contacted after an hour. The range widens or narrows based on your team's response process.", href: "/contact" },
                  ].map((l) => (
                    <div key={l.lever} className="flex items-start gap-4">
                      <span className="flex-shrink-0 mt-[3px] w-5 h-5 rounded-full bg-[#EDE9F7] flex items-center justify-center">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#5B3FBE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <div>
                        <p className="font-semibold text-[14px] text-[#2A1B5C]">{l.lever}</p>
                        <p className="text-[13px] text-[#3F3F4A] mt-1">{l.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honest disclaimer */}
              <div className="bg-[#EDE9F7] border border-[#D8D8DE] rounded-[12px] p-5">
                <p className="text-[13px] text-[#3F3F4A] leading-[1.65]">
                  <span className="font-semibold text-[#2A1B5C]">Important: </span>
                  These are indicative ranges based on sector averages. Actual returns depend on targeting, creative quality, landing page conversion, your sales process, and market conditions. We do not guarantee a specific return — anyone who does is not being honest with you. The right next step is a discovery call where we can look at your specific situation.
                </p>
              </div>

              {/* CTA */}
              <div className="bg-[#2A1B5C] rounded-[14px] p-8 text-center">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#F7F3EA] mb-3">Want to understand your specific numbers?</h3>
                <p className="text-[15px] text-[#C8B8FF] mb-6">A discovery call takes thirty minutes. We will look at your market, your current setup, and tell you honestly what is possible.</p>
                <Link href="/contact" className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
                  Book a discovery call
                </Link>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setCalculated(false)}
                  className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] hover:underline"
                >
                  Recalculate
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-[#EDE9F7] py-14">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] mb-6">Related services</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: "Google Ads & Search Marketing", href: "/services/digital-marketing/google-ads-search-marketing", desc: "The intent-capture engine behind most ad spend." },
              { name: "Full-Funnel Programme", href: "/services/digital-marketing/full-funnel-programme", desc: "All channels run as one accountable motion." },
              { name: "Site Performance & Conversion", href: "/services/digital-marketing/site-performance-conversion", desc: "Fix the landing pages your ads send traffic to." },
            ].map((r) => (
              <Link key={r.name} href={r.href} className="block bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-6 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(42,27,92,0.08)] transition-all">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[15px] text-[#2A1B5C] mb-2">{r.name}</h3>
                <p className="text-[13px] text-[#3F3F4A]">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
