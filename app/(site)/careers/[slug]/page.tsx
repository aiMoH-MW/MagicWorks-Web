import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobOpeningBySlug, getActiveJobOpenings } from "@/sanity/queries";
import ApplyForm from "./ApplyForm";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

const deptLabels: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  "web-development": "Web Engineering",
  "ai-consulting": "AI & Consulting",
  "design": "Design",
  "operations": "Operations",
  "sales": "Sales",
};

export async function generateStaticParams() {
  const jobs = await getActiveJobOpenings().catch(() => []);
  return jobs.map((j: { slug: { current: string } }) => ({ slug: j.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug).catch(() => null);
  if (!job) return { title: "Role not found" };
  const dept = deptLabels[job.department ?? ""] ?? job.department ?? "";
  const area = job.area ? ` · ${job.area}` : "";
  return {
    title: `${job.title} · Careers · MagicWorks`,
    description: job.summary,
    alternates: { canonical: `/careers/${slug}` },
    other: {
      "script:application/ld+json": JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        title: job.title,
        description: job.summary,
        datePosted: job.postedAt ?? new Date().toISOString().split("T")[0],
        validThrough: "2026-12-31",
        employmentType: job.type === "internship" ? "INTERN" : "FULL_TIME",
        hiringOrganization: {
          "@type": "Organization",
          name: "MagicWorks IT Solutions Pvt. Ltd.",
          sameAs: "https://magicworksitsolutions.com",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Pune",
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
        },
        industry: `${dept}${area}`,
      }),
    },
  };
}

export default async function JobOpeningPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug).catch(() => null);
  if (!job || job.status === "closed") notFound();

  const dept = deptLabels[job.department ?? ""] ?? job.department ?? "";
  const eyebrow = [dept, job.area].filter(Boolean).join(" · ");

  const typeLabel = job.type === "internship"
    ? "Internship"
    : job.type ? job.type.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) : "Full-time";

  return (
    <>
      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-150px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[330, 250, 170, 90].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          {/* Breadcrumb */}
          <div className="text-[13px] text-[#C8B8FF] mb-6">
            <Link href="/" className="text-[#C8B8FF] no-underline hover:text-[#D4A537] transition-colors">Home</Link>
            <span className="opacity-50 mx-2">/</span>
            <Link href="/careers" className="text-[#C8B8FF] no-underline hover:text-[#D4A537] transition-colors">Careers</Link>
            <span className="opacity-50 mx-2">/</span>
            <span>{job.title}</span>
          </div>

          {eyebrow && (
            <p className="eyebrow text-[#D4A537] mb-3">{eyebrow}</p>
          )}
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,42px)] leading-[1.1] text-[#F7F3EA] max-w-[700px]">
            {job.title}
          </h1>
          {job.subtitle && (
            <p className="text-[18px] text-[#C8B8FF] mt-2">{job.subtitle}</p>
          )}
          <p className="text-[14px] text-[#C8B8FF] mt-4 mb-6 tracking-[0.02em]">
            <strong className="text-[#F7F3EA] font-semibold">{job.location ?? "Pune"}</strong>
            {" (On-site)"}
            {job.type && ` · ${typeLabel}`}
            {job.experience && ` · ${job.experience}`}
          </p>
          <a
            href="#apply"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform"
          >
            Apply now
          </a>
        </div>
      </section>

      {/* Facts bar */}
      <section className="bg-[#F7F3EA] border-b border-[#D8D8DE] py-10">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1.5">Location</p>
              <p className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] leading-[1.3]">
                {job.location ?? "Pune"}
                <span className="block font-sans font-normal text-[12px] text-[#3F3F4A] mt-0.5">On-site</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1.5">Experience</p>
              <p className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] leading-[1.3]">
                {job.experience ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1.5">Salary / Stipend</p>
              <p className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] leading-[1.3]">
                {job.salary ?? "Competitive"}
                {job.salary && job.type !== "internship" && (
                  <span className="block font-sans font-normal text-[12px] text-[#3F3F4A] mt-0.5">Not a bar for a deserving candidate</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1.5">Qualification</p>
              <p className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] leading-[1.3]">
                {job.qualification ?? "Any graduate"}
              </p>
            </div>
          </div>

          {job.mandatory && (
            <div className="mt-6 bg-[#EDE9F7] border-l-4 border-[#5B3FBE] rounded-[6px] px-6 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5B3FBE] mb-1">Mandatory</p>
              <p className="text-[15px] text-[#3F3F4A]">{job.mandatory}</p>
            </div>
          )}
        </div>
      </section>

      {/* Job content */}
      <section className="bg-[#F7F3EA] py-16">
        <div className="max-w-[760px] mx-auto px-8">

          {job.summary && (
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(20px,2.6vw,24px)] text-[#2A1B5C] mb-4">
                Who we are looking for
              </h2>
              <p className="text-[16px] text-[#3F3F4A] leading-[1.65]">{job.summary}</p>
            </div>
          )}

          <div className="mb-10">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(20px,2.6vw,24px)] text-[#2A1B5C] mb-4">
              About MagicWorks
            </h2>
            <p className="text-[16px] text-[#3F3F4A] leading-[1.65]">
              MagicWorks IT Solutions Pvt. Ltd. is a Pune-based AI-first digital marketing agency that turns traffic, leads, and operations into predictable revenue. With 17+ years of experience, a team of 30+ experts, and a 98% client satisfaction rate, we help businesses across Education, Manufacturing, Real Estate, Travel, Hospitality, and more achieve measurable growth.
            </p>
          </div>

          {job.responsibilities?.length > 0 && (
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(20px,2.6vw,24px)] text-[#2A1B5C] mb-4">
                What you will do
              </h2>
              <ul className="list-none space-y-0">
                {job.responsibilities.map((r: string) => (
                  <li key={r} className="relative pl-[22px] py-[7px] text-[15px] text-[#3F3F4A] leading-[1.55]">
                    <span className="absolute left-0 top-[14px] w-[7px] h-[7px] rounded-full bg-[#5B3FBE]" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements?.length > 0 && (
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(20px,2.6vw,24px)] text-[#2A1B5C] mb-4">
                Required skills
              </h2>
              <ul className="list-none space-y-0">
                {job.requirements.map((r: string) => (
                  <li key={r} className="relative pl-[22px] py-[7px] text-[15px] text-[#3F3F4A] leading-[1.55]">
                    <span className="absolute left-0 top-[14px] w-[7px] h-[7px] rounded-full bg-[#5B3FBE]" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.niceToHave?.length > 0 && (
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(20px,2.6vw,24px)] text-[#2A1B5C] mb-4">
                Preferred skills
              </h2>
              <ul className="list-none space-y-0">
                {job.niceToHave.map((r: string) => (
                  <li key={r} className="relative pl-[22px] py-[7px] text-[15px] text-[#3F3F4A] leading-[1.55]">
                    <span className="absolute left-0 top-[14px] w-[7px] h-[7px] rounded-full bg-[#9A9AA8]" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.closing && (
            <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-6 text-[15px] text-[#3F3F4A] leading-[1.6]">
              {job.closing}
            </div>
          )}
        </div>
      </section>

      {/* Apply section */}
      <section className="bg-[#EDE9F7] py-20" id="apply">
        <div className="max-w-[760px] mx-auto px-8">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-4">
              Ready to apply?
            </h2>
            <hr className="w-16 h-[3px] bg-[#D4A537] border-0 mx-auto mb-4" />
            <p className="text-[16px] text-[#3F3F4A]">
              We read every application. Tell us about your experience and why this role is the right fit for you.
            </p>
          </div>
          <ApplyForm jobSlug={slug} jobTitle={job.title} />
        </div>
      </section>

      {/* Back to all roles */}
      <section className="bg-[#2A1B5C] py-8">
        <div className="max-w-[1120px] mx-auto px-8 text-center">
          <Link
            href="/careers"
            className="text-[#C8B8FF] text-[13px] uppercase tracking-[0.1em] font-bold no-underline hover:text-[#D4A537] transition-colors"
          >
            ← Back to all open roles
          </Link>
        </div>
      </section>
    </>
  );
}
