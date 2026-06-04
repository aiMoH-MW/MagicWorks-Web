import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllCaseStudies } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Result-led case studies from MagicWorks. Education, real estate, manufacturing — real numbers, named clients, honest accounts of what changed.",
  alternates: { canonical: "/work" },
};

export const dynamic = "force-dynamic";

const industryLabels: Record<string, string> = {
  education: "Education",
  "real-estate": "Real Estate",
  manufacturing: "Manufacturing",
  "professional-services": "Professional Services",
  other: "Other",
};

const pillarLabels: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  "web-development": "Web Development",
  "ai-consultation": "AI Consultation",
  "platform-consultation": "Platform Consultation",
};

export default async function WorkPage() {
  const studies = await getAllCaseStudies().catch(() => []);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-20 relative overflow-hidden">
        <svg
          className="absolute right-[-100px] top-[-80px] w-[400px] h-[400px] pointer-events-none opacity-50"
          aria-hidden="true"
        >
          {[80, 140, 200].map((r, i) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke={i === 1 ? "#D4A537" : "#7C63D8"}
              strokeWidth="1.5"
              opacity={i === 1 ? 0.7 : 0.45}
            />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">Work</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[680px]">
            Results that speak plainly.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mt-4">
            Situation, intervention, result. Real numbers, named clients, honest
            accounts of what changed and why.
          </p>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          {studies.length === 0 ? (
            <p className="text-[#9A9AA8] text-[15px]">Case studies coming soon.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {studies.map(
                (s: {
                  _id: string;
                  slug: { current: string };
                  title: string;
                  client?: string;
                  heroMetric: string;
                  heroMetricLabel?: string;
                  industry?: string;
                  pillar?: string;
                  coverImage?: string;
                  coverImageAlt?: string;
                }) => (
                  <Link
                    key={s._id}
                    href={`/work/${s.slug.current}`}
                    className="group bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] overflow-hidden no-underline hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)] transition-all flex flex-col"
                  >
                    {s.coverImage && (
                      <div className="relative h-[180px] overflow-hidden">
                        <Image
                          src={s.coverImage}
                          alt={s.coverImageAlt ?? s.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,4vw,44px)] text-[#2A1B5C] leading-none">
                        {s.heroMetric}
                      </div>
                      {s.heroMetricLabel && (
                        <p className="text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mt-2">
                          {s.heroMetricLabel}
                        </p>
                      )}
                      <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mt-4 mb-2 group-hover:text-[#5B3FBE] transition-colors">
                        {s.title}
                      </h2>
                      <div className="flex gap-2 mt-auto pt-4 flex-wrap">
                        {s.industry && (
                          <span className="text-[11px] uppercase tracking-[0.1em] text-[#9A9AA8]">
                            {industryLabels[s.industry] ?? s.industry}
                          </span>
                        )}
                        {s.pillar && (
                          <>
                            <span className="text-[#D8D8DE]">·</span>
                            <span className="text-[11px] uppercase tracking-[0.1em] text-[#9A9AA8]">
                              {pillarLabels[s.pillar] ?? s.pillar}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.5vw,34px)] text-[#F7F3EA] max-w-[560px] mx-auto mb-4">
            Want results like these?
          </h2>
          <p className="text-[16px] text-[#C8B8FF] mb-8">
            Book a discovery call. Thirty minutes, no obligation.
          </p>
          <Link
            href="/contact"
            className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block"
          >
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
