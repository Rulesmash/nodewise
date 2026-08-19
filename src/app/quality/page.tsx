import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  buildMetadata,
  breadcrumbJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Quality Standards: Performance, Security and Ownership",
  description:
    "Nodewise engineering bar: performance-first delivery, secure architecture, clean code you own, and documentation so your team can extend the product.",
  path: "/quality",
  keywords: [
    "software quality standards",
    "performance focused development",
    "clean code ownership",
  ],
});

export default function Quality() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Quality Standards",
            description:
              "Performance, security, and clean architecture standards at Nodewise.",
            path: "/quality",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Quality", path: "/quality" },
          ]),
        ]}
      />
      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Quality</h1>
            <p className="page-hero-subtitle">
              Performance, ownership, and clear communication.
            </p>
          </div>
        </div>
      </section>

      {/*  Section: Work Quality  */}
      <section id="quality" className="quality-section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="grid quality-grid">
            {/*  Quality Block 1  */}
            <div className="quality-item" id="quality-item-hackathon">
              <div className="quality-num">01</div>
              <div className="quality-details">
                <h3 className="quality-title">Shipped on short timelines</h3>
                <p className="quality-description">
                  Hackathon-trained. Advanced work without cutting stability.
                </p>
                <ul className="scan-list">
                  <li>Fast delivery</li>
                  <li>Stable systems</li>
                  <li>Clean interfaces</li>
                </ul>
              </div>
            </div>

            {/*  Quality Block 2  */}
            <div className="quality-item" id="quality-item-architecture">
              <div className="quality-num">02</div>
              <div className="quality-details">
                <h3 className="quality-title">Custom code you own</h3>
                <p className="quality-description">
                  No page builders. Source is yours.
                </p>
                <ul className="scan-list">
                  <li>Custom architecture</li>
                  <li>Fast page loads</li>
                  <li>Mobile-ready</li>
                </ul>
              </div>
            </div>

            {/*  Quality Block 3  */}
            <div className="quality-item" id="quality-item-jargon">
              <div className="quality-num">03</div>
              <div className="quality-details">
                <h3 className="quality-title">Business-first communication</h3>
                <p className="quality-description">
                  We talk outcomes, not jargon.
                </p>
                <ul className="scan-list">
                  <li>Clear updates</li>
                  <li>Operational fit</li>
                  <li>Code you can extend</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  CTA Banner  */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">See the bar</h2>
              <p className="cta-banner-text">Start with a landing page or a scoped software build.</p>
            </div>
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Start a project</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    
    </>
  );
}
