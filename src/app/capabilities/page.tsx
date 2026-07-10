import Link from "next/link";
import { ChevronLeft, Layout, LayoutGrid, Cpu, ChevronRight, ArrowRight } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Services | Custom Portals & Advanced Automation",
  description: "Explore Nodewise's core capabilities: Premium web presences, custom portals, dashboards, and advanced automation layers.",
};

export default function Capabilities() {
  return (
    <>


      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-subtitle">What We Build</span>
            <h1 className="page-hero-title">Core Capabilities</h1>
            <p className="page-hero-subtitle">
              We design and build clean, high-performance web platforms and custom software tools engineered to elevate
              your business presence.
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
                  <h3 className="card-title">Premium Web Presences</h3>
                  <p className="card-description">
                    Custom corporate websites and optimized landing pages crafted to turn organic site visitors into
                    active,
                    paying clients. (Tailored for restaurants, gym chains, real estate, and modern service ventures).
                  </p>
                  <div className="card-hover-border"></div>
                </div>

                {/*  Card 2  */}
                <div className="card capability-card" id="card-capability-portals">
                  <div className="card-icon-container">
                    <LayoutGrid className="card-icon" />
                  </div>
                  <h3 className="card-title">Custom Portals &amp; Dashboards</h3>
                  <p className="card-description">
                    Reliable user panels, booking structures, and internal optimization tools built to smooth out your
                    daily
                    business workflows and protect your revenue margins.
                  </p>
                  <div className="card-hover-border"></div>
                </div>

                {/*  Card 3  */}
                <div className="card capability-card" id="card-capability-automation">
                  <div className="card-icon-container">
                    <Cpu className="card-icon" />
                  </div>
                  <h3 className="card-title">Advanced Automation Layers</h3>
                  <p className="card-description">
                    Integrating tailored automated features, interactive components, and smart software interfaces to
                    eliminate repetitive manual tasks and scale customer volume smoothly.
                  </p>
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
              <h2 className="cta-banner-title">Need a Custom Solution?</h2>
              <p className="cta-banner-text">Book a free consultation and let's discuss your project's architecture.</p>
            </div>
            <a href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Schedule Consultation</span>
              <ArrowRight className="btn-icon" />
            </a>
          </div>
        </div>
      </section>

    
    </>
  );
}
