import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";

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
  { label: "Whitepapers", href: "/insights/whitepapers" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/magicworks-it-solutions-private-limited/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com/MagicWorks123",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Magicworksitsolutions/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@magicworksitsolutions",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/magicworks_it_solutions/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: "Location",
    href: "https://maps.app.goo.gl/25XvqMTAqFVUq4ng6",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
  },
];

const groupLinks = [
  { label: "MagicFlow AI", href: "/group/magicflow-ai" },
  { label: "Magic Pipeline", href: "/group/magic-pipeline" },
  { label: "MagicWorks Host", href: "/group/magicworks-host" },
];

export default function Footer() {
  return (
    <footer
      className="text-[#F7F3EA] border-t-[3px] border-t-[#D4A537] pt-16 pb-4"
      style={{ background: "linear-gradient(160deg, #1E1248 0%, #2A1B5C 50%, #1A1040 100%)" }}
    >
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Two-column layout: Brand left | Links+CTA right */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Brand col */}
          <div className="lg:w-[260px] lg:shrink-0 lg:border-r lg:border-white/10 lg:pr-8">
            <Link href="/" className="inline-block mb-1 no-underline">
              <Image
                src="/logo-footer.png"
                alt="MagicWorks IT Solutions"
                width={220}
                height={132}
                className="h-36 w-auto object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </Link>
            <p className="text-white/80 text-[13px] leading-[1.7] mb-5">
              AI-first digital marketing agency.<br />
              Human strategy, machine acceleration.
            </p>
            <p className="text-[#D4A537] text-[11px] font-semibold uppercase tracking-normal whitespace-nowrap mb-1">
              MagicWorks IT Solutions Pvt. Ltd.
            </p>
            <p className="text-white/50 text-[12px]">Pune, Maharashtra, India</p>

            {/* Social icons — single row */}
            <div className="mt-5 flex flex-nowrap gap-[6px]">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#D4A537] hover:text-[#2A1B5C] text-white/70 transition-all shrink-0"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right side: links grid + CTA stacked */}
          <div className="flex-1 flex flex-col gap-8">
            {/* 4-column links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {/* Services */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4A537] mb-4 pb-2 border-b border-[#D4A537]/30">
                  Services
                </h4>
                {serviceLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="block text-white/70 text-[13px] py-[6px] hover:text-[#D4A537] hover:pl-1 transition-all no-underline">
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* Industries */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4A537] mb-4 pb-2 border-b border-[#D4A537]/30">
                  Industries
                </h4>
                {industryLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="block text-white/70 text-[13px] py-[6px] hover:text-[#D4A537] hover:pl-1 transition-all no-underline">
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* MagicWorks Group */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4A537] mb-4 pb-2 border-b border-[#D4A537]/30">
                  MagicWorks Group
                </h4>
                {groupLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="block text-white/70 text-[13px] py-[6px] hover:text-[#D4A537] hover:pl-1 transition-all no-underline">
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4A537] mb-4 pb-2 border-b border-[#D4A537]/30">
                  Legal
                </h4>
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block text-white/70 text-[13px] py-[6px] hover:text-[#D4A537] hover:pl-1 transition-all no-underline">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter strip — directly below links */}
            <NewsletterForm source="footer" variant="footer" />
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/10 mt-8 pt-5 flex flex-wrap justify-between items-center gap-2">
          <span className="text-white/40 text-[11px] uppercase tracking-[0.14em]">
            &copy; {new Date().getFullYear()} MagicWorks IT Solutions Pvt. Ltd. All rights reserved.
          </span>
          <span className="text-[#D4A537]/70 text-[11px] uppercase tracking-[0.14em] font-medium">
            Evolving with Purpose.
          </span>
        </div>
      </div>
    </footer>
  );
}
