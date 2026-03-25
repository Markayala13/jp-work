import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const BASE_URL = "https://www.workjpservices.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Work JP Services — Landscaping, Hardscape & Tree Service",
    template: "%s | Work JP Services",
  },
  description:
    "Professional landscaping, hardscape, fencing, tree service, concrete, and weed control for residential and commercial properties. Serving the Atlanta metro area.",
  keywords: [
    "landscaping",
    "hardscape",
    "lawn care",
    "tree service",
    "fencing",
    "concrete",
    "weed control",
    "synthetic grass",
    "mulch",
    "Atlanta landscaping",
    "Georgia lawn care",
  ],
  authors: [{ name: "Work JP Services" }],
  creator: "Work JP Services",
  publisher: "Work JP Services",
  formatDetection: { telephone: true, email: true },
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Work JP Services — Landscaping, Hardscape & Tree Service",
    description:
      "Professional landscaping, hardscape, fencing, tree service, concrete, and weed control. Residential & Commercial. Atlanta metro area.",
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Work JP Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work JP Services — Landscaping & Hardscape",
    description:
      "Professional landscaping, hardscape, fencing, tree service, concrete, and weed control. Residential & Commercial.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.workjpservices.com",
    name: "Work JP Services",
    url: "https://www.workjpservices.com",
    telephone: "+16784975337",
    description:
      "Professional landscaping, hardscape, fencing, tree service, concrete, and weed control for residential and commercial properties.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "GA",
      addressCountry: "US",
    },
    areaServed: { "@type": "State", name: "Georgia" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Outdoor Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landscaping" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tree Service & Trimming" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fencing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Concrete & Hardscape" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Weed Control" } },
      ],
    },
  };

  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans"><Providers>{children}</Providers></body>
    </html>
  );
}
