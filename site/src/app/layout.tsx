import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "work JP — Landscaping, Hardscape & Garden Design",
  description:
    "Premium landscaping, hardscape installation, and garden maintenance for homeowners who demand the best. Serving with craftsmanship and attention to detail.",
  openGraph: {
    title: "work JP — Landscaping, Hardscape & Garden Design",
    description:
      "Premium landscaping, hardscape installation, and garden maintenance for homeowners who demand the best.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
