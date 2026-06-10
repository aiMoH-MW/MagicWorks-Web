import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllCaseStudies } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Result-led case studies from MagicWorks. Education, real estate, manufacturing: real numbers, named clients, honest accounts of what changed.",
  alternates: { canonical: "/work" },
};

export const dynamic = "force-dynamic";

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

const industryLabels: Record<string, string> = {
  education: "Education",
  "real-estate": "Real Estate",
  manufacturing: "Manufacturing",
  "professional-services": "Professional Services",
  healthcare: "Healthcare",
  ecommerce: "Ecommerce",
  retail: "Retail",
  hospitality: "Hospitality",
  construction: "Construction",
  technology: "Technology",
  other: "Other",
};

const pillarLabels: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  "web-development": "Web Development",
  "ai-consultation": "AI Consultation",
  "platform-consultation": "Platform Consultation",
};

// Excerpt helper — first sentence or ≤ 130 chars
function toExcerpt(text?: string): string {
  if (!text) return "";
  const sentence = text.match(/^[^.!?]+[.!?]/)?.[0] ?? text;
  return sentence.length > 130 ? sentence.slice(0, 128) + "…" : sentence;
}

// ── Featured card (full-width horizontal) ────────────────────────────────────
function FeaturedCard({ s }: { s: CaseStudy }) {
  const tags = [
    s.industry ? industryLabels[s.industry] ?? s.industry : null,
    s.pillar ? pillarLabels[s.pillar] ?? s.pillar : null,
  ].filter(Boolean) as string[];
  const excerpt = toExcerpt(s.situation);

  return (
    <Link
      href={`/work/${s.slug.current}`}
      className="group relative flex flex-col md:flex-row rounded-[14px] overflow-hidden no-underline shadow-[0_8px_40px_rgba(42,27,92,0.14)] hover:shadow-[0_20px_60px_rgba(42,27,92,0.22)] hover:-translate-y-[3px] transition-all mb-10"
    >
      {/* Left — metric panel */}
      <div
        className="md:w-[280px] flex-shrink-0 flex flex-col items-start justify-center px-10 py-12 relative overflow-hidden"
        style={{ background: "linear-gradient(140deg,#2A1B5C 0%,#3D2880 100%)" }}
      >
        {/* Decorative rings */}
        <svg
          className="absolute right-[-40px] bottom-[-40px] w-[160px] h-[160px] pointer-events-none"
          aria-hidden="true"
          viewBox="0 0 160 160"
        >
          <circle cx="80" cy="80" r="70" fill="none" stroke="#7C63D8" strokeWidth="1.2" opacity="0.4" />
          <circle cx="80" cy="80" r="48" fill="none" stroke="#D4A537" strokeWidth="1.2" opacity="0.5" />
        </svg>

        <p className="text-[11px] uppercase tracking-[0.18em] text-[#C8B8FF] mb-3 font-semibold">Featured Work</p>
        <div
          className="font-[family-name:var(--font-head)] font-bold leading-none text-[#D4A537]"
          style={{ fontSize: "clamp(40px,5vw,58px)" }}
        >
          {s.heroMetric}
        </div>
        {s.heroMetricLabel && (
          <p className="text-[12px] uppercase tracking-[0.13em] text-[#C8B8FF] mt-3 leading-[1.4] max-w-[180px]">
            {s.heroMetricLabel}
          </p>
        )}
      </div>

      {/* Right — content panel */}
      <div className="flex-1 bg-white px-8 md:px-10 py-10 flex flex-col justify-between">
        {/* Cover image (if any) */}
        {s.coverImage && (
          <div className="relative h-[160px] rounded-[8px] overflow-hidden mb-6">
            <Image
              src={s.coverImage}
              alt={s.coverImageAlt ?? s.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#5B3FBE] bg-[#EDE9F7] px-3 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(18px,2.2vw,24px)] text-[#2A1B5C] leading-[1.25] mb-3 group-hover:text-[#5B3FBE] transition-colors">
            {s.title}
          </h2>
          {excerpt && (
            <p className="text-[15px] text-[#3F3F4A] leading-[1.65] mb-6">
              {excerpt}
            </p>
          )}
        </div>

        <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#5B3FBE] uppercase tracking-[0.08em] group-hover:gap-3 transition-all">
          Read case study
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ── Standard card ─────────────────────────────────────────────────────────────
function StudyCard({ s }: { s: CaseStudy }) {
  const tags = [
    s.industry ? industryLabels[s.industry] ?? s.industry : null,
    s.pillar ? pillarLabels[s.pillar] ?? s.pillar : null,
  ].filter(Boolean) as string[];
  const excerpt = toExcerpt(s.situation);

  return (
    <Link
      href={`/work/${s.slug.current}`}
      className="group flex flex-col rounded-[12px] overflow-hidden no-underline shadow-[0_2px_16px_rgba(42,27,92,0.08)] hover:shadow-[0_16px_48px_rgba(42,27,92,0.16)] hover:-translate-y-[4px] transition-all"
    >
      {/* Metric panel */}
      <div
        className="relative px-7 pt-8 pb-7 overflow-hidden"
        style={{ background: "linear-gradient(140deg,#2A1B5C 0%,#3D2880 100%)" }}
      >
        {/* Decorative rings */}
        <svg
          className="absolute right-[-24px] top-[-24px] w-[110px] h-[110px] pointer-events-none"
          aria-hidden="true"
          viewBox="0 0 110 110"
        >
          <circle cx="55" cy="55" r="48" fill="none" stroke="#7C63D8" strokeWidth="1" opacity="0.4" />
          <circle cx="55" cy="55" r="32" fill="none" stroke="#D4A537" strokeWidth="1" opacity="0.5" />
        </svg>

        {/* Optional cover image inset */}
        {s.coverImage && (
          <div className="relative h-[120px] rounded-[6px] overflow-hidden mb-5 opacity-80">
            <Image
              src={s.coverImage}
              alt={s.coverImageAlt ?? s.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}

        <div
          className="font-[family-name:var(--font-head)] font-bold leading-none text-[#D4A537] relative z-10"
          style={{ fontSize: "clamp(34px,4vw,46px)" }}
        >
          {s.heroMetric}
        </div>
        {s.heroMetricLabel && (
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#C8B8FF] mt-2 relative z-10 leading-[1.4]">
            {s.heroMetricLabel}
          </p>
        )}
      </div>

      {/* Content panel */}
      <div className="bg-white flex flex-col flex-1 px-7 py-6">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((t) => (
              <span
                key={t}
                className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#5B3FBE] bg-[#EDE9F7] px-2.5 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <h2 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] leading-[1.3] mb-3 group-hover:text-[#5B3FBE] transition-colors">
          {s.title}
        </h2>

        {excerpt && (
          <p className="text-[13px] text-[#3F3F4A] leading-[1.65] flex-1 mb-5">
            {excerpt}
          </p>
        )}

        {/* CTA */}
        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#5B3FBE] uppercase tracking-[0.08em] mt-auto group-hover:gap-2.5 transition-all">
          Read case study
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function WorkPage() {
  const studies = (await getAllCaseStudies().catch(() => [])) as CaseStudy[];

  const featured = studies.find((s) => s.featured);
  const rest = studies.filter((s) => !s.featured);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] pt-24 pb-20 relative overflow-hidden">
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
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          {studies.length === 0 ? (
            <p className="text-[#9A9AA8] text-[15px]">Case studies coming soon.</p>
          ) : (
            <>
              {/* Featured card */}
              {featured && <FeaturedCard s={featured} />}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {rest.map((s) => (
                    <StudyCard key={s._id} s={s} />
                  ))}
                </div>
              )}

              {/* If no featured flag set, show all as grid */}
              {!featured && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {studies.map((s) => (
                    <StudyCard key={s._id} s={s} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

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
