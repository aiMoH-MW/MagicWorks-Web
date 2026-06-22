import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing ROI Calculator",
  description:
    "Estimate your potential return from a digital marketing engagement. Enter your current spend and lead data to see projected ROI across education, real estate, manufacturing, and e-commerce.",
  alternates: { canonical: "/tools/roi-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
