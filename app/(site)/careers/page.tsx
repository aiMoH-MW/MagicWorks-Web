import type { Metadata } from "next";
import Link from "next/link";
import OpenRoles from "./OpenRoles";

export const metadata: Metadata = {
  title: "Careers: Join MagicWorks IT Solutions",
  description:
    "Build the future of AI-first marketing with us. We're a small, ambitious team in Pune working on real problems for ambitious Indian businesses.",
  alternates: { canonical: "/careers" },
};

const perks = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Real work from day one",
    body: "No busy-work. You'll be working on live client campaigns, AI workflows, and product features that reach thousands of users.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    title: "Learning budget",
    body: "Courses, certifications, tools: we invest in your growth. AI is moving fast and we'll make sure you move with it.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Small, senior team",
    body: "You'll work directly with the founders and senior leads, with no corporate layers and no waiting for approvals on good ideas.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "AI-first environment",
    body: "Every role here touches AI tooling. You'll work with the latest models, automation stacks, and build things that didn't exist two years ago.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Purpose-driven culture",
    body: "We're building long-term, not chasing exits. Every team member understands why the work matters and has a voice in how we do it.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: "Impact you can see",
    body: "Your work won't disappear into a backlog. You'll see how your ideas improve client outcomes, automate real workflows, and help businesses move faster.",
  },
];


export default function CareersPage() {
  return (
    <>
      {/* -- HERO ----------------------------------------------------- */}
      <section
        className="relative pt-[88px] pb-[72px] text-[#F7F3EA] overflow-hidden"
        style={{ background: "linear-gradient(155deg,#1E1248 0%,#2A1B5C 55%,#1A1040 100%)" }}
      >
        {/* Decorative rings */}
        <svg
          className="absolute pointer-events-none"
          style={{ width: "600px", height: "600px", right: "-180px", top: "-200px", opacity: 0.35 }}
          viewBox="0 0 600 600"
          aria-hidden="true"
        >
          <circle cx="300" cy="300" r="290" fill="none" stroke="#7C63D8" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="210" fill="none" stroke="#D4A537" strokeWidth="1.5" opacity="0.7" />
          <circle cx="300" cy="300" r="130" fill="none" stroke="#7C63D8" strokeWidth="1.5" />
        </svg>

        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="text-[#D4A537] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Careers · Pune, India</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,48px)] leading-[1.12] text-[#F7F3EA] max-w-[780px] mb-6">
            Build what is next. Join MagicWorks.
          </h1>
          <p className="text-[18px] text-[#C8B8FF] max-w-[560px] leading-[1.65] mb-10">
            We are an AI-first digital marketing agency with 17+ years of experience, 30+ experts, and a 98% client satisfaction rate. We are growing, and looking for sharp, driven people to grow with us.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#open-roles"
              className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-4 rounded-full no-underline hover:scale-[1.02] transition-transform"
            >
              See open roles
            </a>
            <Link
              href="/about"
              className="border border-white/30 text-[#F7F3EA] font-semibold text-[13px] uppercase tracking-[0.08em] px-8 py-4 rounded-full no-underline hover:border-white/70 transition-colors"
            >
              About us
            </Link>
          </div>
        </div>
      </section>

      {/* -- WHY MAGICWORKS ------------------------------------------- */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="text-[#D4A537] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Why join us</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,34px)] text-[#2A1B5C] mb-2 max-w-[560px]">
            A place where your work actually ships.
          </h2>
          <div className="w-10 h-[3px] bg-[#D4A537] mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-[10px] bg-[#EDE9F7] flex items-center justify-center text-[#5B3FBE] shrink-0 mt-[2px]">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] mb-1">
                    {p.title}
                  </h3>
                  <p className="text-[14px] text-[#3F3F4A] leading-[1.65]">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- OPEN ROLES ----------------------------------------------- */}
      <section id="open-roles" className="bg-white py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="text-[#D4A537] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Open positions</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,34px)] text-[#2A1B5C] mb-2">
            We&apos;re currently hiring
          </h2>
          <div className="w-10 h-[3px] bg-[#D4A537] mb-12" />

          <OpenRoles />

          <div className="mt-10 bg-[#F7F3EA] border border-[#D8D8DE] rounded-[12px] p-8 text-center">
            <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-2">
              Don&apos;t see your role?
            </h3>
            <p className="text-[14px] text-[#3F3F4A] mb-5 max-w-[420px] mx-auto leading-[1.65]">
              We occasionally hire for roles we haven&apos;t listed yet. Send us a short note about what you do and what you&apos;re looking for.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[12px] uppercase tracking-[0.08em] px-8 py-3 rounded-full no-underline hover:scale-[1.02] transition-transform"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* -- CTA ------------------------------------------------------ */}
      <section
        className="py-20 text-[#F7F3EA]"
        style={{ background: "linear-gradient(155deg,#1E1248 0%,#2A1B5C 60%,#1A1040 100%)" }}
      >
        <div className="max-w-[560px] mx-auto px-8 text-center">
          <p className="text-[#D4A537] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Pune · India</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,32px)] text-[#F7F3EA] mb-4 leading-[1.2]">
            Ready to evolve with purpose?
          </h2>
          <p className="text-[16px] text-[#C8B8FF] mb-8 leading-[1.65]">
            Drop us a message. No long application forms. Just tell us who you are and what you want to build.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-4 rounded-full no-underline hover:scale-[1.02] transition-transform"
          >
            Say hello ?
          </Link>
        </div>
      </section>
    </>
  );
}
