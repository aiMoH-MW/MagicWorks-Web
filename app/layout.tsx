import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const GTM_ID = "GTM-W75DJC";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-head",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  style: ["normal", "italic"],
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
  alternateName: ["MagicWorks", "MagicWorks IT Solutions"],
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
    streetAddress: "Pune",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
    postalCode: "411001",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "City", name: "Pune" },
    { "@type": "State", name: "Maharashtra" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer enquiries",
      email: "info@magicworksitsolutions.com",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      url: "https://magicworksitsolutions.com/contact",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  knowsAbout: [
    "Digital Marketing",
    "Search Engine Optimisation",
    "Answer Engine Optimisation",
    "Generative Engine Optimisation",
    "Google Ads",
    "Performance Max",
    "Meta Ads",
    "LinkedIn Ads",
    "AI Consultation",
    "AI Process Audit",
    "AI Roadmap",
    "Web Development",
    "Next.js",
    "Headless CMS",
    "Marketplace Platform Consultation",
    "Edtech Platform Strategy",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "MagicWorks Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://magicworksitsolutions.com/services/digital-marketing#service",
          name: "Digital Marketing",
          url: "https://magicworksitsolutions.com/services/digital-marketing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://magicworksitsolutions.com/services/web-development#service",
          name: "Web Development",
          url: "https://magicworksitsolutions.com/services/web-development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://magicworksitsolutions.com/services/ai-consultation#service",
          name: "AI Consultation",
          url: "https://magicworksitsolutions.com/services/ai-consultation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://magicworksitsolutions.com/services/platform-consultation#service",
          name: "Marketplace & Platform Consultation",
          url: "https://magicworksitsolutions.com/services/platform-consultation",
        },
      },
    ],
  },
  sameAs: [
    "https://linkedin.com/company/magicworks-it-solutions",
    "https://magicworksitsolutions.com",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif4.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google Consent Mode v2 — defaults must fire BEFORE GTM loads */}
        <Script
          id="consent-defaults"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{
  analytics_storage:'denied',
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  wait_for_update:2000
});
try{
  var _c=localStorage.getItem('mw_cookie_consent');
  if(_c){var _p=JSON.parse(_c);gtag('consent','update',{
    analytics_storage:_p.analytics?'granted':'denied',
    ad_storage:_p.marketing?'granted':'denied',
    ad_user_data:_p.marketing?'granted':'denied',
    ad_personalization:_p.marketing?'granted':'denied'
  });}
}catch(e){}`,
          }}
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
        <CookieBanner />
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
