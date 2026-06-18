import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MagicWorks Host · MagicWorks Group",
  description:
    "Domain registration, web hosting, and SSL certificates from MagicWorks Host, part of the MagicWorks Group. All new hosting and domain enquiries handled here.",
  alternates: { canonical: "/group/magicworks-host" },
};

export default function MagicWorksHostPage() {
  return (
    <>
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-100px] top-[-80px] w-[480px] h-[480px] pointer-events-none opacity-50" aria-hidden="true">
          {[80, 140, 200].map((r, i) => (
            <circle key={r} cx="240" cy="240" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <Link href="/group" className="text-[#D4A537] text-[13px] uppercase tracking-[0.12em] font-bold no-underline hover:underline mb-6 inline-block">
            ? MagicWorks Group
          </Link>
          <p className="eyebrow text-[#D4A537] mb-4">MagicWorks Group · Hosting & Domains</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[780px]">
            MagicWorks Host
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-4 mb-10">
            Domains, web hosting, and SSL certificates for Indian businesses. All new hosting and domain registration enquiries from MagicWorks IT Solutions clients are routed here.
          </p>
          <a href="https://magicworkshost.com" target="_blank" rel="noopener noreferrer"
            className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Visit MagicWorks Host ?
          </a>
        </div>
      </section>

      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-4">What MagicWorks Host does.</h2>
            <p className="text-[16px] text-[#3F3F4A] mb-4">MagicWorks Host handles domain registration, managed web hosting, and SSL certificates for businesses across India. It is the right place for new hosting and domain needs that come through the MagicWorks relationship.</p>
            <p className="text-[16px] text-[#3F3F4A]">MagicWorks Host and MagicWorks IT Solutions are separate entities. Contracts and billing belong to MagicWorks Host independently.</p>
          </div>
          <div className="space-y-4">
            {[
              { t: "Domain Registration", b: ".com, .in, .co.in and all major TLDs. Transfer support included." },
              { t: "Web Hosting", b: "Managed hosting for WordPress and static sites. Daily backups, uptime monitoring." },
              { t: "SSL Certificates", b: "Free and premium SSL for all hosted domains. Auto-renewal managed." },
            ].map(f => (
              <div key={f.t} className="bg-white border border-[#D8D8DE] border-l-4 border-l-[#D4A537] rounded-[10px] p-5">
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
            {[{ label: "MagicFlow AI", href: "/group/magicflow-ai" }, { label: "Magic Pipeline", href: "/group/magic-pipeline" }].map(g => (
              <Link key={g.href} href={g.href} className="border border-white/30 text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-6 py-3 rounded-full no-underline hover:bg-white/10 transition-colors">
                {g.label} ?
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
