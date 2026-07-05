import type { Metadata } from "next";
import Link from "next/link";
import WebDevelopmentContactForm from "../WebDevelopmentContactForm";

export const metadata: Metadata = {
  title: "Portals and Member Sites",
  description:
    "Custom portals and member sites for Indian businesses: authentication, role-based access, and at least one AI-assisted workflow as standard. AI-native as the default, not an add-on.",
  alternates: { canonical: "/services/web-development/portals-member-sites" },
};

const included = [
  { icon: "🔒", title: "Authentication and access control", body: "Secure login, user roles, and permissions built in from day one. Users see exactly what they should and nothing they should not.", gold: false },
  { icon: "🤖", title: "AI-assisted workflow as standard", body: "Every build includes at least one AI-powered workflow: an assistant, intelligent search, or automated processing. Built in, not bolted on.", gold: false },
  { icon: "📊", title: "Dashboard and data views", body: "Clean, useful dashboards that surface the information each user role actually needs. Designed for comprehension, not decoration.", gold: false },
  { icon: "📱", title: "Mobile-first, fast, accessible", body: "Responsive on every device, tested on real Indian mobile connections, and accessible by default. No performance compromises.", gold: false },
  { icon: "📄", title: "Headless CMS and content model", body: "A CMS your team can actually use to manage content, listings, or records without calling a developer every time.", gold: false },
  { icon: "🔧", title: "AMC and LLM cost management", body: "Optional post-launch maintenance that includes security, uptime, content updates, and managing the AI component costs.", gold: true },
];

const aiList = [
  "Conversational assistant that answers queries and captures leads",
  "Intelligent search across your portal content and data",
  "Automated summarising or processing of incoming information",
  "Personalised content or recommendations per user role",
  "LLM cost monitoring built into the AMC from day one",
];

const useCases = [
  { title: "Lead management portals", body: "For sales teams and agents: real-time lead intake, assignment, status tracking, and an AI assistant for quick follow-up and qualification." },
  { title: "B2B client portals", body: "A private space for your clients to access reports, documents, and project updates, with role-based views so each client sees only what is theirs." },
  { title: "Member and subscription sites", body: "Content, community, or resource access gated behind a membership, with automated onboarding and a smart content assistant." },
  { title: "Booking and scheduling platforms", body: "Provider and user sides, availability management, confirmation flows, and an assistant that handles common booking questions around the clock." },
  { title: "Internal dashboards", body: "Operational visibility for your team: aggregated data from multiple sources, role-based access, and AI-powered summaries that surface what matters." },
  { title: "Educational and community platforms", body: "Cohort or self-paced learning, content delivery, and progress tracking, with an AI tutor or assistant as a standard component." },
];

const steps = [
  { n: "01", t: "Discovery and brief", d: "You complete our discovery questionnaire. We review it, then meet to agree scope, user roles, workflows, and the AI components that will genuinely help." },
  { n: "02", t: "Architecture and design", d: "We design the data model, user flows, and UI. The AI architecture is agreed at this stage, not at the end. You review and approve before build starts." },
  { n: "03", t: "Build and integrate", d: "Next.js front end, LLM-backed services, headless CMS, and authentication built in parallel. Regular reviews keep you close to the work." },
  { n: "04", t: "Test, launch, and hand over", d: "Staging review, real-device and user-role testing, then launch. We hand over with documentation and an optional AMC to keep it running well." },
];

const faq = [
  { q: "What makes a MagicWorks portal AI-native?", a: "Every portal we build from FY2026 onward includes authentication and role-based access as standard, plus at least one AI-assisted workflow: an assistant that answers questions and captures leads, intelligent search across your content, or automated processing of incoming data. AI is built in from architecture, not bolted on later." },
  { q: "What kind of portals do you build?", a: "Lead management portals, B2B client portals, booking and scheduling platforms, internal dashboards, member and subscription sites, and educational or community platforms. If users need to log in and do something, we can build it." },
  { q: "How do I get started?", a: "Every portal engagement starts with a discovery questionnaire, which helps us understand your users, workflows, and data before we talk. Fill in the form on this page and we will send it to you." },
  { q: "How long does a portal build take?", a: "Typically eight to sixteen weeks from signed brief to launch, depending on scope and the number of user roles and AI workflows involved. We will confirm a timeline in the proposal." },
  { q: "Do you offer ongoing support after launch?", a: "Yes. We offer a Web AMC that covers uptime monitoring, security patches, content updates, and LLM cost management for the AI components. It is offered as an optional retainer after every portal build." },
];

const related = [
  { name: "AI-Native Websites", href: "/services/web-development/ai-native-websites", desc: "Our default: Next.js, LLM backend, headless CMS." },
  { name: "Platform Consultation", href: "/services/platform-consultation", desc: "Strategy, vendor selection, and architecture for complex platforms." },
  { name: "Web AMC", href: "/services/web-development/maintenance-amc", desc: "Post-launch monitoring, security, and AI cost management." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/web-development/portals-member-sites#service",
  name: "Portals and Member Sites",
  description: "Custom portals and member sites for Indian businesses, AI-native as standard, with authentication, role-based access, and at least one AI-assisted workflow built in.",
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
    { "@type": "ListItem", position: 4, name: "Portals and Member Sites", item: "https://magicworksitsolutions.com/services/web-development/portals-member-sites" },
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

export default function PortalsMemberSitesPage() {
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
            <span className="text-[#F7F3EA]">Portals and Member Sites</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Web Development · Pillar 02</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,54px)] leading-[1.08] text-[#F7F3EA] max-w-[780px]">
            Portals and Member Sites
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-8">
            AI-native portals with authentication, role-based access, and at least one AI-assisted workflow built in as standard. Not a login page bolted onto a website.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {["AI-native as standard", "8 to 16 weeks delivery", "Founders and product heads", "AMC available post-launch"].map((pill) => (
              <span key={pill} className="text-[13px] font-semibold text-[#F7F3EA] bg-white/10 border border-white/20 rounded-full px-4 py-2">{pill}</span>
            ))}
          </div>
          <div className="flex gap-4 flex-wrap">
            <a href="#web-enquiry" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Start with a discovery call
            </a>
            <Link href="/services/web-development" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              Back to Web Development
            </Link>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-3">What you get</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">
              Everything a portal needs. Nothing it does not.
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

      {/* AI-native band */}
      <section className="bg-[#2A1B5C] py-24 relative overflow-hidden">
        <svg className="absolute left-[-180px] top-[-140px] w-[500px] h-[500px] pointer-events-none opacity-40" aria-hidden="true">
          {[100, 170, 240].map((r, i) => (
            <circle key={r} cx="250" cy="250" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.6 : 0.35} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow text-[#D4A537] mb-4">Why AI-native matters</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#F7F3EA] mb-5">
              AI is the architecture, not a feature you add later.
            </h2>
            <p className="text-[16px] text-[#C8B8FF] leading-[1.65] mb-4">
              A portal with AI tacked on after build is a different, worse thing from a portal designed for it from the start. We build the data model, the infrastructure, and the user experience around AI from the brief, not the other way round.
            </p>
            <p className="text-[16px] text-[#C8B8FF] leading-[1.65]">
              That means the AI is faster, more accurate, and genuinely useful to your users, rather than a slow chatbot sitting awkwardly in a corner.
            </p>
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#C8B8FF] mb-5">What AI-native typically includes</p>
            <ul>
              {aiList.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3 border-t border-white/10 first:border-0 list-none">
                  <span className="mt-[8px] flex-shrink-0 w-[10px] h-[10px] rounded-full bg-[#D4A537]" />
                  <span className="text-[15px] text-[#F7F3EA]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-white py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-3">What we build</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">
              Portals for a range of business needs.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {useCases.map((uc) => (
              <div key={uc.title} className="bg-[#F7F3EA] border border-[#D8D8DE] border-l-4 border-l-[#5B3FBE] rounded-[10px] px-7 py-6">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mb-2">{uc.title}</h3>
                <p className="text-[14px] text-[#3F3F4A] leading-[1.6]">{uc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-3">How we work</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-4">
              From discovery to live in a disciplined sequence.
            </h2>
            <p className="text-[16px] text-[#3F3F4A] leading-[1.6]">
              Every portal engagement starts with a questionnaire, not a sales call. We need to understand your users and workflows before we can build anything worth building.
            </p>
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
              Founders, marketing heads, and product leaders who need users to log in and do something, whether that is submitting a lead, accessing a resource, booking a service, or managing a workflow. If your current answer is a spreadsheet, a WhatsApp group, or a generic SaaS tool that never quite fits, a custom portal is the next step.
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
                Tell us what you are building.
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                Every portal engagement begins with a short discovery questionnaire. Fill in your details and we will send it to you, so our first conversation is a useful one rather than a cold introduction.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Discovery questionnaire sent on reply</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>AI-native as standard from FY2026</li>
              </ul>
            </div>
            <WebDevelopmentContactForm
              sourcePage="/services/web-development/portals-member-sites"
              defaultProject="Portal or member site"
            />
          </div>
        </div>
      </section>
    </>
  );
}
