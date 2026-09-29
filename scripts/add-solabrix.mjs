// Load .env.local (plain `node` does not auto-load it)
import { readFileSync, createReadStream, existsSync } from "fs";
import { resolve } from "path";
try {
  const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx < 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (key && !(key in process.env)) process.env[key] = val;
  }
} catch { /* .env.local not found — rely on existing env */ }

/**
 * Seed script: Solabrix case study
 * Run from magicworks-web/ root: node scripts/add-solabrix.mjs
 *
 * Source: Docs/Case Study/Solabrix_Case_Study.html (4-week Strategic Foundation
 * Sprint, Aug 2026). No client-supplied cover image or testimonial existed in
 * the source, so this uses a plain on-brand generated cover graphic and omits
 * the testimonial field rather than fabricating either.
 *
 * Note: the source explicitly labels its 3-year revenue/LTV/CAC/payback figures
 * as "management planning assumptions, not historical performance or guarantees
 * of future results" — this script only surfaces concrete, delivered-scope facts
 * (deliverable count, keyword count, workstreams, timeline) as headline metrics,
 * not the modelled financial projections.
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wa86etuq",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const COVER_IMAGE_PATH = resolve(process.cwd(), "scripts/media/solabrix-cover.png");

async function main() {
  if (!existsSync(COVER_IMAGE_PATH)) {
    console.error(`❌  Cover image not found: ${COVER_IMAGE_PATH}`);
    console.error("    Copy solabrix-cover.png into scripts/media/ first.");
    process.exit(1);
  }

  console.log("📤  Uploading cover image…");
  const asset = await client.assets.upload("image", createReadStream(COVER_IMAGE_PATH), {
    filename: "solabrix-cover.png",
  });
  console.log(`✅  Image uploaded: ${asset._id}`);

  const doc = {
    _type: "caseStudy",
    _id: "solabrix-case-study",
    title: "How Solabrix Built Its Go-to-Market Foundation in a 4-Week Sprint",
    slug: { _type: "slug", current: "solabrix-strategic-foundation-sprint" },
    client: "Solabrix Technologies Pvt Ltd",
    clientUrl: "https://solabrix.com",
    heroMetric: "17",
    heroMetricLabel: "deliverables shipped across a 4-week foundation sprint",
    industry: "other",
    pillar: "platform-consultation",
    featured: false,
    publishedAt: new Date().toISOString(),

    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: "Solabrix — Managed Solar Care Platform, Strategic Foundation Sprint",
    },

    situation:
      "Solabrix is a managed solar-care platform serving rooftop solar plant owners across Maharashtra, offering annual maintenance, module washing, earthing top-ups, health checks, and plant upgrades, alongside a distinctive acquisition mechanic called the Solar Generation Championship. When founder Prashant Karhade engaged MagicWorks in late July 2026, the platform was live at version 2.5 but lacked a connected foundation across positioning, go-to-market sequencing, search visibility, unit economics, and fundraise readiness ahead of a planned staging launch.",

    intervention:
      "MagicWorks ran a 4-week Strategic Foundation Sprint across 10 workstreams: Week 1 established the business model, unit economics, ICPs, and brand foundation strategy. Week 2 built brand guidelines, a production design system, a 3,097-keyword search universe, IA, technical SEO, and a GEO/AEO playbook. Week 3 designed the hyperlocal go-to-market plan, the service-partner operating model, pricing and gamification economics, and a measurement framework. Week 4 produced 3-year revenue scenarios, a fundraise-readiness pack, a phased roadmap, and an executive readout — spanning Platform Strategy, Brand Strategy, GTM, SEO/AEO/GEO, Unit Economics, Operating Model, and Fundraise Readiness.",

    result:
      "The sprint repositioned Solabrix from a marketplace framing to a managed-care platform, anchored around a loss-aversion-driven acquisition wedge (the Solar Generation Championship) and a taste-distribution-trust moat thesis for the long-term owner relationship. Delivered outputs included a production-ready design system, the 3,097-keyword search architecture, a locked hyperlocal GTM plan starting in West Pune (Bawdhan, Kothrud, Warje, Karvenagar, Erandwane) with Nashik queued for Year 2, an asset-light service-partner operating model, a three-scenario financial model, and a fundraise-ready pack for a seed round targeted by December 2026. Revenue, CAC, LTV, and break-even figures produced in this engagement are management planning assumptions, not historical performance.",

    metrics: [
      { _key: "sb1", value: "17", label: "Deliverables across the sprint" },
      { _key: "sb2", value: "10", label: "Workstreams, brand to fundraise readiness" },
      { _key: "sb3", value: "3,097", label: "Keywords mapped into the search architecture" },
      { _key: "sb4", value: "4", label: "Weeks from kickoff to executive readout" },
    ],
  };

  console.log("Creating Solabrix case study...");
  try {
    const result = await client.createOrReplace(doc);
    console.log("Document created:", result._id);

    console.log("\nDone. The case study is live at:");
    console.log("https://magicworksitsolutions.com/work/solabrix-strategic-foundation-sprint");
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

main();
