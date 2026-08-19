import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Manrope } from "next/font/google";
import dynamic from "next/dynamic";
import Script from "next/script";
import "./globals.css";
import "./site-system.css";
import "./mobile-adapt.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import JsonLd from "@/components/JsonLd";
import {
  SITE,
  PAGE_SEO,
  siteGraphJsonLd,
} from "@/lib/seo";

const IdleThreeBackground = dynamic(
  () => import("@/components/IdleThreeBackground"),
  { ssr: false }
);
const GlobalInteractions = dynamic(
  () => import("@/components/GlobalInteractions"),
  { ssr: false }
);

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-header",
  weight: "100 900",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
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
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${PAGE_SEO.home.title} | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: PAGE_SEO.home.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.studioName,
  publisher: SITE.name,
  category: "technology",
  classification: "Website development and custom software development",
  keywords: [...SITE.keywords],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
    icon: [
      { url: "/favicon.ico" },
      { url: SITE.logoIcon, type: "image/jpeg", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: SITE.logoIcon, sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE.name,
    statusBarStyle: "black-translucent",
  },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${manrope.variable}`}
    >
      <body>
        {/*
          THESIS: Category-standard founder homepage elevated by cinematic product motion. Glass telemetry cards orbit a metallic sculpture; refuse generic particle wallpaper as the hero.
          OWN-WORLD: Void charcoal, frosted glass panels, brushed metal 3D, soft cyan instrument light, pill CTAs, Geist + Manrope.
          STORY: A B2B buyer grasps landing pages (12k–15k) and business software (25k+) and acts via WhatsApp or consultation. Zero to MVP stays available as a timed side offer.
          FIRST VIEWPORT: Headline + offer + View our work first; Discuss a project secondary. HeroStage is a live Three.js studio sculpture with glass offer cards, not a still image. Mobile stacks copy, CTAs, stage, bullets.
          FORM: Canon category standard; seed 70d60cdf; craft bar Raycast+Arc+Resend; motion pinned to design-inspo video.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
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
        <JsonLd data={siteGraphJsonLd()} />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <GlobalInteractions />
        <IdleThreeBackground />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
