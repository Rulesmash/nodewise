import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./site-system.css";
import "./mobile-adapt.css";
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
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Startup MVP & Custom Web Development`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Nodewise builds startup MVPs and custom web platforms. Zero to MVP from ₹29,999 in 10–14 days with full ownership. Transparent INR pricing. India-based, worldwide delivery.",
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
      "x-default": `${SITE.url}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: `${SITE.url}/`,
    title: `${SITE.name} | Startup MVP & Custom Web Development`,
    description:
      "Fixed-price MVPs from ₹29,999 in 10–14 days. Custom web platforms and business software. Transparent pricing from India.",
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
    title: `${SITE.name} | Startup MVP & Custom Web Development`,
    description:
      "Fixed-price MVPs from ₹29,999 in 10–14 days. Custom web platforms. India-based, worldwide.",
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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE.name,
    statusBarStyle: "black-translucent",
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
      lang="en-IN"
      className={`${geistSans.variable} ${manrope.variable}`}
    >
      <body>
        {/*
          THESIS: Category-standard founder homepage elevated by cinematic product motion—glass telemetry cards orbit a metallic sculpture; refuse generic particle wallpaper as the hero.
          OWN-WORLD: Void charcoal, frosted glass panels, brushed metal 3D, soft cyan instrument light, pill CTAs, Geist + Manrope.
          STORY: Founder grasps Zero to MVP (₹29,999 / 10–14 days / ownership) and acts via WhatsApp or consultation.
          FIRST VIEWPORT: Left headline + bullets + CTAs; right HeroStage (orbiting metal + floating glass offer cards). Primary: View Our Work / Start Your MVP below.
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
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <GlobalInteractions />
        <ThreeBackground />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
