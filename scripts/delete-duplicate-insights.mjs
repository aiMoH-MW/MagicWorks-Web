import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually since this runs outside Next.js
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

// Old insight-wp-* docs that have newer blog-* replacements
const toDelete = [
  "insight-wp-995389", // "Why Indian B2B Companies Spend More..." → kept: blog-indian-b2b-marketing-strategy-gap
  "insight-wp-996119", // "Why Pune Businesses Are Choosing AI-Powered..." → kept: blog-pune-ai-social-media-2026
  "insight-wp-995490", // "Why Businesses Are Choosing AI-Powered..." → kept: blog-ai-social-media-vs-traditional-2026
  "insight-wp-996019", // "Why Choosing the Right Social Media Marketing Company in Pune..." → kept: blog-social-media-marketing-company-pune-2026
];

for (const id of toDelete) {
  const doc = await client.fetch(`*[_id == $id][0]{_id, title, "slug": slug.current}`, { id });
  if (!doc) { console.log(`NOT FOUND: ${id}`); continue; }
  console.log(`Deleting: ${id}`);
  console.log(`  title: ${doc.title}`);
  console.log(`  slug:  ${doc.slug}`);
  await client.delete(id);
  console.log(`  ✓ deleted\n`);
}

console.log("Done.");
