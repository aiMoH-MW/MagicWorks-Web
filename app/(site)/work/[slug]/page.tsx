import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudyBySlug, getAllCaseStudies } from "@/sanity/queries";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const studies = await getAllCaseStudies().catch(() => []);
  return studies.map((s: { slug: { current: string } }) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug).catch(() => null);
  if (!study) return { title: "Case study not found" };
  return {
    title: study.title,
    description: study.situation?.substring(0, 155) ?? `${study.heroMetric} ${study.heroMetricLabel}`,
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug).catch(() => null);
  if (!study) notFound();

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.situation ?? "",
    publisher: { "@type": "Organization", name: "MagicWorks IT Solutions Pvt. Ltd." },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-20 relative overflow-hidden">
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <Link href="/work" className="text-[#D4A537] text-[13px] uppercase tracking-[0.12em] font-bold no-underline hover:underline mb-6 inline-block">
            ← Work
          </Link>
          <div className="grid md:grid-cols-[280px_1fr] gap-12 items-center mt-4">
            <div>
              <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(52px,8vw,84px)] text-[#F7F3EA] leading-[0.9]">
                {study.heroMetric}
              </div>
              {study.heroMetricLabel && (
                <p className="text-[13px] uppercase tracking-[0.12em] text-[#C8B8FF] mt-3">{study.heroMetricLabel}</p>
              )}
            </div>
            <div>
              {study.client && (
                <p className="text-[#D4A537] text-[11px] uppercase tracking-[0.16em] font-bold mb-3">{study.client}</p>
              )}
              <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(26px,4vw,38px)] leading-[1.15] text-[#F7F3EA]">
                {study.title}
              </h1>
              <div className="flex gap-3 mt-4 flex-wrap">
                {study.industry && (
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[#9A8FBF] border border-white/20 px-3 py-1 rounded-full">{study.industry}</span>
                )}
                {study.pillar && (
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[#9A8FBF] border border-white/20 px-3 py-1 rounded-full">{study.pillar}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIR sections */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[800px] mx-auto px-8 space-y-12">
          {study.situation && (
            <div>
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-4 pb-3 border-b-2 border-[#D4A537]">
                Situation
              </h2>
              <p className="text-[16px] leading-[1.7] text-[#3F3F4A]">{study.situation}</p>
            </div>
          )}
          {study.intervention && (
            <div>
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-4 pb-3 border-b-2 border-[#5B3FBE]">
                Intervention
              </h2>
              <p className="text-[16px] leading-[1.7] text-[#3F3F4A]">{study.intervention}</p>
            </div>
          )}
          {study.result && (
            <div>
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-4 pb-3 border-b-2 border-[#D4A537]">
                Result
              </h2>
              <p className="text-[16px] leading-[1.7] text-[#3F3F4A]">{study.result}</p>
            </div>
          )}
        </div>
      </section>

      {/* Metrics */}
      {study.metrics?.length > 0 && (
        <section className="bg-[#EDE9F7] py-16">
          <div className="max-w-[1120px] mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {study.metrics.map((m: { value: string; label: string }) => (
                <div key={m.label} className="text-center">
                  <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#2A1B5C] leading-none">{m.value}</div>
                  <p className="text-[13px] text-[#3F3F4A] mt-2">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {study.testimonial?.quote && (
        <section className="bg-[#F7F3EA] py-16">
          <div className="max-w-[720px] mx-auto px-8">
            <blockquote className="border-l-4 border-[#D4A537] pl-6">
              <p className="font-[family-name:var(--font-head)] italic text-[clamp(18px,2.4vw,22px)] text-[#2A1B5C] leading-[1.5] mb-4">
                &ldquo;{study.testimonial.quote}&rdquo;
              </p>
              {study.testimonial.name && (
                <footer className="text-[13px] text-[#3F3F4A]">
                  <strong className="text-[#5B3FBE]">{study.testimonial.name}</strong>
                  {study.testimonial.role && ` · ${study.testimonial.role}`}
                </footer>
              )}
            </blockquote>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.5vw,34px)] text-[#F7F3EA] max-w-[500px] mx-auto mb-4">
            Want results like these?
          </h2>
          <p className="text-[16px] text-[#C8B8FF] mb-8">Book a thirty-minute discovery call.</p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
