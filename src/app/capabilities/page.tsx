import Link from "next/link";
import { ChevronLeft, Layout, LayoutGrid, Cpu, ChevronRight, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  buildMetadata,
  breadcrumbJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services: Web Platforms, Portals and Automation",
  description:
    "Nodewise services: high-converting web presence, custom business portals and dashboards, and workflow automation. Built for speed, clarity, and growth.",
  path: "/capabilities",
  keywords: [
    "custom web portal development",
    "business dashboard software",
    "process automation India",
    "web application services",
  ],
});

export default function Capabilities() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Core Capabilities",
            description:
              "Premium web presences, custom portals, dashboards, and automation layers.",
            path: "/capabilities",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/capabilities" },
          ]),
          serviceJsonLd({
            name: "B2B Landing Pages",
            description:
              "High-performance marketing sites and brand platforms built for conversion.",
            path: "/capabilities",
          }),
          serviceJsonLd({
            name: "Custom Portals & Dashboards",
            description:
              "Internal tools, client portals, and operational dashboards tailored to your workflow.",
            path: "/capabilities",
          }),
          serviceJsonLd({
            name: "Advanced Automation",
            description:
              "Software automation layers that reduce manual work and scale business processes.",
            path: "/capabilities",
          }),
        ]}
      />
      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Services</h1>
            <p className="page-hero-subtitle">
              B2B landing pages, portals, and software.
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
                  <h3 className="card-title">B2B Landing Pages</h3>
                  <p className="card-description">Marketing sites and landing pages that convert.</p>
                  <ul className="scan-list">
                    <li>Corporate sites</li>
                    <li>Landing pages</li>
                    <li>Service businesses</li>
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
