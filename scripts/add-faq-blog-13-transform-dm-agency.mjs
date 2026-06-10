import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";
const envPath = resolve(process.cwd(), ".env.local");
const envLines = readFileSync(envPath, "utf8").split("\n");
for (const line of envLines) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}
const client = createClient({ projectId: "wa86etuq", dataset: "production", apiVersion: "2024-01-01", useCdn: false, token: process.env.SANITY_API_TOKEN });

const faq = [
  {
    question: "Can you show me a client whose revenue you can directly attribute to your work?",
    answer: "A transformative agency has a clear, defensible answer to this question. They will show you specific clients, specific revenue numbers, and explain precisely how their work produced those outcomes. An execution agency will show you a case study about traffic growth or engagement rate improvement. If the answer to this question does not include a rupee figure, you are talking to an execution agency.",
  },
  {
    question: "What does your onboarding process look like for the first 90 days?",
    answer: "A transformative agency will describe a structured 90-day onboarding that includes: business and revenue model deep-dive, CRM and data access requirements, stakeholder interviews, competitive audit, and a strategic framework presentation before any campaigns run. An execution agency will describe a social media calendar, an ad account setup, and a first-month content plan. The difference in answer tells you everything about how each agency thinks about their role.",
  },
  {
    question: "How do you handle a quarter where performance is below forecast?",
    answer: "This question separates agencies that own outcomes from agencies that manage deliverables. A transformative agency will describe their diagnostic process: what data they examine, what hypotheses they test, how they adjust strategy, and how they communicate transparently with clients during underperformance periods. An execution agency will describe what deliverables they continue to produce on schedule regardless of performance.",
  },
  {
    question: "What access do you need from our business to do your best work?",
    answer: "A transformative agency will ask for: CRM access, sales pipeline data, historical revenue data by channel, and direct access to your sales team. They will explain why each piece of access enables better decisions. An execution agency will ask for: social media login credentials, Google Analytics access, and a point of contact for approvals. The access requirements reveal the depth of integration the agency expects to operate at.",
  },
  {
    question: "Who specifically will work on our account, and what is their background?",
    answer: "Transformative agency work is done by senior people with both marketing expertise and business acumen. Ask for the specific team member who will lead your account, their professional background, and how many other accounts they run simultaneously. An account lead managing 15 clients cannot do transformative work on any of them. A lead managing 4-6 clients at appropriate investment levels can. The ratio tells you the delivery model.",
  },
];

await client.patch("insight-wp-989347").set({ faq }).commit();
console.log(`FAQ patched — ${faq.length} items added to insight-wp-989347`);
faq.forEach((f, i) => console.log(`  Q${i + 1}: ${f.question}`));
