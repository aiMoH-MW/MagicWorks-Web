/**
 * Unpublish case studies from Sanity — keep only the 3 approved ones.
 *
 * Run from the project root:
 *   node scripts/unpublish-casestudies.mjs
 */

import { createClient } from "@sanity/client";

const KEEP_SLUGS = new Set([
  "simplidistance-mba-enrollments",
  "srj-steel-b2b-digital-presence",
  "trexova-wellness-tourism-pipeline",
]);

const client = createClient({
  projectId: "wa86etuq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("ERROR: SANITY_API_TOKEN env var not set.");
    console.error("Run: $env:SANITY_API_TOKEN='<token>' ; node scripts/unpublish-casestudies.mjs");
    process.exit(1);
  }

  // Query only published docs (no drafts. prefix)
  const docs = await client.fetch(
    `*[_type == "caseStudy" && !(_id in path("drafts.**"))]{_id, "slug": slug.current, title}`
  );

  console.log(`Found ${docs.length} published case study/studies:\n`);
  docs.forEach((d) => console.log(` - ${d._id}  |  ${d.slug}  |  ${d.title}`));

  const toUnpublish = docs.filter((d) => !KEEP_SLUGS.has(d.slug));

  if (toUnpublish.length === 0) {
    console.log("\nNothing to unpublish — all published docs are in the keep list.");
    return;
  }

  console.log(`\nWill UNPUBLISH ${toUnpublish.length} document(s):`);
  toUnpublish.forEach((d) => console.log(` - ${d._id}  |  ${d.slug}`));
  console.log("");

  for (const doc of toUnpublish) {
    // Unpublish = ensure a draft exists (copy from published), then delete published
    const draftId = "drafts." + doc._id;

    // Check if a draft already exists
    const existingDraft = await client.fetch(`*[_id == $id][0]`, { id: draftId });

    if (!existingDraft) {
      // Fetch full published doc and create draft
      const fullDoc = await client.getDocument(doc._id);
      if (fullDoc) {
        const { _id, _rev, ...rest } = fullDoc;
        await client.createOrReplace({ ...rest, _id: draftId });
        console.log(`  Created draft for ${doc._id}`);
      }
    }

    // Delete published version
    await client.delete(doc._id);
    console.log(`  Unpublished: ${doc.slug} (${doc._id})`);
  }

  console.log("\nDone. Kept:");
  KEEP_SLUGS.forEach((s) => console.log(` + ${s}`));
}

main().catch((err) => {
  console.error("Script failed:", err.message);
  process.exit(1);
});
