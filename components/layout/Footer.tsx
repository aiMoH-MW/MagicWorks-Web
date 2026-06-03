import Link from "next/link";

const serviceLinks = [
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "AI Consultation", href: "/services/ai-consultation" },
  { label: "Platform Consultation", href: "/services/platform-consultation" },
];

const industryLinks = [
  { label: "Education", href: "/industries/education" },
  { label: "Real Estate", href: "/industries/real-estate" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Professional Services", href: "/industries/professional-services" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/about/careers" },
  { label: "Contact", href: "/contact" },
];

const groupLinks = [
  { label: "MagicFlow AI", href: "/group/magicflow-ai" },
  { label: "Magic Pipeline", href: "/group/magic-pipeline" },
  { label: "MagicWorks Host", href: "/group/magicworks-host" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2A1B5C] text-[#F7F3EA] border-t-[2px] border-t-[#D4A537] pt-24 pb-4">
      <div className="max-w-[1120px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
          {/* Brand col */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-[10px] no-underline mb-4"
            >
              <span
                className="w-[30px] h-[30px] rounded-full border-2 border-[#F7F3EA] relative"
                aria-hidden
              >
                <span className="absolute inset-[6px] rounded-full border-2 border-[#D4A537]" />
              </span>
              <span className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#F7F3EA]">
                MagicWorks
              </span>
            </Link>
            <p className="text-[#C8B8FF] text-[14px] leading-[1.6] max-w-[300px] mb-4">
              AI-first digital marketing agency. Human strategy, machine
              acceleration. Evolving with Purpose.
            </p>
            <p className="text-[#C8B8FF] text-[13px]">
              MagicWorks IT Solutions Pvt. Ltd.
              <br />
              Pune, Maharashtra, India
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://linkedin.com/company/magicworks-it-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C8B8FF] hover:text-[#D4A537] text-[13px] no-underline transition-colors"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.16em] text-[#9A8FBF] mb-3">
              Services
            </h4>
            {serviceLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block text-[#F7F3EA] text-[14px] py-[7px] opacity-[0.78] hover:opacity-100 hover:text-[#D4A537] transition-all no-underline"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.16em] text-[#9A8FBF] mb-3">
              Industries
            </h4>
            {industryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block text-[#F7F3EA] text-[14px] py-[7px] opacity-[0.78] hover:opacity-100 hover:text-[#D4A537] transition-all no-underline"
              >
                {l.label}
              </Link>
            ))}
            <h4 className="text-[11px] uppercase tracking-[0.16em] text-[#9A8FBF] mt-5 mb-3">
              Company
            </h4>
            {companyLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block text-[#F7F3EA] text-[14px] py-[7px] opacity-[0.78] hover:opacity-100 hover:text-[#D4A537] transition-all no-underline"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* MagicWorks Group */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.16em] text-[#9A8FBF] mb-3">
              MagicWorks Group
            </h4>
            {groupLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block text-[#F7F3EA] text-[14px] py-[7px] opacity-[0.78] hover:opacity-100 hover:text-[#D4A537] transition-all no-underline"
              >
                {l.label}
              </Link>
            ))}
            <h4 className="text-[11px] uppercase tracking-[0.16em] text-[#9A8FBF] mt-5 mb-3">
              Legal
            </h4>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block text-[#F7F3EA] text-[14px] py-[7px] opacity-[0.78] hover:opacity-100 hover:text-[#D4A537] transition-all no-underline"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/[0.12] mt-16 pt-4 flex flex-wrap justify-between gap-2">
          <span className="text-[#9A8FBF] text-[11px] uppercase tracking-[0.14em]">
            &copy; {new Date().getFullYear()} MagicWorks IT Solutions Pvt. Ltd.
            All rights reserved.
          </span>
          <span className="text-[#9A8FBF] text-[11px] uppercase tracking-[0.14em]">
            Evolving with Purpose.
          </span>
        </div>
      </div>
    </footer>
  );
}
