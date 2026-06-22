import type { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies } from "@/sanity/queries";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Result-led case studies from MagicWorks. Education, real estate, manufacturing: real numbers, named clients, honest accounts of what changed.",
  alternates: { canonical: "/work" },
};

export const dynamic = "force-dynamic";

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://magicworksitsolutions.com/work",
  name: "MagicWorks Case Studies",
  description: "Result-led case studies from MagicWorks. Education, real estate, manufacturing: real numbers, named clients, honest accounts of what changed.",
  url: "https://magicworksitsolutions.com/work",
  isPartOf: { "@id": "https://magicworksitsolutions.com/#website" },
  about: { "@id": "https://magicworksitsolutions.com/#organization" },
};

type CaseStudy = {
  _id: string;
  slug: { current: string };
  title: string;
  client?: string;
  heroMetric: string;
  heroMetricLabel?: string;
  industry?: string;
  pillar?: string;
  featured?: boolean;
  situation?: string;
  coverImage?: string;
  coverImageAlt?: string;
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function WorkPage() {
  const studies = (await getAllCaseStudies().catch(() => [])) as CaseStudy[];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        {/* Decorative rings */}
        <svg
          className="absolute right-[-80px] top-[-60px] w-[420px] h-[420px] pointer-events-none"
          aria-hidden="true"
          viewBox="0 0 420 420"
        >
          {[80, 140, 200].map((r, i) => (
            <circle
              key={r}
              cx="210"
              cy="210"
              r={r}
              fill="none"
              stroke={i === 1 ? "#D4A537" : "#7C63D8"}
              strokeWidth="1.5"
              opacity={i === 1 ? 0.65 : 0.35}
            />
          ))}
        </svg>

        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">Client Work</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[720px] mb-5">
            Results that speak plainly.
          </h1>
          <p className="text-[18px] leading-[1.6] text-[#C8B8FF] max-w-[500px]">
            Situation, intervention, result. Real numbers, named clients, honest
            accounts of what changed — and why.
          </p>

          {/* Aggregate strip */}
          {studies.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { v: `${studies.length}`, l: "Case studies" },
                { v: "3", l: "Industries" },
                { v: "100%", l: "Named clients" },
              ].map(({ v, l }) => (
                <div key={l} className="flex items-center gap-3">
                  <span className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#D4A537] leading-none">
                    {v}
                  </span>
                  <span className="text-[13px] uppercase tracking-[0.12em] text-[#9A8FBF]">{l}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CASE STUDIES ───────────────────────────────────────────── */}
      <WorkClient studies={studies} />

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] py-20 relative overflow-hidden">
        <svg
          className="absolute left-1/2 bottom-[-200px] -translate-x-1/2 w-[480px] h-[480px] pointer-events-none"
          aria-hidden="true"
          viewBox="0 0 480 480"
        >
          <circle cx="240" cy="240" r="230" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.25" />
          <circle cx="240" cy="240" r="165" fill="none" stroke="#D4A537" strokeWidth="1.5" opacity="0.35" />
          <circle cx="240" cy="240" r="100" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.2" />
        </svg>
        <div className="max-w-[520px] mx-auto px-8 text-center relative">
          <p className="eyebrow text-[#D4A537] mb-4">Ready to act?</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.5vw,34px)] text-[#F7F3EA] mb-4 leading-[1.2]">
            Want results like these?
          </h2>
          <hr className="gold-rule mx-auto mb-6" />
          <p className="text-[16px] text-[#C8B8FF] mb-8 leading-[1.65]">
            Book a discovery call. Thirty minutes, no obligation. We&rsquo;ll
            look at your situation and give you honest next steps.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-4 rounded-full no-underline hover:scale-[1.02] transition-transform"
          >
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
