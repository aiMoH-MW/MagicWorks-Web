import type { Metadata } from "next";
import "@/components/landing2/css/web.css";
import LandingInit from "@/components/landing2/LandingInit";
import { html } from "@/components/landing2/html/web";

const URL_PATH = "/web-development-agency-pune";
const TITLE = "Best AI Website Development Company in Pune | MagicWorks";
const DESCRIPTION = "Get AI-native website development in Pune with MagicWorks. We build fast Next.js sites with built-in chat and smart search, live in 3 to 10 weeks.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    url: `https://magicworksitsolutions.com${URL_PATH}`,
    title: "Best AI Website Development Company in Pune | MagicWorks",
    description: "AI-native websites that turn visitors into qualified enquiries. Most projects start at ₹2 lakh and go live in 3 to 10 weeks.",
  },
};

export default function Page() {
  return (
    <>
      <div className="lpx lp-web" dangerouslySetInnerHTML={{ __html: html }} />
      <LandingInit page="web" />
    </>
  );
}
