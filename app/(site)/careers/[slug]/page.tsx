import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobOpeningBySlug, getActiveJobOpenings } from "@/sanity/queries";
import ApplyForm from "./ApplyForm";

export const revalidate = 300;

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
  const area = job.area ? " · " + job.area : "";
  const metaDesc = job.summary
    ? job.summary.length > 155
      ? job.summary.slice(0, 152).replace(/\s\S*$/, "") + "..."
      : job.summary
    : undefined;
  return {
    title: job.title + " · Careers",
    description: metaDesc,
    alternates: { canonical: "/careers/" + slug },
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
        industry: dept + area,
      }),
    },
  };
}

/** Render qualification with bold "Preferred:" / "Also acceptable:" labels */
function QualificationCell({ qual }: { qual: string }) {
  const lines = qual.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        if (line.startsWith("Preferred:")) {
          return (
            <span key={i}>
              <strong>Preferred:</strong>
              {line.slice("Preferred:".length)}
              {i < lines.length - 1 && <br />}
            </span>
          );
        }
        if (line.startsWith("Also acceptable:")) {
          return (
            <span key={i}>
              <strong>Also acceptable:</strong>
              {line.slice("Also acceptable:".length)}
              {i < lines.length - 1 && <br />}
            </span>
          );
        }
        if (line.startsWith("Other relevant degrees")) {
          return (
            <span key={i}>
              <strong>Other relevant degrees</strong>
              {line.slice("Other relevant degrees".length)}
              {i < lines.length - 1 && <br />}
            </span>
          );
        }
        return (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

/** Render experience — parenthetical note in italic gray */
function ExperienceCell({ exp }: { exp: string }) {
  const match = exp.match(/^([^(]+)(\(.*\))?(.*)$/);
  if (!match || !match[2]) return <>{exp}</>;
  return (
    <>
      {match[1].trim()}
      {" "}
      <em className="text-[#9A9AA8] text-[13px]">{match[2]}</em>
      {match[3]}
    </>
  );
}

/** Section heading with gold underline, matching HTML .jd-section h3 */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(18px,2.2vw,20px)] text-[#2A1B5C] mb-4 pb-2 border-b-2 border-[#D4A537] inline-block">
      {children}
    </h2>
  );
}

export default async function JobOpeningPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobOpeningBySlug(slug).catch(() => null);
  if (!job || job.status === "closed") notFound();

  const dept = deptLabels[job.department ?? ""] ?? job.department ?? "";
  const eyebrow = [dept, job.area].filter(Boolean).join(" · ");
  const isInternship = job.type === "internship";

  const typeLabel = isInternship
    ? "Internship"
    : job.type ? job.type.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) : "Full-time";

  return (
    <>
      {/* ── Hero ── */}
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
            <p className="text-[15px] text-[#C8B8FF] mt-2">{job.subtitle}</p>
          )}
          <p className="text-[13px] text-[#C8B8FF] mt-3 mb-6">
            {job.location ?? "Pune"}
            {" · "}
            {typeLabel}
            {isInternship ? " · Agency-side role" : " · Agency-side role"}
          </p>
          <a
            href="#apply"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] px-7 py-[11px] rounded-full no-underline hover:opacity-90 transition-opacity"
          >
            Apply Now
          </a>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="bg-[#F7F3EA] py-16">
        <div className="max-w-[900px] mx-auto px-6 md:px-8">

          {/* ── Meta table ── */}
          <div className="mb-10 bg-white border border-[#D8D8DE] rounded-[12px] overflow-hidden">
            <table className="w-full border-collapse text-[14px]">
              <tbody>
                {isInternship && (
                  <>
                    <tr className="border-b border-[#D8D8DE]">
                      <td className="font-bold text-[#2A1B5C] bg-[#f9f7f3] py-[10px] px-[16px] w-[175px] align-top">Department</td>
                      <td className="text-[#3F3F4A] py-[10px] px-[16px]">{dept}</td>
                    </tr>
                    <tr className="border-b border-[#D8D8DE]">
                      <td className="font-bold text-[#2A1B5C] bg-[#f9f7f3] py-[10px] px-[16px] align-top">Employment Type</td>
                      <td className="text-[#3F3F4A] py-[10px] px-[16px]">
                        <span className="inline-block bg-[#0e7a3e] text-white text-[11px] font-bold uppercase tracking-[.1em] px-2 py-0.5 rounded">Internship</span>
                      </td>
                    </tr>
                    {job.experience && (
                      <tr className="border-b border-[#D8D8DE]">
                        <td className="font-bold text-[#2A1B5C] bg-[#f9f7f3] py-[10px] px-[16px] align-top">Duration</td>
                        <td className="text-[#3F3F4A] py-[10px] px-[16px]">{job.experience}</td>
                      </tr>
                    )}
                  </>
                )}
                <tr className="border-b border-[#D8D8DE]">
                  <td className="font-bold text-[#2A1B5C] bg-[#f9f7f3] py-[10px] px-[16px] align-top">Location</td>
                  <td className="text-[#3F3F4A] py-[10px] px-[16px]">{job.location ?? "Pune"} (On-site)</td>
                </tr>
                {!isInternship && job.experience && (
                  <tr className="border-b border-[#D8D8DE]">
                    <td className="font-bold text-[#2A1B5C] bg-[#f9f7f3] py-[10px] px-[16px] align-top">Experience</td>
                    <td className="text-[#3F3F4A] py-[10px] px-[16px]">
                      <ExperienceCell exp={job.experience} />
                    </td>
                  </tr>
                )}
                {job.salary && (
                  <tr className="border-b border-[#D8D8DE]">
                    <td className="font-bold text-[#2A1B5C] bg-[#f9f7f3] py-[10px] px-[16px] align-top">
                      {isInternship ? "Stipend" : "Salary Range"}
                    </td>
                    <td className="text-[#3F3F4A] py-[10px] px-[16px]">
                      <strong className="text-[#2A1B5C]">{job.salary}</strong>
                      {!isInternship && (
                        <em className="text-[#9A9AA8] text-[13px] ml-2">(Salary not a bar for a deserving candidate)</em>
                      )}
                    </td>
                  </tr>
                )}
                {job.qualification && (
                  <tr className="border-b border-[#D8D8DE]">
                    <td className="font-bold text-[#2A1B5C] bg-[#f9f7f3] py-[10px] px-[16px] align-top">Qualification</td>
                    <td className="text-[#3F3F4A] py-[10px] px-[16px]">
                      <QualificationCell qual={job.qualification} />
                    </td>
                  </tr>
                )}
                {job.mandatory && (
                  <tr className="border-b border-[#D8D8DE]">
                    <td className="font-bold text-[#2A1B5C] bg-[#f9f7f3] py-[10px] px-[16px] align-top">Mandatory</td>
                    <td className="text-[#3F3F4A] py-[10px] px-[16px]">
                      <span className="inline-block bg-[#fee2e2] text-[#b91c1c] text-[11px] font-bold uppercase tracking-[.1em] px-2 py-0.5 rounded mr-2">Must Have</span>
                      {job.mandatory}
                    </td>
                  </tr>
                )}
                {job.preferredCandidate && (
                  <tr>
                    <td className="font-bold text-[#2A1B5C] bg-[#fdf6e3] py-[10px] px-[16px] align-top">Preferred Candidate</td>
                    <td className="text-[#3F3F4A] bg-[#fffdf5] py-[10px] px-[16px] italic">{job.preferredCandidate}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── About MagicWorks ── */}
          <div className="mb-10">
            <SectionHeading>About MagicWorks</SectionHeading>
            <p className="text-[15px] text-[#3F3F4A] leading-[1.65] mt-4">
              MagicWorks IT Solutions Pvt. Ltd. is a Pune-based AI-first digital marketing agency that turns traffic, leads, and operations into predictable revenue. With 17+ years of experience, a team of 30+ experts, and a 98% client satisfaction rate, we help businesses across Education, Manufacturing, Real Estate, Travel, Hospitality, and more achieve measurable growth.
            </p>
          </div>

          {/* ── Job Summary ── */}
          {job.summary && (
            <div className="mb-10">
              <SectionHeading>Job Summary</SectionHeading>
              <p className="text-[15px] text-[#3F3F4A] leading-[1.65] mt-4">{job.summary}</p>
            </div>
          )}

          {/* ── Key Responsibilities ── */}
          {job.responsibilities?.length > 0 && (
            <div className="mb-10">
              <SectionHeading>Key Responsibilities</SectionHeading>
              <div className="mt-4">
                {job.responsibilities.map((item: string, idx: number) => {
                  if (item.startsWith("## ")) {
                    return (
                      <h4 key={idx} className="text-[13.5px] font-bold text-[#5B3FBE] mt-4 mb-2">
                        {item.slice(3)}
                      </h4>
                    );
                  }
                  return (
                    <div key={idx} className="relative pl-[18px] mb-[7px]">
                      <span className="absolute left-0 top-[8px] w-[6px] h-[6px] rounded-full bg-[#D4A537]" />
                      <span className="text-[14px] text-[#3F3F4A] leading-[1.6]">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Required Skills ── */}
          {job.requirements?.length > 0 && (
            <div className="mb-10">
              <SectionHeading>Required Skills</SectionHeading>
              <ul className="list-none mt-4">
                {job.requirements.map((r: string) => (
                  <li key={r} className="relative pl-[18px] mb-[7px]">
                    <span className="absolute left-0 top-[8px] w-[6px] h-[6px] rounded-full bg-[#D4A537]" />
                    <span className="text-[14px] text-[#3F3F4A] leading-[1.6]">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Preferred Skills ── */}
          {job.niceToHave?.length > 0 && (
            <div className="mb-10">
              <SectionHeading>Preferred Skills</SectionHeading>
              <ul className="list-none mt-4">
                {job.niceToHave.map((r: string) => (
                  <li key={r} className="relative pl-[18px] mb-[7px]">
                    <span className="absolute left-0 top-[8px] w-[6px] h-[6px] rounded-full bg-[#D4A537]" />
                    <span className="text-[14px] text-[#3F3F4A] leading-[1.6]">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── What You Will Gain (internship) ── */}
          {job.gainItems?.length > 0 && (
            <div className="mb-10">
              <SectionHeading>What You Will Gain</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mt-4">
                {job.gainItems.map((item: string) => {
                  const colonIdx = item.indexOf(": ");
                  const title = colonIdx > -1 ? item.slice(0, colonIdx) : item;
                  const desc = colonIdx > -1 ? item.slice(colonIdx + 2) : "";
                  return (
                    <div key={item} className="bg-[#f5f3fc] border border-[#ddd8ff] rounded-[8px] p-[12px]">
                      <strong className="text-[#5B3FBE] text-[13px] block mb-1">{title}</strong>
                      {desc && <span className="text-[#3F3F4A] text-[13px]">{desc}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Closing note ── */}
          {job.closing && (
            <div className="bg-[#f0ecff] border-l-4 border-[#5B3FBE] rounded-r-[8px] px-[16px] py-[12px] mt-4 mb-10">
              <p className="text-[#2A1B5C] text-[13.5px] leading-[1.6] m-0">{job.closing}</p>
            </div>
          )}

        </div>
      </section>

      {/* ── Apply section ── */}
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

      {/* ── Back to all roles ── */}
      <section className="bg-[#2A1B5C] py-8">
        <div className="max-w-[1120px] mx-auto px-8 text-center">
          <Link
            href="/careers"
            className="text-[#C8B8FF] text-[13px] uppercase tracking-[0.1em] font-bold no-underline hover:text-[#D4A537] transition-colors"
          >
            Back to all open roles
          </Link>
        </div>
      </section>
    </>
  );
}
