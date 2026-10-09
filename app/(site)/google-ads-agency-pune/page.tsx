import type { Metadata } from "next";
import LandingPage, { type LandingConfig } from "@/components/landing/LandingPage";

const URL_PATH = "/google-ads-agency-pune";
const TITLE = "Best Google Ads Agency in Pune | MagicWorks";
const DESCRIPTION =
  "Get results-driven Google Ads in Pune with MagicWorks. We manage Search, Performance Max, Display & YouTube campaigns focused on qualified leads and ROI.";

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
  eyebrow: "Pillar 01 · Paid Search",
  h1: "Google Ads that bring you real customers.",
  lead:
    "Search, Performance Max, Display, and YouTube, with tracking set up properly from day one, so every rupee is accountable to a result.",
  ticks: [
    "Tracking and GTM live before a single rupee is spent",
    "Monthly reporting on spend, cost per lead, and return",
    "We respond to every enquiry within one working day",
  ],
  form: {
    title: "Get a free account review",
    subtitle: "Tell us where you're at. We respond within one working day.",
    cta: "Book a discovery call",
    sourcePage: URL_PATH,
    formName: "lp-google-ads-pune",
    pillar: "Digital Marketing",
    fields: [
      {
        name: "monthlyAdBudget",
        label: "Monthly ad budget",
        placeholder: "Monthly ad budget",
        options: [
          { value: "not-running", label: "Not running paid ads yet" },
          { value: "under-1l", label: "Under ₹1 lakh / month" },
          { value: "1l-5l", label: "₹1L to ₹5L / month" },
          { value: "5l-plus", label: "₹5 lakh+ / month" },
        ],
      },
    ],
  },
  sections: [
    {
      type: "icons",
      eyebrow: "What we help with",
      title: "Five things a properly run account should do for you.",
      items: [
        { icon: "bolt", title: "Qualified leads", text: "Traffic that converts, tracked from click to close." },
        { icon: "eye", title: "Visibility on Google", text: "Show up where buyers are already searching." },
        { icon: "chart", title: "Spend that scales", text: "Budget grows only when the math supports it." },
        { icon: "check", title: "Clean attribution", text: "Know exactly which channel drove which lead." },
        { icon: "doc", title: "Honest reporting", text: "A monthly report you can actually read and trust." },
      ],
    },
    {
      type: "badges",
      eyebrow: "Google Ads services we offer",
      title: "Every format, deployed where it earns its place.",
      intro:
        "Not every account needs every format. We choose the mix based on your budget, your buyer, and what the data says is actually working, not by defaulting to everything at once.",
      items: [
        { icon: "search", title: "Search Campaigns", text: "Show up when buyers are actively searching" },
        { icon: "bolt", title: "Performance Max", text: "Goal-based reach across Google's full network" },
        { icon: "display", title: "Display Campaigns", text: "Stay visible while buyers browse elsewhere" },
        { icon: "video", title: "YouTube Campaigns", text: "Paid video, run with the same accountability" },
        { icon: "check", title: "Tracking & GTM", text: "Set up before spend, not bolted on after" },
        { icon: "users", title: "Audience & Remarketing", text: "Built in from day one, not an afterthought" },
      ],
    },
    {
      type: "why",
      eyebrow: "Why MagicWorks",
      title: "No black-box reporting. No guessing which channel worked.",
      bullets: [
        "Tracking and GTM set up before a single rupee is spent",
        "Monthly reporting on spend, cost per lead, and return",
        "Commission tier available at ₹5L+ monthly spend",
        "We respond to every enquiry within one working day",
        "Performance Max used only where it earns its place",
        "No guaranteed CPL, just proper setup and steady improvement",
      ],
    },
    {
      type: "cards",
      eyebrow: "What's included",
      title: "Every engagement, set up the same disciplined way.",
      items: [
        { title: "Account structure & migration", text: "A rebuild or a fresh build, campaign by campaign." },
        { title: "Search, PMax & Display", text: "Deployed where each format earns its place." },
        { title: "YouTube campaigns", text: "Paid video, run with the same accountability." },
        { title: "Conversion tracking & GTM", text: "Set up before spend, not bolted on after." },
        { title: "Audience & remarketing", text: "Built in from day one, not an afterthought." },
        { title: "Landing-page guidance", text: "Offer and page feedback so clicks don't go to waste." },
      ],
    },
    {
      type: "process",
      eyebrow: "How we work",
      title: "From first call to first report, here is exactly what happens.",
      steps: [
        { title: "Discovery call", text: "You tell us your current Google Ads situation, honestly. We respond within one working day." },
        { title: "Structure & tracking", text: "Account rebuild or fresh build, with conversion tracking and GTM live before a single rupee is spent." },
        { title: "Campaigns go live", text: "Search, Performance Max, Display, and YouTube, deployed where each earns its place, not by default." },
        { title: "Monthly reporting", text: "A clear report on spend, cost per lead, and return, with steady improvement against your target." },
      ],
    },
    {
      type: "faq",
      eyebrow: "Common questions",
      title: "A few things people ask before booking.",
      items: [
        { q: "How is this priced?", a: "A monthly retainer, or the commission tier for confirmed spends of ₹5L+ with a twelve-month commitment." },
        { q: "How long before I see results?", a: "Campaigns generate data within days, but typically need 2 to 4 weeks to exit the learning phase and stabilise." },
        { q: "Do you guarantee a cost per lead?", a: "No. We commit to proper setup, honest reporting, and steady improvement against your target." },
        { q: "Do I need a new website first?", a: "Not necessarily. We give landing-page and offer guidance as part of every engagement." },
      ],
    },
  ],
  finalCta: {
    title: "Ready to see where your Google Ads budget is really going?",
    text: "Get a free account review. We will tell you honestly what is working, what is not, and what we would change first.",
    ticks: [
      "We respond within one working day",
      "Tracking set up before spend",
      "No guaranteed CPL, just honest reporting",
    ],
    button: "Get a free account review",
  },
  stickyLabel: "Free account review",
};

export default function GoogleAdsAgencyPunePage() {
  return <LandingPage config={config} />;
}
