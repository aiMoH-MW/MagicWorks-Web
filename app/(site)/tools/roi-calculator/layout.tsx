import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing ROI Calculator",
  description:
    "Estimate your ROI from digital marketing. Enter your spend and lead data to project returns across education, real estate, manufacturing, and e-commerce.",
  alternates: { canonical: "/tools/roi-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
