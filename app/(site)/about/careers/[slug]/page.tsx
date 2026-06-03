import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobOpeningBySlug, getActiveJobOpenings } from "@/sanity/queries";
import ApplyForm from "./ApplyForm";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const jobs = await getActiveJobOpenings().catch(() => []);
  return jobs.map((j: { slug: { current: string } }) => ({ slug: j.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug).catch(() => null);
  if (!job) return { title: "Role not found" };
  return {
    title: `${job.title} · Careers`,
    description: job.summary,
    alternates: { canonical: `/about/careers/${slug}` },
  };
}

export default async function JobOpeningPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug).catch(() => null);
  if (!job || job.status === "closed") notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <Link href="/about/careers" className="text-[#D4A537] text-[13px] uppercase tracking-[0.12em] font-bold no-underline hover:underline mb-6 inline-block">
            ← Careers
          </Link>
          <div className="flex gap-3 mb-4 flex-wrap">
            {job.department && <span className="text-[11px] uppercase tracking-[0.12em] text-[#C8B8FF] border border-white/20 px-3 py-1 rounded-full">{job.department}</span>}
            {job.type && <span className="text-[11px] uppercase tracking-[0.12em] text-[#C8B8FF] border border-white/20 px-3 py-1 rounded-full">{job.type}</span>}
            {job.location && <span className="text-[11px] uppercase tracking-[0.12em] text-[#C8B8FF] border border-white/20 px-3 py-1 rounded-full">{job.location}</span>}
          </div>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4.5vw,46px)] leading-[1.1] text-[#F7F3EA] max-w-[680px]">
            {job.title}
          </h1>
          {job.experience && <p className="text-[16px] text-[#C8B8FF] mt-3">{job.experience} experience</p>}
        </div>
      </section>

      {/* Content + Form */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-[1fr_420px] gap-16 items-start">
          <div>
            <div className="bg-white border border-[#D8D8DE] rounded-[10px] p-8 mb-8">
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-3">About the role</h2>
              <p className="text-[15px] text-[#3F3F4A] leading-[1.7]">{job.summary}</p>
            </div>

            {job.responsibilities?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-4">What you will do</h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((r: string) => (
                    <li key={r} className="flex gap-3 text-[15px] text-[#3F3F4A]">
                      <span className="text-[#D4A537] font-bold mt-0.5">→</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements?.length > 0 && (
              <div className="mb-8">
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-4">What we need</h2>
                <ul className="space-y-2">
                  {job.requirements.map((r: string) => (
                    <li key={r} className="flex gap-3 text-[15px] text-[#3F3F4A]">
                      <span className="text-[#5B3FBE] font-bold mt-0.5">✓</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.niceToHave?.length > 0 && (
              <div>
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-4">Nice to have</h2>
                <ul className="space-y-2">
                  {job.niceToHave.map((r: string) => (
                    <li key={r} className="flex gap-3 text-[14px] text-[#3F3F4A]">
                      <span className="text-[#9A9AA8] mt-0.5">○</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Application form */}
          <div className="sticky top-24">
            <ApplyForm jobSlug={slug} jobTitle={job.title} />
          </div>
        </div>
      </section>
    </>
  );
}
