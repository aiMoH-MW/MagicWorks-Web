import type { Metadata } from "next";
import LandingPage, { type LandingConfig } from "@/components/landing/LandingPage";

const URL_PATH = "/web-development-agency-pune";
const TITLE = "Best AI Website Development Company in Pune | MagicWorks";
const DESCRIPTION =
  "Get AI-native website development in Pune with MagicWorks. We build fast Next.js sites with built-in chat and smart search, live in 3 to 10 weeks.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    url: `https://magicworksitsolutions.com${URL_PATH}`,
    title: TITLE,
    description: DESCRIPTION,
  },
};

const config: LandingConfig = {
  eyebrow: "Pillar 02 · Execution",
  h1: "AI-native websites that compound brand and conversion.",
  lead:
    "From idea to live. A website built to generate enquiries, not just to look good. Every new build is AI-native by default: fast, intelligent, and hard for a competitor to copy without significant rework.",
  ticks: [
    "3 to 10 week build, clear scope agreed up front",
    "Next.js, built-in chat and smart search",
    "We respond to every enquiry within one working day",
  ],
  form: {
    title: "Start a project conversation",
    subtitle: "30 minutes to explore the fit. We respond within one working day.",
    cta: "Start a Project Conversation",
    sourcePage: URL_PATH,
    formName: "lp-web-development-pune",
    pillar: "Web Development",
    fields: [
      {
        name: "projectType",
        label: "Project type",
        placeholder: "Project type",
        options: [
          { value: "ai-native", label: "AI-native website (flagship)" },
          { value: "ecommerce", label: "E-commerce" },
          { value: "portal", label: "Portal or member site" },
          { value: "wordpress", label: "WordPress" },
          { value: "amc", label: "Web AMC (maintenance retainer)" },
          { value: "not-sure", label: "Not sure yet" },
        ],
      },
      {
        name: "timeline",
        label: "Timeline",
        placeholder: "Timeline",
        options: [
          { value: "exploring", label: "Just exploring for now" },
          { value: "asap", label: "ASAP, we have a deadline" },
          { value: "1-month", label: "1 month" },
          { value: "1-2-months", label: "1 to 2 months" },
          { value: "2-4-months", label: "2 to 4 months" },
        ],
      },
    ],
  },
  sections: [
    {
      type: "intro",
      eyebrow: "Why intelligence-first matters",
      title: "A chatbot bolted onto a template isn't the same thing as a site built around one.",
      paragraphs: [
        "Most \"AI-powered\" websites are a normal site with a chat widget dropped in afterward. It answers questions in a box in the corner, disconnected from the content, the search, and the forms around it. It works, in the way a sticky note works: technically there, easy to ignore.",
        "Built in from the start, the same intelligence can read the page the visitor is on, understand what they're actually looking for, and shape the next step around it, whether that's smarter search, a personalised layout, or a lead capture flow that asks better questions instead of a generic form. The difference isn't a feature list. It's whether the site behaves like it understands the visitor, or just has a widget that talks.",
      ],
      cards: [
        {
          title: "Harder to copy",
          text: "A competitor can clone a layout in an afternoon. Cloning a system that actually understands your content and your visitors takes real rework, not a screenshot.",
        },
        {
          title: "Compounds with content",
          text: "Every page you add makes the site's search and chat smarter, because they're reading the same content base, not a separate bolted-on index.",
        },
        {
          title: "Fails gracefully",
          text: "Built-in intelligence degrades to a normal, fast site if a feature is switched off. A bolted-on widget just breaks and sits there, visibly broken.",
        },
      ],
    },
    {
      type: "intro",
      eyebrow: "The brochure site problem",
      title: "A website that looks finished can still be losing you business every day.",
      tone: "dark",
      paragraphs: [
        "A common pattern: a site launches, looks good in the first demo, and then sits untouched for years while the business around it changes. Nobody notices it's underperforming, because nothing is visibly broken. It just quietly fails to generate the enquiries it should.",
      ],
      cards: [
        {
          title: "Looks done",
          text: "Polished design gets mistaken for a working revenue engine. The two are not the same thing.",
        },
        {
          title: "No feedback loop",
          text: "Without a way to see what visitors actually do, underperformance stays invisible until someone finally asks why leads are slow.",
        },
        {
          title: "Outgrown quietly",
          text: "The business changes, the site doesn't, and the gap between the two widens without a single obvious moment to notice it.",
        },
      ],
    },
    {
      type: "cards",
      eyebrow: "What we build",
      title: "One flagship stack, and the exceptions we still support.",
      items: [
        {
          label: "Flagship",
          title: "AI-Native Website",
          text: "Next.js front-end, LLM-backed backend, headless CMS. Embedded chat agents, intelligent search, content personalisation, and conversational lead capture. The default for all new builds.",
        },
        {
          label: "Execution",
          title: "E-Commerce",
          text: "AI-native commerce for ambitious roadmaps, or WooCommerce for simpler catalogues. Built around the buying journey, with an AMC tail.",
        },
        {
          label: "Execution",
          title: "Portals & Member Sites",
          text: "AI-native only, with authentication, role-based access, and at least one AI-assisted workflow as standard. Strategy for these sits in Platform Consultation.",
        },
        {
          label: "When right",
          title: "WordPress",
          text: "A curated plugin stack on managed hosting, for simple brochure sites or when you specifically require WordPress. Not the default.",
        },
        {
          label: "Ongoing",
          title: "Web AMC",
          text: "Ongoing maintenance for sites we built: uptime monitoring, security patches, content updates, and, for AI-native builds, LLM cost management.",
        },
      ],
    },
    {
      type: "process",
      eyebrow: "How a build runs",
      title: "Three stages. No surprises in between.",
      steps: [
        { title: "Discovery & scope", text: "Business goals, user journeys, and technical requirements. A clear scope in five working days." },
        { title: "Design & build", text: "Brand-aligned design, Next.js build, CMS setup, AI feature integration, QA and testing." },
        { title: "Launch & AMC", text: "Staged launch, handover, and an optional ongoing maintenance retainer." },
      ],
    },
    {
      type: "fit",
      eyebrow: "Who this is for",
      title: "We build for businesses serious about what a website should do.",
      goodLabel: "A strong fit",
      badLabel: "Not a fit",
      good: [
        "A business going through a relaunch, a rebrand, or a new business line, where the old site no longer fits.",
        "A founder, marketing head, or product leader who cares about performance and enquiry generation, not just aesthetics.",
        "Comfortable with a modern stack and willing to provide content, direction, and feedback at each stage.",
        "Planning to use the site as a genuine revenue engine, not a brochure that sits untouched for years.",
      ],
      bad: [
        "Wanting a cheap, fast site. Speed and price at the expense of quality produce a site that performs like one.",
        "Looking for someone to execute a finished brief with no questions. We will ask questions.",
        "Expecting Google rankings in 30 days from a fresh build.",
        "Needing the site to also run platform or marketplace logic, which sits in Platform Consultation.",
      ],
    },
    {
      type: "faq",
      eyebrow: "Common questions",
      title: "A few things people ask before building.",
      items: [
        { q: "What is an AI-native website?", a: "A site built on a modern stack, Next.js with an LLM-backed backend and a headless CMS, with intelligent features like chat, smart search, personalisation, and conversational lead capture built in from the start, not added later." },
        { q: "Do you still build WordPress sites?", a: "Yes, when it's genuinely the right tool: a simple brochure site, or when you specifically require WordPress. AI-native is our default for everything else." },
        { q: "How long does a website take?", a: "Typically 3 to 10 weeks from kick-off to launch, depending on scope." },
        { q: "Do you maintain the site after launch?", a: "Yes, through an optional Web AMC retainer covering monitoring, security, content updates, and, for AI-native sites, LLM cost management." },
      ],
    },
  ],
  finalCta: {
    title: "Ready to build a site that actually generates business?",
    text: "The right trigger is a relaunch, a rebrand, or a new business line. Thirty minutes to explore the fit.",
    ticks: [
      "We respond within one working day",
      "3 to 10 week build, clear scope agreed up front",
      "AI-native by default",
    ],
    button: "Start a Project Conversation",
  },
  stickyLabel: "Start a project",
};

export default function WebDevelopmentAgencyPunePage() {
  return <LandingPage config={config} />;
}
