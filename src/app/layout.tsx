import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import GlobalInteractions from "@/components/GlobalInteractions";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-header',
  weight: ['300', '400', '500', '600', '700', '800']
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nodewise.cc"),
  title: {
    default: "Nodewise | Smarter Code. Better Solutions.",
    template: "%s | Nodewise"
  },
  description: "Nodewise is an agile digital product studio building custom web applications and business software optimized for profitability and speed.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nodewise.cc",
    title: "Nodewise | Smarter Code. Better Solutions.",
    description: "Nodewise is an agile digital product studio building custom web applications and business software optimized for profitability and speed.",
    siteName: "Nodewise",
    images: [{
      url: "/assets/logo-full.png",
      width: 1200,
      height: 630,
      alt: "Nodewise Logo"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nodewise | Smarter Code. Better Solutions.",
    description: "Nodewise is an agile digital product studio building custom web applications and business software.",
    images: ["/assets/logo-full.png"],
  }
};

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${outfit.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <GlobalInteractions />
        <ThreeBackground />
        <FloatingWhatsApp />
        
        <Analytics />
      </body>
    </html>
  );
}
