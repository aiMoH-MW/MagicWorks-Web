import type { Metadata } from "next";
import Link from "next/link";
import { getActiveJobOpenings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Careers at MagicWorks",
  description:
    "Join MagicWorks IT Solutions in Pune. We are hiring across digital marketing, web development, AI, design, and operations. See open roles.",
  alternates: { canonical: "/about/careers" },
};

export const dynamic = "force-dynamic";

const deptLabels: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  "web-development": "Web Engineering",
  "ai-consulting": "AI & Consulting",
  "design": "Design",
  "operations": "Operations",
  "sales": "Sales",
};

type Job = {
  _id: string;
  slug: { current: string };
  title: string;
  department?: string;
  area?: string;
  location?: string;
  type?: string;
  experience?: string;
  salary?: string;
  summary: string;
};

function RoleCard({ job }: { job: Job }) {
  const dept = deptLabels[job.department ?? ""] ?? job.department ?? "";
  const tag = [dept, job.area].filter(Boolean).join(" · ");
  const meta = [
    job.location ?? "Pune",
    job.type ? (job.type === "internship" ? "On-site internship" : job.type.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())) : null,
    job.experience,
    job.salary,
  ].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/about/careers/${job.slug.current}`}
      className="group flex items-center justify-between bg-white border border-[#D8D8DE] border-l-[3px] border-l-[#5B3FBE] rounded-[10px] p-6 no-underline hover:translate-x-[3px] hover:shadow-[0_12px_32px_rgba(42,27,92,0.08)] transition-all"
    >
      <div className="flex-1 min-w-0">
        {tag && (
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A9AA8] mb-1">{tag}</p>
        )}
        <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-1 leading-[1.25]">
          {job.title}
        </h3>
        {meta && <p className="text-[13px] text-[#3F3F4A]">{meta}</p>}
      </div>
      <span className="text-[#5B3FBE] font-bold text-[12px] uppercase tracking-[0.08em] ml-8 whitespace-nowrap flex-shrink-0">
        View role →
      </span>
    </Link>
  );
}

export default async function CareersPage() {
  const jobs: Job[] = await getActiveJobOpenings().catch(() => []);

  const fullTimeJobs = jobs.filter(j => j.type !== "internship");
  const internJobs = jobs.filter(j => j.type === "internship");

  return (
    <>
      {/* Hero — keep existing design */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-24 relative overflow-hidden">
        <svg className="absolute right-[-100px] top-[-80px] w-[480px] h-[480px] pointer-events-none opacity-50" aria-hidden="true">
          {[80, 140, 200, 260].map((r, i) => (
            <circle key={r} cx="240" cy="240" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">Careers · Pune, India</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[780px]">
            Build what is next. Join MagicWorks.
          </h1>
          <hr className="w-16 h-[3px] bg-[#D4A537] border-0 my-6" />
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[560px] mb-8">
            We are an AI-first digital marketing agency with 17+ years of experience, 30+ experts, and a 98% client satisfaction rate. We are growing, and looking for sharp, driven people to grow with us.
          </p>
          <a href="#openings" className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
            See open roles
          </a>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#F7F3EA] border-b border-[#D8D8DE] py-12">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "17+", cap: "Years of experience" },
              { num: "30+", cap: "Experts on the team" },
              { num: "98%", cap: "Client satisfaction" },
              { num: "Pune", cap: "On-site, in the office" },
            ].map(s => (
              <div key={s.cap}>
                <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,3.6vw,40px)] text-[#2A1B5C] leading-none">{s.num}</div>
                <div className="text-[13px] text-[#3F3F4A] mt-1.5">{s.cap}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MagicWorks */}
      <section className="bg-[#EDE9F7] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-10">
            <p className="eyebrow text-[#5B3FBE] mb-2">Why MagicWorks</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#2A1B5C] mb-3">
              Real work, modern tools, room to grow.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              We believe human intelligence drives strategy and AI accelerates results. That shows up in how we work every day.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Live work from day one",
                body: "You work on real client projects and live campaigns, not busywork. Interns included.",
              },
              {
                title: "AI-first by default",
                body: "We use AI tools like Claude in our daily workflow, and we hire people who want to work that way too.",
              },
              {
                title: "Mentorship and a path",
                body: "Guidance from experienced professionals, with certificates, recommendations, and pre-placement offers for standout interns.",
              },
            ].map(v => (
              <div key={v.title} className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-6">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-2">{v.title}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-[#F7F3EA] py-20" id="openings">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-10">
            <p className="eyebrow text-[#5B3FBE] mb-2">Open positions</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#2A1B5C] mb-3">
              Find your role.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              All roles are on-site in Pune. Tap a role to see the full description and apply.
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-white border border-[#D8D8DE] rounded-[10px] p-10 text-center">
              <p className="text-[16px] text-[#3F3F4A] mb-2">No open roles right now.</p>
              <p className="text-[14px] text-[#9A9AA8]">
                We hire when the right person shows up. Send your CV to{" "}
                <a href="mailto:careers@magicworksitsolutions.com" className="text-[#5B3FBE] no-underline hover:underline">
                  careers@magicworksitsolutions.com
                </a>
              </p>
            </div>
          ) : (
            <>
              {fullTimeJobs.length > 0 && (
                <div className="mb-10">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#5B3FBE] mb-4">
                    Full-time positions
                  </p>
                  <div className="flex flex-col gap-4">
                    {fullTimeJobs.map(job => <RoleCard key={job._id} job={job} />)}
                  </div>
                </div>
              )}

              {internJobs.length > 0 && (
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#5B3FBE] mb-4">
                    Internships
                  </p>
                  <div className="flex flex-col gap-4">
                    {internJobs.map(job => <RoleCard key={job._id} job={job} />)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Do not see the right role */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-20 text-center relative overflow-hidden">
        <svg className="absolute left-1/2 -translate-x-1/2 bottom-[-360px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[330, 240, 150].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3.5vw,32px)] text-[#F7F3EA] max-w-[600px] mx-auto">
            Do not see the right role?
          </h2>
          <hr className="w-16 h-[3px] bg-[#D4A537] border-0 mx-auto my-6" />
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[500px] mx-auto mb-8">
            If you are sharp, driven, and want to work the AI-first way, we still want to hear from you. Send us your details and tell us where you would fit.
          </p>
          <a
            href="mailto:careers@magicworksitsolutions.com"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform"
          >
            Send an open application
          </a>
        </div>
      </section>
    </>
  );
}
