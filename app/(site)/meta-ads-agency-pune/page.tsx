import type { Metadata } from "next";
import LandingPage, { type LandingConfig } from "@/components/landing/LandingPage";

const URL_PATH = "/meta-ads-agency-pune";
const TITLE = "Best Meta Ads Agency in Pune | MagicWorks";
const DESCRIPTION =
  "Get results-driven Meta Ads services in Pune with MagicWorks. We manage Facebook & Instagram campaigns with creative testing for qualified leads and ROI.";

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
  eyebrow: "Pillar 01 · Paid Social",
  h1: "Demand and discovery on Facebook and Instagram.",
  lead:
    "Meta is where buyers discover before they search. Creative variants, audience automation, and a rhythm that keeps working, not a single boosted post, a real ongoing strategy.",
  ticks: [
    "Multiple creative variants per campaign, tested and iterated",
    "Retargeting built in, not an optional add-on",
    "We respond to every enquiry within one working day",
  ],
  form: {
    title: "Get a free Meta strategy call",
    subtitle: "Tell us about your buyers and budget. We respond within one working day.",
    cta: "Book a discovery call",
    sourcePage: URL_PATH,
    formName: "lp-meta-ads-pune",
    pillar: "Digital Marketing",
    fields: [
      {
        name: "serviceInterest",
        label: "Service interest",
        placeholder: "What are you looking for?",
        options: [
          { value: "meta-ads", label: "Meta Ads" },
          { value: "not-sure", label: "Not sure yet" },
        ],
      },
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
      type: "intro",
      eyebrow: "Why it matters",
      title: "One creative and a default audience is not a Meta strategy. It's a boosted post.",
      paragraphs: [
        "Meta's algorithm rewards accounts that give it real signal to work with: multiple creative angles to test, and audiences that get sharper over time. Most accounts give it neither, then wonder why costs climb.",
      ],
      cards: [
        {
          title: "Creative variety",
          text: "Multiple angles, tested against each other, not one asset run until it fatigues. Different hooks, formats, and messages give the algorithm room to find what actually works for your audience, instead of guessing with a single creative.",
        },
        {
          title: "Audience signal",
          text: "Automation that sharpens over time, built on real conversion signal. Left on default targeting, Meta spends broad. Given proper signal and retargeting structure, it narrows toward who actually converts.",
        },
        {
          title: "A rhythm that lasts",
          text: "A creative rhythm, not a one-time asset. New variants keep arriving, so performance does not quietly decay once the first creative tires out.",
        },
      ],
    },
    {
      type: "icons",
      eyebrow: "What we help with",
      title: "Five things a properly run Meta account should do for you.",
      items: [
        { icon: "megaphone", title: "Brand awareness", text: "Get seen by buyers before they start searching." },
        { icon: "target", title: "The right audience", text: "Automation finds and refines who actually converts." },
        { icon: "repeat", title: "Retargeting", text: "Bring back visitors who didn't convert the first time." },
        { icon: "palette", title: "Creative that's tested", text: "Multiple variants, iterated on real performance." },
        { icon: "doc", title: "Honest reporting", text: "A monthly report you can actually read and trust." },
      ],
    },
    {
      type: "badges",
      eyebrow: "Meta Ads services we offer",
      title: "Built around the buyer journey, not the platform defaults.",
      intro:
        "A creative-first approach, with proper audience architecture underneath it, not just boosted posts.",
      items: [
        { icon: "bulb", title: "Campaign Strategy", text: "Structure built around your buyer, not a template" },
        { icon: "palette", title: "Creative Variants & Testing", text: "Multiple versions, tested against each other" },
        { icon: "target", title: "Audience Building & Automation", text: "Automated refinement toward who converts" },
        { icon: "repeat", title: "Retargeting Campaigns", text: "Built in, not an optional add-on" },
        { icon: "users", title: "Organic FB & IG Support", text: "Included as a supporting deliverable" },
        { icon: "doc", title: "Monthly Reporting", text: "Clear, honest, and actually readable" },
      ],
    },
    {
      type: "why",
      eyebrow: "Why MagicWorks",
      title: "A creative rhythm, not a one-time asset.",
      bullets: [
        "Multiple creative variants per campaign, tested and iterated",
        "Organic Instagram & Facebook content included, not billed separately",
        "Audience automation that sharpens toward real conversion signal",
        "We respond to every enquiry within one working day",
        "Retargeting built in, not an optional add-on",
        "Transparent attribution, honest monthly reporting",
      ],
    },
    {
      type: "cards",
      eyebrow: "What's included",
      title: "Every engagement, set up the same disciplined way.",
      items: [
        { title: "Campaign strategy & structure", text: "Built around your buyer's journey, not a template." },
        { title: "Creative variants & testing", text: "A rhythm of new creative, not a one-time asset." },
        { title: "Audience building & automation", text: "Continuously refined toward who actually converts." },
        { title: "Retargeting campaigns", text: "Bring back visitors who didn't convert the first time." },
        { title: "Organic FB & IG support", text: "Included as part of the engagement, not billed extra." },
        { title: "Monthly performance reporting", text: "Spend, results, and next steps, laid out clearly." },
      ],
    },
    {
      type: "process",
      eyebrow: "How we work",
      title: "From first call to first report, here is exactly what happens.",
      steps: [
        { title: "Discovery call", text: "Tell us about your buyers and budget. We respond within one working day." },
        { title: "Strategy & creative", text: "Campaign structure built, first creative variants produced." },
        { title: "Campaigns go live", text: "Audiences, retargeting, and creative tests all running together." },
        { title: "Monthly reporting", text: "What worked, what didn't, and what's next, every month." },
      ],
    },
    {
      type: "faq",
      eyebrow: "Common questions",
      title: "A few things people ask before booking.",
      items: [
        { q: "Do you also handle organic social?", a: "Organic Instagram and Facebook content is included as a supporting deliverable." },
        { q: "How does audience targeting improve over time?", a: "Retargeting and conversion signal feed the algorithm, so audiences sharpen the longer a campaign runs, not just from manual adjustments." },
        { q: "How much creative do you produce?", a: "Multiple variants per campaign, tested and iterated on performance. A creative rhythm, not a one-time asset." },
        { q: "Do you guarantee results?", a: "No. We commit to proper strategy, honest reporting, and steady improvement, not a guaranteed number." },
      ],
    },
  ],
  finalCta: {
    title: "Ready to turn Facebook and Instagram into a real lead channel?",
    text: "Book a free Meta strategy call. We will walk through your buyers, your budget, and the first creative angles we would test.",
    ticks: [
      "We respond within one working day",
      "Creative testing and retargeting built in",
      "Honest monthly reporting",
    ],
    button: "Get a free Meta strategy call",
  },
  stickyLabel: "Free strategy call",
};

export default function MetaAdsAgencyPunePage() {
  return <LandingPage config={config} />;
}
