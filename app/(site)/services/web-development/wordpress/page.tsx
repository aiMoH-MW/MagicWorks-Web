import type { Metadata } from "next";
import Link from "next/link";
import WebDevelopmentContactForm from "../WebDevelopmentContactForm";

export const metadata: Metadata = {
  title: "WordPress Development",
  description:
    "WordPress website builds by MagicWorks: available on request, built on a curated plugin stack, and delivered properly. Not our default, but done well when it is the right tool.",
  alternates: { canonical: "/services/web-development/wordpress" },
};

const whenYes = [
  "You explicitly require WordPress, perhaps because your team already knows it",
  "The project is a straightforward brochure site with no scope for AI features",
  "You need seamless compatibility with a specific WordPress plugin or ecosystem",
  "The budget is below the AI-native floor price and the brief does not warrant it",
  "You have existing WordPress infrastructure you need to build alongside",
];

const whenNo = [
  "You want AI features: an assistant, intelligent search, or personalisation",
  "Performance, scale, or security is a priority",
  "You are building a portal, member site, or anything with user authentication",
  "You want the best possible findability in search and AI answers",
  "The site needs to grow significantly over the next two to three years",
];

const included = [
  { icon: "⭐", title: "Professional design", body: "On-brand, conversion-led design. Elementor or block-based theme, configured and styled for your brand, not a template with your logo swapped in.", gold: false },
  { icon: "📄", title: "Curated plugin stack", body: "We install only the plugins the site genuinely needs: a well-maintained, minimal set that keeps the site fast, secure, and manageable.", gold: false },
  { icon: "🔍", title: "SEO and AEO foundation", body: "Proper title tags, meta descriptions, schema, a clean URL structure, and an XML sitemap. Built to be found, not just built.", gold: false },
  { icon: "📱", title: "Mobile-first and fast", body: "Responsive on every device, optimised for real Indian mobile connections, and configured for Core Web Vitals from the start.", gold: false },
  { icon: "🔒", title: "Hosting via MagicWorks Host", body: "Your site is hosted on MagicWorks Host, our in-house hosting brand, with SSL, daily backups, and a staging environment. Hosting is billed directly by MagicWorks Host as a separate engagement.", gold: false },
  { icon: "🔧", title: "CMS handover and training", body: "Your team leaves able to manage pages, posts, images, and updates without calling us for every change. Documentation included.", gold: true },
];

const stackRows = [
  { comp: "Frontend and theme", what: "Elementor or block-based (FSE) theme", why: "Clean output, maintainable by non-developers, fast when configured properly" },
  { comp: "Hosting", what: "MagicWorks Host", why: "In-house hosting: SSL, daily backups, staging environment, and uptime monitoring. Billed separately by MagicWorks Host, not bundled into the build fee" },
  { comp: "SEO", what: "Rank Math (or equivalent)", why: "Schema, sitemap, meta management, and AEO-ready structure" },
  { comp: "Forms and capture", what: "WS Form or Gravity Forms", why: "Reliable, flexible, and routes leads where you need them" },
  { comp: "Performance", what: "WP Rocket or similar caching", why: "Core Web Vitals compliance without developer intervention" },
  { comp: "Security", what: "Wordfence or Solid Security", why: "Firewall, malware scanning, and login protection" },
  { comp: "Analytics", what: "Google Analytics 4 and Tag Manager", why: "Conversion tracking from day one, not set up as an afterthought" },
];

const steps = [
  { n: "01", t: "Discovery and brief", d: "We agree scope, pages, functionality, and the plugin stack before design starts. If AI-native is a better fit for your brief, we will say so here." },
  { n: "02", t: "Design and approval", d: "We design key pages (desktop and mobile) for your approval before build starts. You see what you are getting before we build it." },
  { n: "03", t: "Build and review", d: "Built on a staging environment. You review on real devices before anything goes live, and we fix any issues before launch." },
  { n: "04", t: "Launch and handover", d: "Launched with redirect handling for any existing URLs, analytics live from day one, and a training session for your team." },
];

const faq = [
  { q: "Why is WordPress on request rather than the default?", a: "From June 2026, our default web stack is AI-native: Next.js, an LLM-backed backend, and a headless CMS. This gives clients better performance, findability, and AI capabilities by default. WordPress remains available for clients who genuinely need it or whose brief has no scope for AI features." },
  { q: "When does WordPress make sense?", a: "When a client explicitly requires WordPress, when the project is a simple brochure site with no scope for AI features, or when the budget is below the AI-native floor price. We document the reason in every WordPress proposal." },
  { q: "What does your WordPress build include?", a: "A professionally designed WordPress site on a curated plugin stack and managed hosting, with SEO foundation, mobile optimisation, SSL, and a CMS your team can use. We do not load sites with unnecessary plugins." },
  { q: "Can I add AI features to a WordPress site?", a: "To a limited extent. Where AI features add genuine value, we can integrate MagicFlow AI or selected tools. But for AI-first builds, our AI-native stack (Next.js and LLM backend) is the right choice. We will tell you honestly which fits your brief." },
  { q: "Do you offer maintenance after launch?", a: "Yes. Standard Web AMC covers uptime monitoring, security and plugin updates, speed optimisation, and content changes." },
];

const related = [
  { name: "AI-Native Websites", href: "/services/web-development/ai-native-websites", desc: "Our default stack: Next.js, LLM backend, and AI features built in." },
  { name: "Web AMC", href: "/services/web-development/maintenance-amc", desc: "Keep the site fast, secure, and current after launch." },
  { name: "Platform Consultation", href: "/services/platform-consultation", desc: "Strategy for portals, member sites, and complex platform builds." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/web-development/wordpress#service",
  name: "WordPress Development",
  description: "WordPress website builds available on request, built on a curated plugin stack and managed hosting.",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
  },
  areaServed: "IN",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Web Development", item: "https://magicworksitsolutions.com/services/web-development" },
    { "@type": "ListItem", position: 4, name: "WordPress Development", item: "https://magicworksitsolutions.com/services/web-development/wordpress" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function WordPressDevelopmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340, 420].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav className="flex items-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/services/web-development" className="hover:text-[#F7F3EA] transition-colors no-underline">Web Development</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">WordPress Development</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Web Development · On Request</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            WordPress Development
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-8">
            Available on request, when WordPress is genuinely the right tool. Built on a curated plugin stack, delivered properly, with an honest word on when it is and is not the right choice.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {["On request only", "4 to 8 weeks delivery", "Curated plugin stack", "Hosted on MagicWorks Host", "AMC available post-launch"].map((pill) => (
              <span key={pill} className="text-[13px] font-semibold text-[#F7F3EA] bg-white/10 border border-white/20 rounded-full px-4 py-2">{pill}</span>
            ))}
          </div>
          <div className="flex gap-4 flex-wrap">
            <a href="#web-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Discuss your project
            </a>
            <Link href="/services/web-development" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              Back to Web Development
            </Link>
          </div>
        </div>
      </section>

      {/* Honest note */}
      <div className="bg-[#F7F3EA] border-t-[3px] border-t-[#D4A537] border-b border-b-[#D8D8DE] py-8">
        <div className="max-w-[1120px] mx-auto px-8 flex items-start gap-6">
          <span className="text-[26px] flex-shrink-0 mt-[2px]">📌</span>
          <div>
            <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-2">
              Our default is AI-native. WordPress is available when it is the right fit.
            </h3>
            <p className="text-[15px] text-[#3F3F4A] leading-[1.65]">
              From June 2026, our standard stack is AI-native: Next.js, an LLM-backed backend, and a headless CMS. That is what we recommend for most new builds because it performs better, ranks better, and is built for the future. WordPress is an occasional alternative, offered on request when a client needs it or when the brief has no scope for AI features. If you are not sure which is right for your project, we will tell you honestly.{" "}
              <Link href="/services/web-development" className="text-[#5B3FBE] font-semibold no-underline hover:underline">
                See all Web Development services.
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* When section */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-3">The honest picture</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">
              When WordPress makes sense, and when it does not.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-8">
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-6">WordPress is a good fit when...</h3>
              <ul>
                {whenYes.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3 border-t border-[#D8D8DE] first:border-0 list-none">
                    <span className="mt-[8px] flex-shrink-0 w-[9px] h-[9px] rounded-full bg-[#5B3FBE]" />
                    <span className="text-[15px] text-[#3F3F4A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#F7F3EA] border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-8">
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#3F3F4A] mb-6">We would suggest AI-native instead when...</h3>
              <ul>
                {whenNo.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3 border-t border-[#D8D8DE] first:border-0 list-none">
                    <span className="mt-[9px] flex-shrink-0 w-[9px] h-[9px] rounded-full border-2 border-[#9A9AA8]" />
                    <span className="text-[15px] text-[#3F3F4A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What is included */}
      <section className="bg-white py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-3">What you get</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">
              A proper WordPress build, not a theme install.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {included.map((c) => (
              <div key={c.title} className="bg-white border border-[#D8D8DE] rounded-[10px] p-7" style={{ borderTopWidth: 3, borderTopColor: c.gold ? "#D4A537" : "#5B3FBE" }}>
                <div className="text-[26px] mb-4">{c.icon}</div>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-2">{c.title}</h3>
                <p className="text-[14px] text-[#3F3F4A] leading-[1.6]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack table */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-3">The build</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">
              What we use and why.
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr>
                  {["Component", "What we use", "Why"].map((h) => (
                    <th key={h} className="bg-[#2A1B5C] text-[#F7F3EA] font-bold text-left px-5 py-4 font-[family-name:var(--font-head)] first:rounded-tl-[10px] last:rounded-tr-[10px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stackRows.map((r, idx) => (
                  <tr key={r.comp} className={idx < stackRows.length - 1 ? "border-b border-[#D8D8DE]" : ""}>
                    <td className="bg-white px-5 py-4 font-semibold text-[#2A1B5C] align-top w-[28%]">{r.comp}</td>
                    <td className="bg-white px-5 py-4 text-[#3F3F4A] align-top">{r.what}</td>
                    <td className="bg-white px-5 py-4 text-[#3F3F4A] align-top">{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[13px] text-[#9A9AA8] mt-4">Specific tools may vary by project. We confirm the stack in every proposal.</p>
        </div>
      </section>

      {/* MagicWorks Host */}
      <section className="bg-white py-12">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-8 bg-[#F7F3EA] border border-[#D8D8DE] border-l-4 border-l-[#D4A537] rounded-[10px] px-8 py-7">
            <div className="flex-1">
              <p className="eyebrow text-[#5B3FBE] mb-2">Hosting partner</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-2">Your site is hosted on MagicWorks Host.</h3>
              <p className="text-[15px] text-[#3F3F4A] leading-[1.65] max-w-[680px]">
                MagicWorks Host is our in-house hosting brand: SSD hosting, SSL certificates, daily backups, a staging environment, and uptime monitoring. Because we build the site and MagicWorks Host runs it, handover and ongoing support are seamless. Hosting is billed directly by MagicWorks Host as a separate engagement.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a href="https://magicworkshost.com" target="_blank" rel="nofollow noopener noreferrer"
                className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-7 py-[13px] rounded-full no-underline hover:scale-[1.02] transition-transform whitespace-nowrap inline-block">
                Visit MagicWorks Host
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-3">How we work</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">
              A clean, four-stage process.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="pt-6 border-t-2 border-[#D4A537]">
                <span className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#2A1B5C] leading-none">{s.n}</span>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mt-3 mb-2">{s.t}</h3>
                <p className="text-[14px] text-[#3F3F4A] leading-[1.6]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="bg-[#F7F3EA] py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="bg-white border border-[#D8D8DE] border-l-4 border-l-[#D4A537] rounded-[10px] p-10">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[24px] text-[#2A1B5C] mb-3">Who it is for</h2>
            <hr className="w-14 h-[3px] bg-[#D4A537] border-0 mb-5" />
            <p className="text-[18px] leading-[1.6] text-[#3F3F4A]">
              Founders, marketing heads, and business owners who have a genuine reason to build on WordPress, whether that is familiarity, a specific plugin dependency, or a brief that is genuinely well served by the platform. If you are not sure, ask us and we will give you a straight answer on which stack suits your brief.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-8">Common questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faq.map((f) => (
              <div key={f.q} className="bg-[#F7F3EA] border border-[#D8D8DE] rounded-[10px] p-6">
                <h3 className="font-semibold text-[15px] text-[#2A1B5C] mb-2">{f.q}</h3>
                <p className="text-[14px] text-[#3F3F4A] leading-[1.65]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-[#F7F3EA] py-16 pt-4">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-6">Related services</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.name} href={r.href} className="block bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-6 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(42,27,92,0.08)] transition-all">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] mb-2">{r.name}</h3>
                <p className="text-[13px] text-[#3F3F4A]">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="web-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Not sure if WordPress is right for your project? Let us help you decide.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us briefly what you are building and why you are considering WordPress. We will come back with an honest view on whether it is the right fit, or whether AI-native would serve you better.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Honest view on the right stack for your brief</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>4 to 8 weeks from brief to launch</li>
              </ul>
            </div>
            <WebDevelopmentContactForm
              sourcePage="/services/web-development/wordpress"
              defaultProject="WordPress website"
            />
          </div>
        </div>
      </section>
    </>
  );
}
