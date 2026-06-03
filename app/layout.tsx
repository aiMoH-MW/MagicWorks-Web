import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://magicworksitsolutions.com"),
  title: {
    default: "MagicWorks · AI-First Digital Marketing Agency in Pune",
    template: "%s · MagicWorks",
  },
  description:
    "Human strategy, machine acceleration. MagicWorks turns traffic, leads, and operations into predictable revenue for ambitious Indian businesses. Book a discovery call.",
  keywords: [
    "digital marketing agency Pune",
    "AI marketing agency India",
    "performance marketing agency",
    "SEO AEO agency Pune",
    "web development Pune",
    "AI consultation India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://magicworksitsolutions.com",
    siteName: "MagicWorks IT Solutions",
    title: "MagicWorks · AI-First Digital Marketing Agency in Pune",
    description:
      "Human strategy, machine acceleration. We turn traffic, leads, and operations into predictable revenue for ambitious Indian businesses.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "MagicWorks IT Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MagicWorks · AI-First Digital Marketing Agency in Pune",
    description: "Human strategy, machine acceleration. Predictable revenue for ambitious Indian businesses.",
    images: ["/og-default.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,600&display=swap"
          rel="stylesheet"
        />
        {/* MagicFlow AI chatbot — every page except /studio */}
        <script src="https://www.magicflowai.io/chatbot.js" async />
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F3EA] text-[#1A1A22]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
