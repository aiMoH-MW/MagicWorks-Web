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

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-t-[3px] border-t-[#D4A537] border-b border-b-[#D8D8DE]"
      style={{ background: "rgba(247,243,234,0.92)", backdropFilter: "saturate(140%) blur(10px)" }}
    >
      <nav className="max-w-[1120px] mx-auto px-8 py-[14px] flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center no-underline">
          <Image src="/logo.png" alt="MagicWorks IT Solutions" width={220} height={60} className="h-14 w-auto object-contain" priority />
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

          {[
            { label: "Work", href: "/work" },
            { label: "Insights", href: "/insights" },
            { label: "About", href: "/about" },
          ].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-[14px] font-medium text-[#1A1A22] hover:text-[#5B3FBE] transition-colors no-underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/contact" className="hidden lg:inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[12px] uppercase tracking-[0.08em] px-6 py-[11px] rounded-full no-underline hover:scale-[1.02] transition-transform">
          Get in touch
        </Link>

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
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#9A9AA8] mt-4 mb-2">Industries</p>
          {industries.map((i) => (
            <Link key={i.href} href={i.href} className="block py-2 text-[14px] text-[#1A1A22] hover:text-[#5B3FBE] no-underline" onClick={() => setMobileOpen(false)}>
              {i.label}
            </Link>
          ))}
          <div className="border-t border-[#D8D8DE] my-3" />
          {[{ label: "Work", href: "/work" }, { label: "Insights", href: "/insights" }, { label: "About", href: "/about" }].map((item) => (
            <Link key={item.href} href={item.href} className="block py-2 text-[14px] text-[#1A1A22] hover:text-[#5B3FBE] no-underline" onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="inline-block mt-4 bg-[#D4A537] text-[#2A1B5C] font-bold text-[12px] uppercase tracking-[0.08em] px-6 py-3 rounded-full no-underline" onClick={() => setMobileOpen(false)}>
            Get in touch
          </Link>
        </div>
      )}
    </header>
  );
}
