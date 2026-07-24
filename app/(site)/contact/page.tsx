import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Talk to Us: Discovery Call and Enquiries",
  description:
    "Book a thirty-minute discovery call with MagicWorks. No obligation. We will tell you honestly whether we are the right fit for your business.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "https://magicworksitsolutions.com/contact",
    title: "Talk to Us: Discovery Call and Enquiries | MagicWorks",
    description:
      "Book a thirty-minute discovery call with MagicWorks. No obligation. We will tell you honestly whether we are the right fit for your business.",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact MagicWorks",
  url: "https://magicworksitsolutions.com/contact",
  about: { "@id": "https://magicworksitsolutions.com/#organization" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://magicworksitsolutions.com/#organization",
  name: "MagicWorks IT Solutions Pvt. Ltd.",
  url: "https://magicworksitsolutions.com",
  telephone: "+91 97645 66644",
  email: "hello@magicworksitsolutions.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office 201, Vasant Bahawa, Bavdhan",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411021",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.5195,
    longitude: 73.7898,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:30",
    closes: "18:30",
  },
  areaServed: [
    { "@type": "City", name: "Pune" },
    { "@type": "City", name: "Mumbai" },
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Hyderabad" },
    { "@type": "State", name: "Maharashtra" },
    { "@type": "Country", name: "India" },
  ],
};

const contactFaq = [
  { q: "How quickly do you respond to enquiries?", a: "A team member will reach out within one working day to schedule a discovery call." },
  { q: "Do you work with businesses outside Pune?", a: "Yes. We serve clients across India including Mumbai, Bangalore, Hyderabad, and Delhi-NCR, and offshore clients in Europe and the USA." },
  { q: "Is the discovery call really free with no obligation?", a: "Yes. The thirty-minute call is completely free with no obligation. We will tell you honestly whether we are the right fit for your business." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: contactFaq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://magicworksitsolutions.com/contact" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg
          className="absolute right-[-100px] top-[-100px] w-[480px] h-[480px] pointer-events-none opacity-50"
          aria-hidden="true"
        >
          {[80, 140, 200].map((r, i) => (
            <circle
              key={r}
              cx="240"
              cy="240"
              r={r}
              fill="none"
              stroke={i === 1 ? "#D4A537" : "#7C63D8"}
              strokeWidth="1.5"
              opacity={i === 1 ? 0.7 : 0.45}
            />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">Let us talk</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[780px]">
            A thirty-minute call, no obligation.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mt-4">
            Tell us about your business and goals. We will tell you honestly
            whether we are the right fit, and what the first step looks like.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
          {/* Left: info */}
          <div>
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[24px] text-[#2A1B5C] mb-6">
              What to expect
            </h2>
            <div className="space-y-5">
              {[
                {
                  n: "01",
                  t: "Fill in the form",
                  d: "Name, email, and a line about what you are working on.",
                },
                {
                  n: "02",
                  t: "We confirm a slot",
                  d: "A team member will reach out within one working day to schedule.",
                },
                {
                  n: "03",
                  t: "Thirty-minute discovery call",
                  d: "We listen, ask the right questions, and share a clear view of next steps.",
                },
                {
                  n: "04",
                  t: "Proposal in five working days",
                  d: "A scoped proposal with no padding. You decide whether to proceed.",
                },
              ].map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#D4A537] leading-none mt-1 min-w-[32px]">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-semibold text-[15px] text-[#2A1B5C]">
                      {s.t}
                    </p>
                    <p className="text-[14px] text-[#3F3F4A] mt-1">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#D8D8DE]">
              <p className="text-[13px] uppercase tracking-[0.12em] text-[#9A9AA8] mb-2">
                Office
              </p>
              <p className="text-[15px] text-[#3F3F4A]">
                MagicWorks IT Solutions Pvt. Ltd.
                <br />
                Office 201, Vasant Bahawa, Bavdhan
                <br />
                Pune, Maharashtra 411021
              </p>
              <p className="text-[15px] text-[#3F3F4A] mt-2">
                <a href="tel:+919764566644" className="text-[#5B3FBE] no-underline hover:underline">+91 97645 66644</a>
              </p>
              <p className="text-[15px] text-[#3F3F4A] mt-1">
                <a href="mailto:sales@magicworksitsolutions.com" className="text-[#5B3FBE] no-underline hover:underline">sales@magicworksitsolutions.com</a>
              </p>
              <p className="text-[13px] text-[#9A9AA8] mt-3">
                Serving clients across India: Mumbai, Bangalore, Hyderabad, Delhi-NCR. Offshore: Europe & USA.
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=18.5195,73.7898"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-[#5B3FBE] font-semibold text-[13px] no-underline hover:underline"
              >
                Get directions →
              </a>
              <iframe
                title="MagicWorks IT Solutions office location"
                src="https://www.google.com/maps?q=18.5195,73.7898&z=15&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, marginTop: "16px", borderRadius: "10px" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#EDE9F7] py-20">
        <div className="max-w-[780px] mx-auto px-8">
          <hr className="gold-rule mb-6" />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-10">Frequently asked questions.</h2>
          <div className="article-faq flex flex-col gap-6">
            {contactFaq.map((f) => (
              <div key={f.q} className="border-b border-[#D8D8DE] pb-6">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mb-2">{f.q}</h3>
                <p className="text-[15px] text-[#3F3F4A] leading-[1.6]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
