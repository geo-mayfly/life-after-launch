import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { metadataBase } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import JsonLd from "@/components/JsonLd";

const display = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display-next",
  display: "swap",
});

const sans = Hanken_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans-next",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.elevatorPitch,
  applicationName: site.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": site.rss },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AU",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#062A52",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${display.variable} ${sans.variable}`}>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
