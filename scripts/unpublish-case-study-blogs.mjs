import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
const envLines = readFileSync(envPath, "utf8").split("\n");
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

// Titles to unpublish (from user screenshots)
const titlePatterns = [
  "Retail Digital Marketing Case Study for Regional Retail Chain",
  "SaaS Digital Marketing Case Study for B2B Enterprise Software Company",
  "Ecommerce Digital Marketing Case Study for D2C Lifestyle Brand",
  "Healthcare Digital Marketing Case Study for a Multi-Specialty Hospital",
  "Construction Digital Marketing Case Study for Commercial",
  "Digital Marketing Case Study for Education Institute",
  "Hospitality Digital Marketing Case Study for Boutique Hotel",
  "B2B Digital Marketing Case Study for Steel Manufacturer",
  "Digital Marketing Case Study for CA, Consultancy",
];

// Find matching published documents
const docs = await client.fetch(
  `*[_type == "insight"] { _id, title, "slug": slug.current }`
);

const toDelete = docs.filter((doc) =>
  titlePatterns.some((pattern) =>
    doc.title?.toLowerCase().includes(pattern.toLowerCase().slice(0, 40))
  )
);

if (toDelete.length === 0) {
  console.log("No matching documents found.");
  process.exit(0);
}

console.log(`Found ${toDelete.length} documents to delete:\n`);
for (const doc of toDelete) {
  console.log(`  • [${doc._id}] ${doc.title}`);
}

console.log("\nDeleting...");
for (const doc of toDelete) {
  // Delete published version
  await client.delete(doc._id);
  // Also delete draft version if it exists
  try { await client.delete(`drafts.${doc._id}`); } catch {}
  console.log(`  ✓ Deleted: ${doc.title}`);
}

console.log("\nDone.");
