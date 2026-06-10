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

const members = await client.fetch(`*[_type == "teamMember"] { _id, name, "slug": slug.current, role }`);
console.log("teamMember docs:", JSON.stringify(members, null, 2));
