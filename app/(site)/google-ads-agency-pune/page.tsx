import type { Metadata } from "next";
import "@/components/landing2/css/google.css";
import LandingInit from "@/components/landing2/LandingInit";
import { html } from "@/components/landing2/html/google";

const URL_PATH = "/google-ads-agency-pune";
const TITLE = "Best Google Ads Agency in Pune | MagicWorks";
const DESCRIPTION = "Get results-driven Google Ads in Pune with MagicWorks. We manage Search, Performance Max, Display & YouTube campaigns focused on qualified leads and ROI.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    url: `https://magicworksitsolutions.com${URL_PATH}`,
    title: "Best Google Ads Agency in Pune | MagicWorks",
    description: "Google Ads that bring you real customers. Tracking set up before spend, honest monthly reporting.",
  },
};

export default function Page() {
  return (
    <>
      <div className="lpx lp-google" dangerouslySetInnerHTML={{ __html: html }} />
      <LandingInit page="google" />
    </>
  );
}
