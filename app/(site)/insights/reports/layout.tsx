import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports · Insights",
  description:
    "Downloadable research reports from MagicWorks on AI adoption, performance marketing, and digital strategy for Indian businesses.",
  alternates: { canonical: "/insights/reports" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
