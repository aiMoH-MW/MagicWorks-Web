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

// Only these 4 keep Swapnil Ughade
const swapnilIds = new Set([
  "insight-wp-996538", // The Real Cost of AI in Indian Marketing and Sales
  "insight-wp-996345", // The CEO's Framework for AI Investment Decisions
  "insight-wp-995945", // Google AI Overviews & AI Max in India
  "insight-wp-995440", // GEO for Indian Businesses
]);

const EDITORIAL_ID = "team-member-editorial-team";

// Step 1: Rename to "MagicWorks Editorial Team"
console.log("Step 1: Renaming Editorial Team → MagicWorks Editorial Team...");
await client.patch(EDITORIAL_ID).set({ name: "MagicWorks Editorial Team" }).commit();
console.log("  ✓ renamed\n");

// Step 2: Fetch all insights
const insights = await client.fetch(`*[_type == "insight"] { _id, title, "authorId": author._ref }`);
console.log(`Step 2: Assigning MagicWorks Editorial Team to ${insights.length - swapnilIds.size} articles...\n`);

for (const insight of insights) {
  if (swapnilIds.has(insight._id)) {
    console.log(`  KEEP Swapnil: ${insight._id} | ${insight.title?.slice(0, 60)}`);
    continue;
  }
  await client
    .patch(insight._id)
    .set({ author: { _type: "reference", _ref: EDITORIAL_ID } })
    .commit();
  console.log(`  ✓ assigned editorial: ${insight._id} | ${insight.title?.slice(0, 60)}`);
}

console.log("\nDone.");
