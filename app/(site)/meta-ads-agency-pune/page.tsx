import type { Metadata } from "next";
import "@/components/landing2/css/meta.css";
import LandingInit from "@/components/landing2/LandingInit";
import { html } from "@/components/landing2/html/meta";

const URL_PATH = "/meta-ads-agency-pune";
const TITLE = "Best Meta Ads Agency in Pune | MagicWorks";
const DESCRIPTION = "Get results-driven Meta Ads services in Pune with MagicWorks. We manage Facebook & Instagram campaigns with creative testing for qualified leads and ROI.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    url: `https://magicworksitsolutions.com${URL_PATH}`,
    title: "Best Meta Ads Agency in Pune | MagicWorks",
    description: "Demand and discovery on Facebook and Instagram. Creative variants, audience automation and honest monthly reporting.",
  },
};

export default function Page() {
  return (
    <>
      <div className="lpx lp-meta" dangerouslySetInnerHTML={{ __html: html }} />
      <LandingInit page="meta" />
    </>
  );
}
