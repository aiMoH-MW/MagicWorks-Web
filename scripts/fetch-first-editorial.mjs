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

// Get full Swapnil blog to study writing style/depth
const swapnil = await client.fetch(
  `*[_type == "insight" && slug.current == "real-cost-of-ai-indian-marketing-sales-2026"][0]{
    title, excerpt, body
  }`
);

// Print all text content from Swapnil blog
console.log("=== SWAPNIL BLOG FULL TEXT ===\n");
for (const block of swapnil.body) {
  if (block._type === "block") {
    const text = block.children?.map(c => c.text).join("") || "";
    const prefix = block.style === "h2" ? "## " : block.style === "h3" ? "### " : "";
    if (text.trim()) console.log(prefix + text);
  } else if (block._type === "statRow") {
    console.log("[STATS: " + block.stats?.map(s => `${s.value} — ${s.label}`).join(" | ") + "]");
  } else if (block._type === "callout") {
    console.log(`[CALLOUT ${block.variant}: ${block.title} — ${block.body}]`);
  } else if (block._type === "pullquote") {
    console.log(`[PULLQUOTE: ${block.text}]`);
  }
  console.log();
}

// Get first Editorial Team blog full content
const first = await client.fetch(
  `*[_type == "insight" && slug.current == "9-essential-steps-to-start-your-online-business"][0]{
    _id, title, excerpt, category, categories, publishedAt, tags, seoTitle, body
  }`
);
console.log("\n\n=== FIRST EDITORIAL BLOG ===");
console.log("ID:", first._id);
console.log("Title:", first.title);
console.log("Excerpt:", first.excerpt);
console.log("SEO Title:", first.seoTitle);
console.log("Tags:", first.tags);
console.log("Categories:", first.category, first.categories);
console.log("\n--- CURRENT BODY ---\n");
for (const block of first.body) {
  if (block._type === "block") {
    const text = block.children?.map(c => c.text).join("") || "";
    const prefix = block.style === "h2" ? "## " : block.style === "h3" ? "### " : "";
    if (text.trim()) console.log(prefix + text + "\n");
  }
}
