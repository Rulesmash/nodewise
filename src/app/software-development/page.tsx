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

export const metadata: Metadata = pageMetadata("softwareDevelopment");

const FAQS = [
  {
    question: "Do you build custom software for startups?",
    answer:
      "Yes. Nodewise builds web apps, portals, dashboards, and light automation for starting teams. Custom software starts from ₹25,000 INR, with source you own.",
  },
  {
    question: "Do you build software for B2B companies?",
    answer:
      "Yes. We build internal tools, client portals, operational dashboards, and workflow software for B2B teams that have outgrown spreadsheets.",
  },
  {
    question: "What is not included in the software package?",
    answer:
      "Complex enterprise integrations, native mobile apps, and massive scalable cloud architecture are quoted separately. Zero to MVP remains a fixed ₹29,999 timed package.",
  },
];

export default function SoftwareDevelopment() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.softwareDevelopment.title,
            description: PAGE_SEO.softwareDevelopment.description,
            path: "/software-development",
            type: "Service",
            mainEntity: { "@id": SCHEMA_IDS.softwareDevelopmentService },
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Software development", path: "/software-development" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Software development</h1>
            <p className="page-hero-subtitle">
              Custom software for startups and B2B companies that need tools
              their teams actually use.
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
                <h2 className="quality-title">Portals and dashboards</h2>
                <p className="quality-description">
                  Client portals, booking, and operational views.
                </p>
                <ul className="scan-list">
                  <li>Multi-user access</li>
                  <li>Internal tools</li>
                  <li>Clear reporting</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-num">02</div>
              <div className="quality-details">
                <h2 className="quality-title">Web applications</h2>
                <p className="quality-description">
                  Custom web apps that match how your business actually works.
                </p>
                <ul className="scan-list">
                  <li>Scoped to a real bottleneck</li>
                  <li>Built to ship, not to bloat</li>
                  <li>Code your team can extend</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-num">03</div>
              <div className="quality-details">
                <h2 className="quality-title">Automation</h2>
                <p className="quality-description">
                  Cut repetitive work without an enterprise rewrite.
                </p>
                <ul className="scan-list">
                  <li>Workflow software</li>
                  <li>Light integrations</li>
                  <li>Quoted platforms when you outgrow the base</li>
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
            <h2 className="package-title">Software package</h2>
            <div className="package-price">
              25k+ <span>INR</span>
            </div>
            <p className="package-desc">
              Custom software development for startups and B2B companies. You
              own the source.
            </p>
            <ul className="package-features">
              <li>
                <Check aria-hidden="true" />{" "}
                <span>Full custom web development</span>
              </li>
              <li>
                <Check aria-hidden="true" />{" "}
                <span>Dashboards and portals</span>
              </li>
              <li>
                <Check aria-hidden="true" />{" "}
                <span>Light workflow automation</span>
              </li>
              <li>
                <Check aria-hidden="true" />{" "}
                <span>Ownership and documentation</span>
              </li>
            </ul>
            <a
              href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%20need%20custom%20software%20development%20for%20my%20startup%20or%20B2B%20company."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary package-btn"
            >
              <span>Discuss software</span>
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
              <h2 className="cta-banner-title">Need a website first?</h2>
              <p className="cta-banner-text">
                Startup and B2B websites start at ₹12,000–15,000.
              </p>
            </div>
            <Link
              href="/website-development"
              className="btn btn-secondary cta-banner-btn"
            >
              <span>Website development</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
