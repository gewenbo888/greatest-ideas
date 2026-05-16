import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Spectral, Inter, JetBrains_Mono, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const body = Spectral({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});
const zh = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-zh",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f0e9d7",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://greatest-ideas.psyverse.fun"),
  title: "The Greatest Ideas — an opinionated canon | 最伟大的想法",
  description:
    "Sixty-four ideas that most changed what humans can do or know — from fire to transformers, in eight epochs, with a live lineage graph. Bilingual EN · 中文.",
  keywords: [
    "history of ideas", "philosophy", "science", "intellectual history",
    "canon", "great ideas", "human civilization", "structural realism",
    "最伟大的想法", "思想史", "科学史",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/", "x-default": "/" },
  },
  openGraph: {
    title: "The Greatest Ideas — 64 entries · 8 epochs",
    description: "An opinionated canon of the ideas that opened doors nothing closed behind.",
    url: "https://greatest-ideas.psyverse.fun/",
    siteName: "Psyverse",
    type: "article",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Greatest Ideas",
    description: "An opinionated canon, 1.5 million years long.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#f0e9d7" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${sans.variable} ${mono.variable} ${zh.variable}`}>
      <body className="font-body antialiased">
        <Script
          src="https://analytics-dashboard-two-blue.vercel.app/tracker.js"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "The Greatest Ideas — an opinionated canon",
              author: { "@type": "Person", name: "Gewenbo", url: "https://psyverse.fun" },
              publisher: { "@type": "Organization", name: "Psyverse", url: "https://psyverse.fun" },
              inLanguage: ["en", "zh-CN"],
              url: "https://greatest-ideas.psyverse.fun/",
              about: [
                "history of ideas", "philosophy of science", "intellectual history",
                "structural realism", "civilization",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
