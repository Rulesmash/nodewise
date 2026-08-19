import Link from "next/link";
import { ChevronLeft, Layout, LayoutGrid, Cpu, ChevronRight, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  PAGE_SEO,
  SCHEMA_IDS,
  breadcrumbJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata("capabilities");

export default function Capabilities() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.capabilities.title,
            description: PAGE_SEO.capabilities.description,
            path: "/capabilities",
            type: "CollectionPage",
            mainEntity: [
              { "@id": SCHEMA_IDS.landingPageService },
              { "@id": SCHEMA_IDS.softwareStudioService },
              { "@id": SCHEMA_IDS.websiteDevelopmentService },
              { "@id": SCHEMA_IDS.softwareDevelopmentService },
            ],
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/capabilities" },
          ]),
        ]}
      />
      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Services</h1>
            <p className="page-hero-subtitle">
              Website development, custom software, portals, and automation for startups and B2B.
            </p>
          </div>
        </div>
      </section>

      {/*  Core Operational Capabilities  */}
      <section id="capabilities" className="capabilities-section" style={{ paddingTop: "2rem" }}>
        <div className="container">

          <div className="capabilities-carousel-wrapper">
            <button className="cap-carousel-btn cap-prev" id="cap-prev-btn" aria-label="Previous capability">
              <ChevronLeft  />
            </button>

            <div className="capabilities-carousel" id="capabilities-carousel">
              <div className="capabilities-track" id="capabilities-track">
                {/*  Card 1  */}
                <div className="card capability-card" id="card-capability-web">
                  <div className="card-icon-container">
                    <Layout className="card-icon" />
                  </div>
                  <h3 className="card-title">Website Development</h3>
                  <p className="card-description">Sites and landing pages for startups and B2B companies.</p>
                  <ul className="scan-list">
                    <li>Corporate sites</li>
                    <li>Landing pages</li>
                    <li>Starting businesses</li>
                  </ul>
                  <div className="card-hover-border"></div>
                </div>

                {/*  Card 2  */}
                <div className="card capability-card" id="card-capability-portals">
                  <div className="card-icon-container">
                    <LayoutGrid className="card-icon" />
                  </div>
                  <h3 className="card-title">Custom Portals &amp; Dashboards</h3>
                  <p className="card-description">Tools your team actually uses.</p>
                  <ul className="scan-list">
                    <li>Client portals</li>
                    <li>Booking</li>
                    <li>Dashboards</li>
                  </ul>
                  <div className="card-hover-border"></div>
                </div>

                {/*  Card 3  */}
                <div className="card capability-card" id="card-capability-automation">
                  <div className="card-icon-container">
                    <Cpu className="card-icon" />
                  </div>
                  <h3 className="card-title">Advanced Automation Layers</h3>
                  <p className="card-description">Cut repetitive work.</p>
                  <ul className="scan-list">
                    <li>Workflows</li>
                    <li>Integrations</li>
                    <li>Internal tools</li>
                  </ul>
                  <div className="card-hover-border"></div>
                </div>
              </div>
            </div>

            <button className="cap-carousel-btn cap-next" id="cap-next-btn" aria-label="Next capability">
              <ChevronRight  />
            </button>
          </div>

          {/*  Dot indicators  */}
          <div className="cap-carousel-dots" id="cap-carousel-dots">
            <span className="cap-dot active" data-index="0"></span>
            <span className="cap-dot" data-index="1"></span>
            <span className="cap-dot" data-index="2"></span>
          </div>
        </div>
      </section>

      {/*  CTA Banner  */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need something specific?</h2>
              <p className="cta-banner-text">Book a 30-minute consult.</p>
            </div>
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Schedule a consult</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    
    </>
  );
}
