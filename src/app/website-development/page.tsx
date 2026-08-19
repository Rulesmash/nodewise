import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
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
    question: "Do you build websites for startups and new businesses?",
    answer:
      "Yes. Nodewise builds first websites and landing pages for starting businesses. Website packages are ₹12,000–15,000 INR, with source you own.",
  },
  {
    question: "Do you build B2B company websites?",
    answer:
      "Yes. We build conversion-focused B2B websites and landing pages for companies that need a professional first impression and a clear path to contact.",
  },
  {
    question: "What is included in website development?",
    answer:
      "A custom-coded site or landing page, responsive layout, basic SEO setup, and a short architecture consult. No page builders. You receive the source.",
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
            { name: "Website development", path: "/website-development" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Website development</h1>
            <p className="page-hero-subtitle">
              For startups, new businesses, and B2B companies that need a
              professional site.
            </p>
          </div>
        </div>
      </section>

      <section className="quality-section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="grid quality-grid">
            <div className="quality-item">
              <div className="quality-num">01</div>
              <div className="quality-details">
                <h2 className="quality-title">Starting businesses</h2>
                <p className="quality-description">
                  A first site that looks credible from day one.
                </p>
                <ul className="scan-list">
                  <li>Offer, proof, and a clear contact path</li>
                  <li>Mobile-ready landing pages</li>
                  <li>Source and ownership included</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-num">02</div>
              <div className="quality-details">
                <h2 className="quality-title">B2B companies</h2>
                <p className="quality-description">
                  Sites built to convert buyers, not decorate a brand.
                </p>
                <ul className="scan-list">
                  <li>Service and product landing pages</li>
                  <li>Corporate sites with a tight offer</li>
                  <li>SEO setup for search and AI crawlers</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-num">03</div>
              <div className="quality-details">
                <h2 className="quality-title">What you get</h2>
                <p className="quality-description">
                  Custom-coded website development from ₹12,000–15,000 INR.
                </p>
                <ul className="scan-list">
                  <li>No page builders</li>
                  <li>Fast loads on mobile</li>
                  <li>You own the code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="packages-section"
        style={{ paddingTop: "1rem", paddingBottom: "3rem" }}
      >
        <div className="container">
          <div className="package-card highlighted" style={{ maxWidth: "36rem" }}>
            <h2 className="package-title">Website package</h2>
            <div className="package-price">
              12k - 15k <span>INR</span>
            </div>
            <p className="package-desc">
              Professional websites and B2B landing pages for new businesses and
              companies.
            </p>
            <ul className="package-features">
              <li>
                <Check aria-hidden="true" /> <span>Custom website development</span>
              </li>
              <li>
                <Check aria-hidden="true" /> <span>Responsive landing pages</span>
              </li>
              <li>
                <Check aria-hidden="true" /> <span>Entry-level SEO setup</span>
              </li>
              <li>
                <Check aria-hidden="true" /> <span>Source code you own</span>
              </li>
            </ul>
            <a
              href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%20need%20website%20development%20for%20my%20startup%20or%20B2B%20company."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary package-btn"
            >
              <span>Discuss a website</span>
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need software as well?</h2>
              <p className="cta-banner-text">
                Portals, dashboards, and custom web apps start from ₹25,000.
              </p>
            </div>
            <Link
              href="/software-development"
              className="btn btn-secondary cta-banner-btn"
            >
              <span>Software development</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
