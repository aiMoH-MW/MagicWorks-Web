import Link from "next/link";

const FULL_TIME = [
  {
    slug: "performance-marketing-executive",
    dept: "Digital Marketing · Paid Media",
    title: "Performance Marketing Executive",
    subtitle: undefined,
    meta: { location: "Pune", type: "Full-time", experience: "1 to 3 years", salary: "₹2.50 to 3.60 LPA" },
  },
  {
    slug: "digital-marketing-manager",
    dept: "Digital Marketing · Leadership",
    title: "Digital Marketing Manager",
    subtitle: undefined,
    meta: { location: "Pune", type: "Full-time", experience: "1 to 3 years (managerial)", salary: "₹3.00 to 6.00 LPA" },
  },
  {
    slug: "seo-executive",
    dept: "Digital Marketing · SEO",
    title: "SEO Executive",
    subtitle: "SEO, GEO & AEO",
    meta: { location: "Pune", type: "Full-time", experience: "1 to 3 years", salary: "₹1.80 to 3.00 LPA" },
  },
  {
    slug: "sales-executive-ai-product",
    dept: "Sales · AI Product (MagicFlow AI)",
    title: "Sales Executive",
    subtitle: undefined,
    badge: "3 openings",
    meta: { location: "Pune", type: "Full-time", experience: "2 to 5 years", salary: "₹3.00 to 6.00 LPA + incentives" },
  },
  {
    slug: "digital-marketing-sales-executive",
    dept: "Sales · Digital Marketing Agency",
    title: "Digital Marketing Sales Executive",
    subtitle: undefined,
    meta: { location: "Pune", type: "Full-time", experience: "2 to 5 years", salary: "₹3.00 to 6.00 LPA + incentives" },
  },
  {
    slug: "web-developer-full-stack",
    dept: "Web Engineering · Technology",
    title: "Web Developer",
    subtitle: "Full Stack: React, Node.js & AI-Assisted",
    meta: { location: "Pune", type: "Full-time", experience: "2 to 3 years", salary: "Competitive" },
  },
  {
    slug: "nextjs-developer",
    dept: "Web Engineering · Technology",
    title: "Next.js Developer",
    subtitle: "Next.js, React.js & AI-Assisted",
    meta: { location: "Pune", type: "Full-time", experience: "2–3 years", salary: "Competitive" },
  },
];

const INTERNSHIPS = [
  {
    slug: "seo-aeo-geo-intern",
    dept: "Digital Marketing · SEO",
    title: "SEO / AEO / GEO Intern",
    subtitle: undefined,
    meta: { location: "Pune", type: "On-site", experience: "3 to 6 months", salary: "Performance-based stipend" },
  },
  {
    slug: "digital-marketing-intern",
    dept: "Digital Marketing",
    title: "Digital Marketing Intern",
    subtitle: undefined,
    meta: { location: "Pune", type: "On-site", experience: "3 to 6 months", salary: "Performance-based stipend" },
  },
];

type Role = {
  slug: string;
  dept: string;
  title: string;
  subtitle?: string;
  badge?: string;
  meta: { location: string; type: string; experience: string; salary: string };
};

function RoleCard({ role }: { role: Role }) {
  const metaParts = [role.meta.type, role.meta.experience, role.meta.salary].filter(Boolean);
  return (
    <Link
      href={`/about/careers/${role.slug}`}
      className="group flex items-center justify-between bg-white border border-[#D8D8DE] border-l-[3px] border-l-[#5B3FBE] rounded-[10px] px-6 py-5 no-underline hover:translate-x-[3px] hover:shadow-[0_12px_32px_rgba(42,27,92,0.08)] transition-all"
    >
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A9AA8] mb-1">{role.dept}</p>
        <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-1 leading-[1.25]">
          {role.title}
          {role.subtitle && (
            <span className="ml-2 text-[15px] font-normal not-italic text-[#3F3F4A]">({role.subtitle})</span>
          )}
          {role.badge && (
            <span className="ml-2 inline-block bg-[#D4A537]/15 text-[#9a7b1f] text-[10px] font-bold uppercase tracking-[0.1em] rounded-full px-2 py-0.5 align-middle">
              {role.badge}
            </span>
          )}
        </h3>
        <p className="text-[13px] text-[#3F3F4A]">
          <strong className="font-semibold text-[#2A1B5C]">{role.meta.location}</strong>
          {metaParts.length > 0 && <> · {metaParts.join(" · ")}</>}
        </p>
      </div>
      <span className="text-[#5B3FBE] font-bold text-[12px] uppercase tracking-[0.08em] ml-8 whitespace-nowrap flex-shrink-0">
        View role →
      </span>
    </Link>
  );
}

export default function OpenRoles() {
  return (
    <div>
      {/* Internships */}
      <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#5B3FBE] mb-4">
        Internships
      </p>
      <div className="flex flex-col gap-4 mb-10">
        {INTERNSHIPS.map((role) => <RoleCard key={role.slug} role={role} />)}
      </div>

      {/* Full-time positions */}
      <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#5B3FBE] mb-4">
        Full-time positions
      </p>
      <div className="flex flex-col gap-4">
        {FULL_TIME.map((role) => <RoleCard key={role.slug} role={role} />)}
      </div>
    </div>
  );
}
