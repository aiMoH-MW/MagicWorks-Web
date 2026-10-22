import type { Metadata } from "next";
import "@/components/landing2/css/seo.css";
import LandingInit from "@/components/landing2/LandingInit";
import { html } from "@/components/landing2/html/seo";

const URL_PATH = "/seo-aeo-agency-pune";
const TITLE = "Best SEO & AEO Agency in Pune | MagicWorks";
const DESCRIPTION = "Get results-driven SEO and AEO in Pune with MagicWorks. We combine technical SEO and answer engine optimisation to rank on Google and get cited by AI.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    url: `https://magicworksitsolutions.com${URL_PATH}`,
    title: "Best SEO & AEO Agency in Pune | MagicWorks",
    description: "Rank on Google. Get cited by AI. Two disciplines, one retainer.",
  },
};

export default function Page() {
  return (
    <>
      <div className="lpx lp-seo" dangerouslySetInnerHTML={{ __html: html }} />
      <LandingInit page="seo" />
    </>
  );
}
