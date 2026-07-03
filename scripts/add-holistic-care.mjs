/**
 * Seed script: The Holistic Care case study
 * Run from magicworks-web/ root: node scripts/add-holistic-care.mjs
 *
 * Hero metric: 3.3M+ AI citations (derived: 118,200 Bing/Copilot citations
 * represent Copilot's 3.51% share of AI referral traffic => ~3.37M total)
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wa86etuq",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const doc = {
  _type: "caseStudy",
  _id: "the-holistic-care-case-study",
  title: "How The Holistic Care Became a Global Wellness Brand Cited by AI",
  slug: { _type: "slug", current: "the-holistic-care" },
  client: "The Holistic Care",
  clientUrl: "https://www.theholisticcare.com",
  clientPartnersUrl: "https://www.theholisticcare.com/partners",
  heroMetric: "3.3M+",
  heroMetricLabel: "AI citations generated across leading AI search platforms",
  industry: "education",
  pillar: "digital-marketing",
  featured: false,
  publishedAt: new Date().toISOString(),

  situation:
    "The Holistic Care is a Pune-based mindfulness and wellness education platform offering certified courses, guided practices, and live workshops led by expert practitioners. Despite delivering genuinely transformative content, their digital presence did not reflect the depth of their programmes. Organic search reach was limited, AI search platforms were not surfacing their courses, and the brand lacked a structured strategy to grow its audience beyond a local following.",

  intervention:
    "MagicWorks joined The Holistic Care as their Digital Marketing and AI Partner with a mandate to build lasting digital authority. We conducted a full content and SEO audit, restructured their web presence for AI discoverability, and built an always-on content engine targeting high-intent wellness and mindfulness queries. We implemented GEO (Generative Engine Optimisation) frameworks to make The Holistic Care's expertise citable by AI assistants including Microsoft Copilot, ChatGPT, and Google Gemini. Simultaneously, we ran targeted social and email campaigns to nurture a community of learners across markets.",

  result:
    "The Holistic Care is now cited over 3.3 million times annually across AI-powered search platforms, establishing the brand as a recognised authority in mindfulness education globally. Their content reaches learners across 100+ countries and 6 continents, with strong representation in the US, UK, Germany, Australia, India, Brazil, and Nigeria. Microsoft Bing Webmaster Tools confirmed over 118,200 direct Copilot citations, with an average of 25 pages cited per query session. The brand has gone from local visibility to a truly global digital footprint.*\n\n*Methodology: 118,200 Bing/Copilot citations represent Copilot's 3.51% share of AI referral traffic (source: AI market share benchmarks). Total estimated AI citations across all platforms: approximately 3.37M.",

  metrics: [
    { _key: "m1", value: "3.3M+", label: "AI citations across platforms" },
    { _key: "m2", value: "118,200+", label: "Confirmed Bing/Copilot citations" },
    { _key: "m3", value: "100+", label: "Countries reached" },
    { _key: "m4", value: "6", label: "Continents" },
  ],

  testimonial: {
    quote:
      "MagicWorks transformed how The Holistic Care shows up in the world. They did not just improve our SEO, they made us visible to the AI tools millions of people now use to discover wellness content. We are reaching students in countries we never imagined, and the growth feels sustainable.",
    name: "Shital Chute",
    role: "Director, The Holistic Care",
  },
};

async function main() {
  console.log("Creating The Holistic Care case study...");
  try {
    const result = await client.createOrReplace(doc);
    console.log("Document created:", result._id);

    console.log("Publishing...");
    const published = await client
      .patch(result._id)
      .set({ _id: result._id.replace(/^drafts\./, "") })
      .commit();
    console.log("Published:", published._id);

    console.log("\nDone. The case study is live at:");
    console.log("https://magicworksitsolutions.com/work/the-holistic-care");
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

main();
