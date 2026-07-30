import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import GlobalInteractions from "@/components/GlobalInteractions";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import JsonLd from "@/components/JsonLd";
import {
  SITE,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-header",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" },
    { media: "(prefers-color-scheme: light)", color: "#0b0c10" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Nodewise is an agile digital product studio building custom web applications, MVPs, and business software optimized for profitability and speed. Transparent INR pricing. India-based, worldwide delivery.",
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  keywords: [...SITE.keywords],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: `${SITE.url}/`,
    languages: {
      "en-IN": `${SITE.url}/`,
      en: `${SITE.url}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: `${SITE.url}/`,
    title: `${SITE.name} | ${SITE.tagline}`,
    description:
      "Custom web platforms, MVPs, and business software engineered for growth. Transparent pricing from India.",
    siteName: SITE.name,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description:
      "Custom web platforms, MVPs, and business software engineered for growth.",
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: SITE.logoIcon }],
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
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
      className={`${plusJakartaSans.variable} ${outfit.variable}`}
    >
      <body>
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xuoar76ipm");
            `,
          }}
        />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <GlobalInteractions />
        <ThreeBackground />
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
