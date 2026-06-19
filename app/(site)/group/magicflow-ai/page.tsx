import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MagicFlow AI · MagicWorks Group",
  description:
    "MagicFlow AI is an AI product from the MagicWorks Group, a SaaS chatbot and automation platform for businesses. Part of the MagicWorks family.",
  alternates: { canonical: "/group/magicflow-ai" },
};

export default function MagicFlowAIPage() {
  return (
    <>
      {/* Hero */}
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
            MagicFlow AI
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-4 mb-10">
            An AI chatbot and automation platform for businesses. Built by the MagicWorks Group. If you need AI built or deployed, not just advised on, MagicFlow AI is where you go.
          </p>
          <a href="https://magicflowai.io" target="_blank" rel="noopener noreferrer"
            className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Visit MagicFlow AI →
          </a>
        </div>
      </section>

      {/* About */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-4">What MagicFlow AI does.</h2>
            <p className="text-[16px] text-[#3F3F4A] mb-4">MagicFlow AI provides AI-powered chatbots, lead capture agents, and process automation for businesses that need AI built and running, not just advised on.</p>
            <p className="text-[16px] text-[#3F3F4A] mb-4">MagicWorks IT Solutions uses MagicFlow AI on its own website; the chatbot you see on this site is a MagicFlow AI product.</p>
            <p className="text-[16px] text-[#3F3F4A]">MagicFlow AI and MagicWorks IT Solutions are separate entities under the MagicWorks Group. Contracts and pricing belong to each entity independently.</p>
          </div>
          <div className="space-y-4">
            {[
              { t: "AI Chatbots", b: "Conversational agents for lead capture, support, and qualification, embedded on any website." },
              { t: "Process Automation", b: "Automate repetitive business workflows using LLMs and integration connectors." },
              { t: "SaaS Platform", b: "A managed platform: no code required. Set up in hours, not weeks." },
            ].map(f => (
              <div key={f.t} className="bg-white border border-[#D8D8DE] border-l-4 border-l-[#D4A537] rounded-[10px] p-5">
                <h3 className="font-semibold text-[15px] text-[#2A1B5C] mb-1">{f.t}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{f.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boundary */}
      <section className="bg-[#EDE9F7] py-16">
        <div className="max-w-[1120px] mx-auto px-8 max-w-[720px]">
          <p className="text-[14px] text-[#3F3F4A]">
            <strong className="text-[#2A1B5C]">Note on the boundary:</strong> MagicWorks IT Solutions (this site) provides AI Consultation: strategy, audits, and roadmaps. MagicFlow AI provides AI products and implementation. If you want AI built, MagicFlow AI is the right place. If you want independent advice on what to build and how, MagicWorks IT Solutions is the right place.
          </p>
        </div>
      </section>

      {/* Group nav */}
      <section className="bg-[#2A1B5C] py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="text-[13px] uppercase tracking-[0.14em] text-[#9A8FBF] mb-6">Also in the MagicWorks Group</p>
          <div className="flex gap-4 flex-wrap">
            {[{ label: "Magic Pipeline", href: "/group/magic-pipeline" }, { label: "MagicWorks Host", href: "/group/magicworks-host" }].map(g => (
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
