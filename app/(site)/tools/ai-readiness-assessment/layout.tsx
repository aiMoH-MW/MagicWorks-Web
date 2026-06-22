import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Assessment · Free Quiz",
  description:
    "Take MagicWorks' free five-minute AI readiness assessment to understand where your business stands and what to prioritise for AI adoption.",
  alternates: { canonical: "/tools/ai-readiness-assessment" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
