// One-off script: create (or update, if it already exists) the "Mohan Chute"
// teamMember/author record in Sanity. Run locally with:
//   node scripts/create-author-mohan-chute.mjs
// (Requires .env.local with SANITY_API_TOKEN — this sandbox has no network
// access to api.sanity.io, so this must be run on your own machine.)

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const envLines = readFileSync(resolve(process.cwd(), ".env.local"), "utf8").split("\n");
for (const line of envLines) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}

const client = createClient({
  projectId: "wa86etuq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const AUTHOR_ID = "author-mohan-chute";

async function main() {
  const existing = await client.fetch(
    `*[_type == "teamMember" && (slug.current == "mohan-chute" || name == "Mohan Chute")][0]{ _id, name }`
  );

  if (existing) {
    console.log(`Already exists: ${existing.name} (${existing._id}) — updating LinkedIn URL just in case.`);
    await client
      .patch(existing._id)
      .set({ linkedin: "https://www.linkedin.com/in/mohanchute/" })
      .commit();
    console.log("Updated.");
    return;
  }

  const doc = {
    _id: AUTHOR_ID,
    _type: "teamMember",
    name: "Mohan Chute",
    slug: { _type: "slug", current: "mohan-chute" },
    role: "Founder, MagicWorks IT Solutions",
    bio: "Founder of MagicWorks IT Solutions, with 17+ years across digital marketing, web strategy, and AI. He writes from inside live client engagements, not theory.",
    linkedin: "https://www.linkedin.com/in/mohanchute/",
    isFounder: true,
    order: 1,
  };

  const created = await client.createIfNotExists(doc);
  console.log("Created:", created._id, created.name);
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
