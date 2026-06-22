"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const services = [
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "AI Consultation", href: "/services/ai-consultation" },
  { label: "Marketplace & Platform Consultation", href: "/services/platform-consultation" },
];

const industries = [
  { label: "Education", href: "/industries/education" },
  { label: "Real Estate", href: "/industries/real-estate" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Professional Services", href: "/industries/professional-services" },
];

const chevron = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const insightsLinks = [
  { label: "Articles / Blogs", href: "/blog" },
  { label: "Whitepapers", href: "/insights/whitepapers" },
  { label: "Reports", href: "/insights/reports" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-t-[3px] border-t-[#D4A537] border-b border-b-[#D8D8DE]"
      style={{ background: "rgba(247,243,234,0.92)", backdropFilter: "saturate(140%) blur(10px)" }}
    >
      <nav className="max-w-[1120px] mx-auto px-8 py-[14px] flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-end gap-2 no-underline">
          <Image src="/logo-header.webp" alt="MagicWorks IT Solutions" width={220} height={60} className="h-14 w-auto object-contain" priority sizes="220px" />
          {Date.now() < Date.UTC(2026, 5, 17, 5, 30, 0) && (
            <span className="mb-1 bg-[#2A1B5C] text-[#D4A537] font-bold text-[10px] uppercase tracking-[0.1em] px-2 py-[3px] rounded-full border border-[#D4A537]/40">
              Beta
            </span>
          )}
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">

          {/* Services dropdown — wrapper div holds both trigger and panel */}
          <li className="relative">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="text-[14px] font-medium text-[#1A1A22] hover:text-[#5B3FBE] transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer py-2"
                aria-expanded={servicesOpen}
              >
                Services {chevron}
              </button>
              {/* pb-2 creates an invisible bridge so the mouse doesn't leave the wrapper between button and panel */}
              <div className={`absolute top-full left-0 pt-2 ${servicesOpen ? "block" : "hidden"}`}>
                <div className="w-[280px] bg-white border border-[#D8D8DE] rounded-[10px] shadow-lg py-2">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-3 text-[14px] text-[#1A1A22] hover:bg-[#EDE9F7] hover:text-[#5B3FBE] transition-colors no-underline"
                      onClick={() => setServicesOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>

          <li>
            <Link href="/work" className="text-[14px] font-medium text-[#1A1A22] hover:text-[#5B3FBE] transition-colors no-underline">
              Work
            </Link>
          </li>

          {/* Insights dropdown */}
          <li className="relative">
            <div
              className="relative"
              onMouseEnter={() => setInsightsOpen(true)}
              onMouseLeave={() => setInsightsOpen(false)}
            >
              <button
                className="text-[14px] font-medium text-[#1A1A22] hover:text-[#5B3FBE] transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer py-2"
                aria-expanded={insightsOpen}
              >
                Insights {chevron}
              </button>
              <div className={`absolute top-full left-0 pt-2 ${insightsOpen ? "block" : "hidden"}`}>
                <div className="w-[200px] bg-white border border-[#D8D8DE] rounded-[10px] shadow-lg py-2">
                  {insightsLinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-3 text-[14px] text-[#1A1A22] hover:bg-[#EDE9F7] hover:text-[#5B3FBE] transition-colors no-underline"
                      onClick={() => setInsightsOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>

          {/* Industries dropdown */}
          <li className="relative">
            <div
              className="relative"
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <button
                className="text-[14px] font-medium text-[#1A1A22] hover:text-[#5B3FBE] transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer py-2"
                aria-expanded={industriesOpen}
              >
                Industries {chevron}
              </button>
              <div className={`absolute top-full left-0 pt-2 ${industriesOpen ? "block" : "hidden"}`}>
                <div className="w-[220px] bg-white border border-[#D8D8DE] rounded-[10px] shadow-lg py-2">
                  {industries.map((i) => (
                    <Link
                      key={i.href}
                      href={i.href}
                      className="block px-4 py-3 text-[14px] text-[#1A1A22] hover:bg-[#EDE9F7] hover:text-[#5B3FBE] transition-colors no-underline"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      {i.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>

          <li>
            <Link href="/about" className="text-[14px] font-medium text-[#1A1A22] hover:text-[#5B3FBE] transition-colors no-underline">
              About
            </Link>
          </li>

          <li>
            <Link href="/careers" className="text-[14px] font-medium text-[#1A1A22] hover:text-[#5B3FBE] transition-colors no-underline">
              Careers
            </Link>
          </li>
        </ul>

        {/* Phone + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+919764566644"
            className="text-[13px] font-medium text-[#2A1B5C] hover:text-[#5B3FBE] transition-colors no-underline flex items-center gap-1.5"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            +91 97645 66644
          </a>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[12px] uppercase tracking-[0.08em] px-6 py-[11px] rounded-full no-underline hover:scale-[1.02] transition-transform">
            Get in touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden bg-none border-none cursor-pointer text-[#2A1B5C] text-[24px]" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#F7F3EA] border-t border-[#D8D8DE] px-8 py-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#9A9AA8] mb-2">Services</p>
          {services.map((s) => (
            <Link key={s.href} href={s.href} className="block py-2 text-[14px] text-[#1A1A22] hover:text-[#5B3FBE] no-underline" onClick={() => setMobileOpen(false)}>
              {s.label}
            </Link>
          ))}
          <div className="border-t border-[#D8D8DE] my-3" />
          <Link href="/work" className="block py-2 text-[14px] text-[#1A1A22] hover:text-[#5B3FBE] no-underline" onClick={() => setMobileOpen(false)}>Work</Link>
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#9A9AA8] mt-4 mb-2">Insights</p>
          {insightsLinks.map((i) => (
            <Link key={i.href} href={i.href} className="block py-2 text-[14px] text-[#1A1A22] hover:text-[#5B3FBE] no-underline" onClick={() => setMobileOpen(false)}>
              {i.label}
            </Link>
          ))}
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#9A9AA8] mt-4 mb-2">Industries</p>
          {industries.map((i) => (
            <Link key={i.href} href={i.href} className="block py-2 text-[14px] text-[#1A1A22] hover:text-[#5B3FBE] no-underline" onClick={() => setMobileOpen(false)}>
              {i.label}
            </Link>
          ))}
          <div className="border-t border-[#D8D8DE] my-3" />
          {[{ label: "About", href: "/about" }, { label: "Careers", href: "/careers" }].map((item) => (
            <Link key={item.href} href={item.href} className="block py-2 text-[14px] text-[#1A1A22] hover:text-[#5B3FBE] no-underline" onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a
            href="tel:+919764566644"
            className="block py-2 text-[14px] text-[#2A1B5C] font-medium no-underline"
            onClick={() => setMobileOpen(false)}
          >
            +91 97645 66644
          </a>
          <Link href="/contact" className="inline-block mt-4 bg-[#D4A537] text-[#2A1B5C] font-bold text-[12px] uppercase tracking-[0.08em] px-6 py-3 rounded-full no-underline" onClick={() => setMobileOpen(false)}>
            Get in touch
          </Link>
        </div>
      )}
    </header>
  );
}
