import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const GTM_ID = "GTM-W75DJC";

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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://magicworksitsolutions.com/#organization",
  name: "MagicWorks IT Solutions Pvt. Ltd.",
  legalName: "MagicWorks IT Solutions Private Limited",
  alternateName: "MagicWorks",
  url: "https://magicworksitsolutions.com",
  logo: {
    "@type": "ImageObject",
    url: "https://magicworksitsolutions.com/logo.png",
    width: 180,
    height: 48,
  },
  image: "https://magicworksitsolutions.com/og-default.png",
  description:
    "MagicWorks IT Solutions Pvt. Ltd. is an AI-first digital marketing agency based in Pune, India. Founded in 2009, the firm delivers digital marketing, web development, AI consultation, and marketplace platform consultation to businesses across education, real estate, manufacturing, and professional services sectors.",
  foundingDate: "2009",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 20 },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
  knowsAbout: [
    "Digital Marketing",
    "Search Engine Optimisation",
    "Answer Engine Optimisation",
    "Generative Engine Optimisation",
    "Google Ads",
    "Meta Ads",
    "AI Consultation",
    "AI Process Audit",
    "Web Development",
    "Next.js",
    "Marketplace Platform Consultation",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "MagicWorks Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Consultation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketplace & Platform Consultation" } },
    ],
  },
  sameAs: [
    "https://linkedin.com/company/magicworks-it-solutions",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F3EA] text-[#1A1A22]">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Analytics />
        <ChatWidget />
        {/* GTM script — loads after page is interactive */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </body>
    </html>
  );
}
