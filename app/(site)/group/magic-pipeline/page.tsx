import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Magic Pipeline — CRM & Revenue Ops",
  description:
    "Magic Pipeline is a SaaS AI CRM and sales pipeline product from the MagicWorks Group. Part of the MagicWorks family.",
  alternates: { canonical: "/group/magic-pipeline" },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Magic Pipeline",
  applicationCategory: "BusinessApplication",
  description: "AI-native CRM and sales pipeline management platform for growing teams. Lead scoring, follow-up automation, and deal insights.",
  url: "https://magicpipeline.io",
  offers: { "@type": "Offer", category: "SaaS" },
  creator: { "@id": "https://magicworksitsolutions.com/#organization" },
};

export default function MagicPipelinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-100px] top-[-80px] w-[480px] h-[480px] pointer-events-none opacity-50" aria-hidden="true">
          {[80, 140, 200].map((r, i) => (
            <circle key={r} cx="240" cy="240" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <Link href="/group" className="text-[#D4A537] text-[13px] uppercase tracking-[0.12em] font-bold no-underline hover:underline mb-6 inline-block">
            ← MagicWorks Group
          </Link>
          <p className="eyebrow text-[#D4A537] mb-4">MagicWorks Group · SaaS AI Product</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[780px]">
            Magic Pipeline
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-4 mb-10">
            An AI-powered CRM and sales pipeline tool for ambitious businesses. Built by the MagicWorks Group to bring AI-native sales intelligence to growing teams.
          </p>
          <a href="https://magicpipeline.io" target="_blank" rel="noopener noreferrer nofollow"
            className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Visit Magic Pipeline →
          </a>
        </div>
      </section>

      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-4">What Magic Pipeline does.</h2>
            <p className="text-[16px] text-[#3F3F4A] mb-4">Magic Pipeline is an AI-native CRM and pipeline management platform. It helps sales teams track leads, automate follow-ups, and surface the right actions at the right time, without the complexity of enterprise CRM.</p>
            <p className="text-[16px] text-[#3F3F4A]">Magic Pipeline and MagicWorks IT Solutions are separate entities under the MagicWorks Group. Contracts and pricing belong to each entity independently.</p>
          </div>
          <div className="space-y-4">
            {[
              { t: "AI-Native CRM", b: "Pipeline management with AI-assisted lead scoring, follow-up recommendations, and deal insights." },
              { t: "Sales Automation", b: "Automate repetitive outreach, reminders, and status updates so your team focuses on conversations." },
              { t: "Simple Pricing", b: "Built for growing teams, not enterprise. No seat minimums, no implementation fees." },
            ].map(f => (
              <div key={f.t} className="bg-white border border-[#D8D8DE] border-l-4 border-l-[#5B3FBE] rounded-[10px] p-5">
                <h3 className="font-semibold text-[15px] text-[#2A1B5C] mb-1">{f.t}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{f.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2A1B5C] py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="text-[13px] uppercase tracking-[0.14em] text-[#9A8FBF] mb-6">Also in the MagicWorks Group</p>
          <div className="flex gap-4 flex-wrap">
            {[{ label: "MagicFlow AI", href: "/group/magicflow-ai" }, { label: "MagicWorks Host", href: "/group/magicworks-host" }].map(g => (
              <Link key={g.href} href={g.href} className="border border-white/30 text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-6 py-3 rounded-full no-underline hover:bg-white/10 transition-colors">
                {g.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
