import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PackagesOffer from "@/components/PackagesOffer";
import StackBand from "@/components/StackBand";
import {
  PAGE_SEO,
  SCHEMA_IDS,
  breadcrumbJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata("packages");

export default function Packages() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.packages.title,
            description: PAGE_SEO.packages.description,
            path: "/packages",
            type: "CollectionPage",
            mainEntity: { "@id": SCHEMA_IDS.offerCatalog },
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/packages" },
          ]),
        ]}
      />
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Pricing</h1>
            <p className="page-hero-subtitle">
              Premium web development from Kerala. Next.js sites from ₹20,000
              (~$212). Web applications ₹1–1.5 lakh (~$1,058–$1,587). AI SEO
              included. No WordPress.
            </p>
          </div>
        </div>
      </section>

      <section
        id="packages"
        className="packages-section"
        style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
      >
        <div className="container">
          <PackagesOffer />
        </div>
      </section>

      <StackBand />

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need a quoted platform?</h2>
              <p className="cta-banner-text">
                Multi-user systems, realtime, and models are scoped after a
                brief.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Send a brief</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
