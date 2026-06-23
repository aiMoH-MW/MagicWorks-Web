import type { Metadata } from "next";
import Link from "next/link";
import DigitalMarketingContactForm from "../DigitalMarketingContactForm";

export const metadata: Metadata = {
  title: "YouTube Video Optimisation & Channel Growth",
  description:
    "Organic YouTube growth done right: channel hygiene, video SEO, thumbnails, and retention. For brands and founders with a video pipeline.",
  alternates: { canonical: "/services/digital-marketing/youtube-video-optimisation" },
};

const included = [
  "Channel setup and hygiene",
  "Video SEO (titles, descriptions, tags, chapters)",
  "Thumbnail and metadata strategy",
  "End screens and playlists",
  "Audience-retention diagnostics",
];

const faq = [
  {
    q: "Is this paid advertising?",
    a: "No. This is organic optimisation. Paid YouTube ads sit under our Google Ads service.",
  },
  {
    q: "Do you produce the videos?",
    a: "We optimise and advise on strategy. Production can be scoped separately.",
  },
  {
    q: "Who is this best for?",
    a: "Brands with a steady video output, or founders building a personal channel who want their content to reach the right audiences.",
  },
];

const related = [
  { name: "Thought Leadership & GEO", href: "/services/digital-marketing/thought-leadership-geo", desc: "Extend authority beyond YouTube into AI answer citations." },
  { name: "LinkedIn & Organic Social", href: "/services/digital-marketing/linkedin-organic-social", desc: "B2B presence and founder visibility on LinkedIn." },
  { name: "Google Ads & Search Marketing", href: "/services/digital-marketing/google-ads-search-marketing", desc: "Paid YouTube ad campaigns sit here, not in this service." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "YouTube Video Optimisation",
  description: "Organic YouTube growth through video SEO, channel hygiene, thumbnails, and retention diagnostics.",
  provider: { "@type": "Organization", name: "MagicWorks IT Solutions Pvt. Ltd.", url: "https://magicworksitsolutions.com" },
  areaServed: "IN",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Digital Marketing", item: "https://magicworksitsolutions.com/services/digital-marketing" },
    { "@type": "ListItem", position: 4, name: "YouTube Video Optimisation", item: "https://magicworksitsolutions.com/services/digital-marketing/youtube-video-optimisation" },
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

export default function YouTubeOptimisationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340, 420].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav className="flex items-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/services/digital-marketing" className="hover:text-[#F7F3EA] transition-colors no-underline">Digital Marketing</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">YouTube Video Optimisation</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 01 · Organic Video</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            Turn your videos into a discovery channel.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            YouTube is the second-largest search engine, and most channels leave reach on the table. We grow yours organically with disciplined video SEO and retention work, so the right viewers find you and stay.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a href="#dm-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Book a discovery call
            </a>
            <Link href="/services/digital-marketing" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              All digital marketing services
            </Link>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="bg-[#F7F3EA] py-10 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Engagement", val: "Monthly retainer" },
            { label: "Focus", val: "Organic only" },
            { label: "Best for", val: "Brands & founders" },
            { label: "Paid YouTube", val: "Under Google Ads" },
          ].map((i) => (
            <div key={i.label}>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-1">{i.label}</p>
              <p className="font-semibold text-[15px] text-[#2A1B5C]">{i.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              What is included.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              Everything needed to make your video content discoverable and your channel worth subscribing to. Production is separate; the strategy and optimisation are ours.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-4 bg-white border border-[#D8D8DE] rounded-[10px] p-5">
                <span className="mt-[3px] flex-shrink-0 w-5 h-5 rounded-full bg-[#EDE9F7] flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#5B3FBE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <p className="text-[15px] text-[#3F3F4A]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When it fits */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="eyebrow text-[#D4A537] mb-4">When it fits</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#F7F3EA] mb-5 max-w-[600px]">
            Best for clients with an existing video pipeline.
          </h2>
          <p className="text-[16px] text-[#C8B8FF] leading-[1.65] max-w-[640px]">
            This service grows an organic video presence. It works best when you already produce or plan to produce video content regularly. A founder building a thought-leadership channel, or a brand with a content studio that is not seeing the reach it should, are both strong fits. If you want paid YouTube campaigns, those run under our Google Ads service.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#EDE9F7] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-8">Common questions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {faq.map((f) => (
              <div key={f.q} className="bg-white border border-[#D8D8DE] rounded-[10px] p-6">
                <h3 className="font-semibold text-[15px] text-[#2A1B5C] mb-2">{f.q}</h3>
                <p className="text-[14px] text-[#3F3F4A] leading-[1.65]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-[#F7F3EA] py-20">
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

      {/* Inline enquiry form */}
      <section id="dm-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Turn your video content into a genuine discovery channel.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Tell us about your channel and content pipeline and we will show you where the reach is being left behind.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Organic optimisation only — no channel confusion with paid ads</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Transparent attribution, honest reporting</li>
              </ul>
            </div>
            <DigitalMarketingContactForm
              sourcePage="/services/digital-marketing/youtube-video-optimisation"
              defaultService="YouTube"
            />
          </div>
        </div>
      </section>
    </>
  );
}
