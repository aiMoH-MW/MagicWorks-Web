import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Group — Three Sibling Brands",
  description:
    "Three sibling brands: MagicFlow AI for lead capture, Magic Pipeline for CRM and revenue ops, and MagicWorks Host for hosting and domains.",
  alternates: { canonical: "/group" },
};

const brands = [
  {
    name: "MagicFlow AI",
    href: "/group/magicflow-ai",
    externalHref: "https://www.magicflowai.io",
    tag: "SaaS Product",
    tagline: "Turn website visitors into qualified leads, 24/7.",
    desc: "A branded AI chatbot that greets visitors, qualifies them, and logs every lead with campaign context. The chat on this site runs on MagicFlow AI.",
    cta: "Visit MagicFlowAI.io",
    accentColor: "#5B3FBE",
  },
  {
    name: "Magic Pipeline",
    href: "/group/magic-pipeline",
    externalHref: "https://www.magicpipeline.io",
    tag: "SaaS Platform",
    tagline: "CRM, outreach, and revenue ops in one system.",
    desc: "A multi-tenant CRM with email, WhatsApp, SMS outreach, lead scoring, and invoicing, built for agencies and multi-brand service teams.",
    cta: "Visit MagicPipeline.io",
    accentColor: "#D4A537",
  },
  {
    name: "MagicWorks Host",
    href: "/group/magicworks-host",
    externalHref: "https://www.magicworkshost.com",
    tag: "Hosting Brand",
    tagline: "Fast, reliable hosting, domains, and SSL.",
    desc: "Managed web hosting, domain registration, SSL certificates, and email hosting on data centres in India and the USA. The destination for all new hosting needs.",
    cta: "Visit MagicWorksHost.com",
    accentColor: "#5B3FBE",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "MagicWorks Group", item: "https://magicworksitsolutions.com/group" },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://magicworksitsolutions.com/group",
  name: "The MagicWorks Group",
  description: "Three sibling brands in the MagicWorks Group: MagicFlow AI, Magic Pipeline, and MagicWorks Host.",
  isPartOf: { "@id": "https://magicworksitsolutions.com/#website" },
  about: { "@id": "https://magicworksitsolutions.com/#organization" },
};

export default function GroupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340, 420].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">The MagicWorks Group</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            One group, focused brands, clean boundaries.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-0">
            MagicWorks IT Solutions is the parent services company in a small family of brands. Each sibling exists because it serves a distinct buyer and a distinct need. Each has its own product, its own pricing, and its own contract. We will happily introduce you, but you engage each brand directly, which is exactly how we keep our advice independent and our invoices clean.
          </p>
        </div>
      </section>

      {/* Brand cards */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#2A1B5C] mb-3">
              Three brands. Three distinct jobs.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              One provider, one invoice, one contract applies at each brand. We will introduce you, but we never bundle sibling products into our services or our pricing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {brands.map((b) => (
              <div
                key={b.name}
                className="bg-white border border-[#D8D8DE] rounded-[10px] p-8 flex flex-col"
                style={{ borderTopWidth: 3, borderTopColor: b.accentColor }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: b.accentColor }}>
                  {b.tag}
                </p>
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-2">{b.name}</h2>
                <p className="text-[15px] font-semibold text-[#3F3F4A] mb-3">{b.tagline}</p>
                <p className="text-[14px] text-[#3F3F4A] leading-[1.65] flex-1 mb-6">{b.desc}</p>
                <div className="flex flex-col gap-3">
                  <a
                    href={b.externalHref}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-center bg-[#2A1B5C] text-[#F7F3EA] font-bold text-[12px] uppercase tracking-[0.08em] px-6 py-[11px] rounded-full no-underline hover:bg-[#5B3FBE] transition-colors"
                  >
                    {b.cta} →
                  </a>
                  <Link
                    href={b.href}
                    className="text-center border border-[#D8D8DE] text-[#3F3F4A] font-bold text-[12px] uppercase tracking-[0.08em] px-6 py-[11px] rounded-full no-underline hover:border-[#5B3FBE] hover:text-[#5B3FBE] transition-colors"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boundary note */}
      <section className="bg-[#EDE9F7] py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="bg-white border border-[#D8D8DE] border-l-[4px] border-l-[#D4A537] rounded-[10px] p-8 max-w-[800px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-3">The clean boundary</p>
            <p className="text-[16px] text-[#2A1B5C] font-semibold mb-2">One provider, one invoice, one contract, always.</p>
            <p className="text-[15px] text-[#3F3F4A] leading-[1.65]">
              A client of MagicWorks IT Solutions never pays for a sibling product on a MagicWorks invoice, and never pays a sibling brand for consulting or agency services. The two are kept separate so our advice stays independent and your procurement stays clean. When an engagement naturally leads toward one of these products, we introduce you, and you engage the sibling brand directly, under its own terms.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,32px)] text-[#F7F3EA] max-w-[520px] mx-auto mb-4">
            Not sure where to start?
          </h2>
          <p className="text-[16px] text-[#C8B8FF] max-w-[440px] mx-auto mb-8">
            A discovery call with MagicWorks IT Solutions is the right first step. We will route you to the right service or sibling.
          </p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[15px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
