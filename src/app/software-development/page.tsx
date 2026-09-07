import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import StackBand from "@/components/StackBand";
import {
  PAGE_SEO,
  SCHEMA_IDS,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";
import { PRICE_COPY, SOFTWARE_WHATSAPP_HREF } from "@/lib/pricing";

export const metadata: Metadata = pageMetadata("softwareDevelopment");

const FAQS = [
  {
    question: "What web applications do you build?",
    answer:
      "Portals, dashboards, internal tools, and light workflow automation. The package is ₹1–1.5 lakh (~$1,058–$1,587), with Next.js, Node, PostgreSQL, auth, and source you own.",
  },
  {
    question: "Who is this for?",
    answer:
      "B2B teams that have outgrown spreadsheets and need software that matches how the business actually runs.",
  },
  {
    question: "What is not in this package?",
    answer:
      "Native mobile apps, heavy enterprise integrations, realtime AI, and custom models are quoted as platforms. A static marketing site is the website offer from ₹20,000 (~$212).",
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
            { name: "Web application engineering", path: "/software-development" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Web application engineering</h1>
            <p className="page-hero-subtitle">
              Portals, dashboards, and internal tools. Next.js, Node, and
              PostgreSQL. ₹1–1.5 lakh (~$1,058–$1,587). You own the source.
            </p>
          </div>
        </div>
      </section>

      <section className="quality-section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="grid quality-grid">
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Portals</h2>
                <p className="quality-description">
                  Client access with roles, auth, and records that stay in
                  your database.
                </p>
                <ul className="scan-list">
                  <li>Supabase Auth</li>
                  <li>Admin and client views</li>
                  <li>Booking and account flows</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Dashboards</h2>
                <p className="quality-description">
                  Operational views on PostgreSQL, not a spreadsheet export
                  pasted into a page.
                </p>
                <ul className="scan-list">
                  <li>Plotly charts when the data needs them</li>
                  <li>Internal tools for the team that runs the work</li>
                  <li>APIs your other systems can call</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Workflows</h2>
                <p className="quality-description">
                  Light automation: webhooks, REST, and jobs that remove
                  repeat work.
                </p>
                <ul className="scan-list">
                  <li>Scoped to a real bottleneck</li>
                  <li>Code your team can extend</li>
                  <li>Realtime, RAG, and models quoted as platforms</li>
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
          <div
            className="package-card highlighted"
            style={{ maxWidth: "36rem" }}
          >
            <h2 className="package-title">{PRICE_COPY.softwareTitle}</h2>
            <div className="package-price">
              {PRICE_COPY.softwareRangeShort} <span>INR</span>
              <span className="price-usd">{PRICE_COPY.softwareRangeUsd}</span>
            </div>
            <p className="package-desc">
              A web application with a real backend. Not a static site with a
              login painted on.
            </p>
            <ul className="package-features">
              <li>
                <Check aria-hidden="true" />{" "}
                <span>Next.js, Node APIs, PostgreSQL</span>
              </li>
              <li>
                <Check aria-hidden="true" />{" "}
                <span>Supabase Auth, dashboards, portals</span>
              </li>
              <li>
                <Check aria-hidden="true" />{" "}
                <span>Light workflow automation</span>
              </li>
              <li>
                <Check aria-hidden="true" />{" "}
                <span>4–8 weeks typical. Ownership and docs</span>
              </li>
            </ul>
            <a
              href={SOFTWARE_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary package-btn"
            >
              <span>Discuss a web app</span>
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <StackBand
        offer="software"
        title="Application stack"
        lede="This is an application: Node APIs, PostgreSQL, auth, and dashboards. Realtime voice, RAG, and custom models sit on the quoted platforms tier."
      />

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need a website first?</h2>
              <p className="cta-banner-text">
                Next.js sites start at ₹20,000 (~$212) for three pages.
              </p>
            </div>
            <Link
              href="/website-development"
              className="btn btn-secondary cta-banner-btn"
            >
              <span>Website engineering</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
