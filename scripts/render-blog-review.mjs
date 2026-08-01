/**
 * render-blog-review.mjs — renders blog-6..10 Portable Text JSON into readable
 * Markdown for human review BEFORE anything is published to Sanity.
 * Run: node scripts/render-blog-review.mjs
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "blog-data");
const OUT_FILE = path.join(__dirname, "../../Docs/Blogs/Round2_Review.md");

const META = [
  { file: "blog-6-data-readiness-before-ai.json", title: "The Data Readiness Audit: Why Most AI Initiatives Fail Before the AI Ever Arrives", slug: "data-readiness-before-ai-initiatives", excerpt: "Most AI initiatives fail for a reason that has nothing to do with AI: the data was never fit to feed it. What a real data-readiness check covers.", date: "2026-07-30", tags: ["AI data readiness", "AI process audit India", "data quality before AI", "AI consultation"] },
  { file: "blog-7-change-management-ai-adoption.json", title: "AI Adoption Fails on People, Not Technology: A Change-Management Playbook for Mid-Market Leaders", slug: "change-management-ai-adoption-playbook", excerpt: "AI tools rarely fail on technology. They fail on adoption. A change-management playbook for getting mid-market teams to trust and use AI.", date: "2026-07-27", tags: ["AI change management", "AI adoption playbook", "AI consultation India"] },
  { file: "blog-8-in-house-hire-vs-embedded-advisor.json", title: "In-House AI Hire or Embedded Advisor? A Framework for 50-500 Person Companies", slug: "in-house-ai-hire-vs-embedded-advisor", excerpt: "In-house AI hire or embedded advisor? A practical framework for 50-500 person companies deciding how to build real AI capability.", date: "2026-07-23", tags: ["AI hiring decision", "embedded AI advisor", "AI consultation India"] },
  { file: "blog-9-measure-roi-ai-pilot.json", title: "How to Measure ROI on an AI Pilot Before You Scale It", slug: "measure-roi-ai-pilot-before-scaling", excerpt: "\"The pilot went well\" isn't a measurement. How to define real ROI metrics for an AI pilot before you commit budget to scaling it.", date: "2026-07-20", tags: ["AI pilot ROI", "AI pilot measurement", "AI consultation India"] },
  { file: "blog-10-ai-pilot-trap-portfolio-strategy.json", title: "The AI Pilot Trap: Why Running Five Small Pilots Is Worse Than Running One", slug: "ai-pilot-trap-portfolio-strategy", excerpt: "Running five AI pilots at once feels like progress. Usually it means none of them get the attention needed to actually succeed.", date: "2026-07-17", tags: ["AI pilot strategy", "AI portfolio governance", "AI consultation India"] },
];

function blockToText(b) {
  if (b._type !== "block") return `[${b._type} block]`;
  const text = (b.children || []).map(c => c.text).join("");
  if (b.style === "h2") return `\n## ${text}\n`;
  if (b.style === "h3") return `\n### ${text}\n`;
  return text;
}

let out = `# AI Consultation Blogs — Round 2 (Review Draft, NOT yet published)\n\nAuthor: Mohan Chute · Pillar: AI Consultation · Site: magicworksitsolutions.com\n\n---\n\n`;

for (const m of META) {
  const dataPath = path.join(DATA_DIR, m.file);
  const { blocks, faq } = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const wordCount = blocks.map(blockToText).join(" ").split(/\s+/).filter(Boolean).length;

  out += `## ${m.title}\n\n`;
  out += `**Slug:** \`/blog/${m.slug}\`  \n**Planned publish date:** ${m.date}  \n**Meta description (${m.excerpt.length}/155 chars):** ${m.excerpt}  \n**Tags:** ${m.tags.join(", ")}  \n**Word count (body only):** ~${wordCount}\n\n`;
  out += `### Body\n\n`;
  for (const b of blocks) {
    out += blockToText(b) + "\n\n";
  }
  out += `### FAQ (${faq.length})\n\n`;
  for (const f of faq) {
    out += `**Q: ${f.question}**\nA: ${f.answer}\n\n`;
  }
  out += `\n---\n\n`;
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, out);
console.log(`✅  Review doc written: ${OUT_FILE}`);
console.log(`   Total length: ${out.length} chars`);
