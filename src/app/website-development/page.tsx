import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SitePricingCalculator from "@/components/SitePricingCalculator";
import StackBand from "@/components/StackBand";
import {
  PAGE_SEO,
  SCHEMA_IDS,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata("websiteDevelopment");

const FAQS = [
  {
    question: "What is included in a Nodewise website?",
    answer:
      "A static Next.js site on Vercel. Three pages to start: Home, About, Enquiry. Responsive layout, enquiry form, basic SEO, and the GitHub repo. Timeline is 1–2 weeks. No WordPress and no retainer.",
  },
  {
    question: "Do you build B2B company websites?",
    answer:
      "Yes. Company sites and landing pages, written in Next.js and shipped on Vercel. Extra pages are priced in the calculator with no cap.",
  },
  {
    question: "Can a new business start with three pages?",
    answer:
      "Yes. Home, About, and Enquiry start at ₹20,000 (~$212). Add services, work, FAQ, or other pages in the calculator. You own the repository.",
  },
];

export default function WebsiteDevelopment() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.websiteDevelopment.title,
            description: PAGE_SEO.websiteDevelopment.description,
            path: "/website-development",
            type: "Service",
            mainEntity: { "@id": SCHEMA_IDS.websiteDevelopmentService },
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Website engineering", path: "/website-development" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Website engineering</h1>
            <p className="page-hero-subtitle">
              Custom Next.js sites for B2B. Three pages from ₹20,000 (~$212).
              1–2 weeks. No WordPress, no retainer.
            </p>
          </div>
        </div>
      </section>

      <section className="quality-section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="grid quality-grid">
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Company sites</h2>
                <p className="quality-description">
                  A first site that is a real Next.js app, not a theme.
                </p>
                <ul className="scan-list">
                  <li>Home, About, Enquiry as the base</li>
                  <li>Service and product pages as you add them</li>
                  <li>Repo and ownership included</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Landing pages</h2>
                <p className="quality-description">
                  One offer, one enquiry path, shipped on Vercel.
                </p>
                <ul className="scan-list">
                  <li>Static, fast loads on mobile</li>
                  <li>Enquiry form, basic SEO</li>
                  <li>No CMS login to maintain</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Delivery</h2>
                <p className="quality-description">
                  1–2 weeks for the three-page base. Extra pages in the
                  calculator, no cap.
                </p>
                <ul className="scan-list">
                  <li>Next.js on Vercel</li>
                  <li>No WordPress, no page builders</li>
                  <li>You run the site after launch</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="packages-section"
        style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
      >
        <div className="container">
          <SitePricingCalculator />
        </div>
      </section>

      <StackBand
        offer="sites"
        title="Site stack"
        lede="A marketing site is still software. We write Next.js and React, deploy on Vercel, and hand you the repository. No CMS login, no plugin updates, no retainer."
      />

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need a web application?</h2>
              <p className="cta-banner-text">
                Portals, dashboards, and internal tools are ₹1–1.5 lakh
                (~$1,058–$1,587).
              </p>
            </div>
            <Link
              href="/software-development"
              className="btn btn-secondary cta-banner-btn"
            >
              <span>Web application engineering</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
