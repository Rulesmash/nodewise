import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Case Studies | Premium Web Presence & Enterprise Software",
  description: "View Nodewise's portfolio of custom corporate websites, portals, and enterprise software solutions.",
};

export default function Portfolio() {
  return (
    <>


      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-subtitle">Our Engineering Artifacts</span>
            <h1 className="page-hero-title">Portfolio Case Studies</h1>
            <p className="page-hero-subtitle">
              Real projects built for real businesses — each one custom-engineered for performance, conversion, and
              scale.
            </p>
          </div>
        </div>
      </section>

      {/*  Portfolio Case Studies  */}
      <section id="work" className="portfolio-section">
        <div className="container">

          <div className="portfolio-list">
            {/*  Case Study 01  */}
            <div className="portfolio-item-card grid" id="portfolio-case-01">
              <div className="portfolio-media">
                <div className="portfolio-mockup clickable-mockup" data-project-id="case-01">
                  <div className="mockup-header">
                    <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                    <span className="mockup-url">mavenixstudio.netlify.app</span>
                  </div>
                  <div className="mockup-viewport">
                    <img src="/assets/mavenix-hero.png" alt="Mavenix Landing Page Showcase"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div className="mockup-hover-overlay">
                  </div>
                </div>
              </div>
              <div className="portfolio-info">
                <span className="case-meta">Case Study 01 // Digital Agency Platform</span>
                <h3 className="case-title">Mavenix: High-Conversion Digital Marketing Agency Showcase</h3>
                <p className="case-description">
                  A modern, high-performance presentation engine engineered for Mavenix Studio. The page focuses on
                  turning small businesses into big brands through custom strategy audits and sleek conversion funnels.
                </p>
                <div className="portfolio-ctas">
                  <a href="https://mavenixstudio.netlify.app/" target="_blank" rel="noopener noreferrer"
                    className="btn btn-primary" id="btn-verify-case-01">
                    <ExternalLink className="btn-icon" />
                    <span>Visit the Link</span>
                  </a>
                </div>
              </div>
            </div>

            {/*  Case Study 02  */}
            <div className="portfolio-item-card grid inverted" id="portfolio-case-02">
              <div className="portfolio-media">
                <div className="portfolio-mockup clickable-mockup" data-project-id="case-02">
                  <div className="mockup-header">
                    <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                    <span className="mockup-url">titan.nodewise.cc</span>
                  </div>
                  <div className="mockup-viewport">
                    <img src="/assets/titan-hero.png" alt="Titan Residences Showcase"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div className="mockup-hover-overlay">
                  </div>
                </div>
              </div>
              <div className="portfolio-info">
                <span className="case-meta">Case Study 02 // 3D Interactive Real Estate</span>
                <h3 className="case-title">Titan Residences: Interactive 3D Luxury Real Estate Prototype</h3>
                <p className="case-description">
                  Ascending 24 stories above the metropolitan skyline, Titan stands as an architectural sculpture. An
                  interactive 3D web platform enabling prospective buyers to explore layout blueprints, floor plan
                  hotspots, amenities, and residences in real time.
                </p>
                <div className="portfolio-ctas">
                  <a href="https://titan-bigs.vercel.app" target="_blank" rel="noopener noreferrer"
                    className="btn btn-primary" id="btn-verify-case-02">
                    <ExternalLink className="btn-icon" />
                    <span>Visit the Link</span>
                  </a>
                </div>
              </div>
            </div>

            {/*  Case Study 03  */}
            <div className="portfolio-item-card grid" id="portfolio-case-03">
              <div className="portfolio-media">
                <div className="portfolio-mockup clickable-mockup" data-project-id="case-03">
                  <div className="mockup-header">
                    <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                    <span className="mockup-url">foss.ceal.in</span>
                  </div>
                  <div className="mockup-viewport">
                    <img src="/assets/fossceal-landing.png" alt="FOSS CEAL Linktree Showcase"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div className="mockup-hover-overlay">
                  </div>
                </div>
              </div>
              <div className="portfolio-info">
                <span className="case-meta">Case Study 03 // Open Source Community Hub</span>
                <h3 className="case-title">FOSS CEAL: Open Source College Club Platform</h3>
                <p className="case-description">
                  A modular, grid-based community hub built for FOSS CEAL (College of Engineering Attingal). The web
                  platform coordinates training chambers like Create 101 and Train 303, club events, open-source
                  resources, and brand kits.
                </p>
                <div className="portfolio-ctas">
                  <a href="https://foss.ceal.in/" target="_blank" rel="noopener noreferrer" className="btn btn-primary"
                    id="btn-verify-case-03">
                    <ExternalLink className="btn-icon" />
                    <span>Visit the Link</span>
                  </a>
                </div>
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
              <h2 className="cta-banner-title">Ready to Build Your Project?</h2>
              <p className="cta-banner-text">Book a free consultation and let's map out the digital asset that scales your
                business.</p>
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
