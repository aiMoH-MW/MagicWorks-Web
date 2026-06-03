import type { Metadata } from "next";
import Link from "next/link";
import { getActiveJobOpenings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Careers at MagicWorks",
  description:
    "Join MagicWorks IT Solutions in Pune. We are hiring across digital marketing, web development, AI, design, and operations. See open roles.",
  alternates: { canonical: "/about/careers" },
};

export const revalidate = 3600;

const deptColors: Record<string, string> = {
  "digital-marketing": "#5B3FBE",
  "web-development": "#5B3FBE",
  "ai-consulting": "#D4A537",
  "design": "#5B3FBE",
  "operations": "#9A9AA8",
  "sales": "#5B3FBE",
};

const deptLabels: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  "web-development": "Web Development",
  "ai-consulting": "AI & Consulting",
  "design": "Design",
  "operations": "Operations",
  "sales": "Sales",
};

export default async function CareersPage() {
  const jobs = await getActiveJobOpenings().catch(() => []);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-24 relative overflow-hidden">
        <svg className="absolute right-[-100px] top-[-80px] w-[480px] h-[480px] pointer-events-none opacity-50" aria-hidden="true">
          {[80, 140, 200, 260].map((r, i) => (
            <circle key={r} cx="240" cy="240" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">Careers</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[680px]">
            Build the agency you wish existed.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mt-4">
            We are a Pune-based team that takes the work seriously and the hierarchy lightly. If you want to do the best work of your career on real problems for real businesses, read on.
          </p>
        </div>
      </section>

      {/* Why MagicWorks */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-10">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C]">Why MagicWorks.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Real work, real accountability", body: "No vanity campaigns. Every brief has a number attached to it and a human who owns the result." },
              { title: "AI-first from day one", body: "We build AI into how we work, not as a gimmick. You will use tools and approaches that most agencies are still figuring out." },
              { title: "Pune, with national clients", body: "Based in Pune. Working with businesses across India. The timezone is good and the commute is optional for most roles." },
            ].map(v => (
              <div key={v.title} className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-6">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mb-2">{v.title}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-[#EDE9F7] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-10">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C]">
              Open roles {jobs.length > 0 && <span className="text-[#9A9AA8] font-normal text-[18px]">({jobs.length})</span>}
            </h2>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-white border border-[#D8D8DE] rounded-[10px] p-10 text-center">
              <p className="text-[16px] text-[#3F3F4A] mb-2">No open roles right now.</p>
              <p className="text-[14px] text-[#9A9AA8]">We hire when the right person shows up. Send your CV to <a href="mailto:careers@magicworksitsolutions.com" className="text-[#5B3FBE] no-underline hover:underline">careers@magicworksitsolutions.com</a></p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job: {
                _id: string; slug: { current: string }; title: string;
                department?: string; location?: string; type?: string; summary: string;
              }) => (
                <Link key={job._id} href={`/about/careers/${job.slug.current}`}
                  className="group flex items-center justify-between bg-white border border-[#D8D8DE] rounded-[10px] p-6 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(42,27,92,0.10)] transition-all">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      {job.department && (
                        <span className="text-[11px] font-bold uppercase tracking-[0.1em]"
                          style={{ color: deptColors[job.department] ?? "#5B3FBE" }}>
                          {deptLabels[job.department] ?? job.department}
                        </span>
                      )}
                      {job.type && (
                        <span className="text-[11px] uppercase tracking-[0.1em] text-[#9A9AA8]">{job.type}</span>
                      )}
                      {job.location && (
                        <span className="text-[11px] uppercase tracking-[0.1em] text-[#9A9AA8]">{job.location}</span>
                      )}
                    </div>
                    <h3 className="font-[family-name:var(--font-head)] font-bold text-[19px] text-[#2A1B5C] mb-1 group-hover:text-[#5B3FBE] transition-colors">{job.title}</h3>
                    <p className="text-[14px] text-[#3F3F4A] line-clamp-2">{job.summary}</p>
                  </div>
                  <span className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] ml-6 whitespace-nowrap">View role →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Speculative */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-16">
        <div className="max-w-[1120px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#F7F3EA] mb-1">Do not see the right role?</h2>
            <p className="text-[15px] text-[#C8B8FF]">Send a speculative application. We read them.</p>
          </div>
          <a href="mailto:careers@magicworksitsolutions.com"
            className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[13px] rounded-full no-underline hover:scale-[1.02] transition-transform whitespace-nowrap">
            Send your CV
          </a>
        </div>
      </section>
    </>
  );
}
