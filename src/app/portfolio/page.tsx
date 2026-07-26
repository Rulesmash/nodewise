import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  buildMetadata,
  breadcrumbJsonLd,
  itemListJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio & Case Studies — MVPs & Landing Pages",
  description:
    "Explore Nodewise case studies: Titan Residences 3D real estate, Mavenix marketing MVP, and FOSS CEAL community platform. MVPs and high-converting landing pages for startups.",
  path: "/portfolio",
  keywords: [
    "web development portfolio",
    "MVP case studies",
    "landing page examples",
    "startup web projects",
  ],
  image: "/assets/titan-hero.png",
  imageAlt: "Nodewise portfolio — Titan Residences case study",
});

export default function Portfolio() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Portfolio & Case Studies",
            description:
              "MVPs, high-converting landing pages, and custom web applications built by Nodewise.",
            path: "/portfolio",
            type: "CollectionPage",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
          ]),
          itemListJsonLd("Nodewise Portfolio", [
            {
              name: "Titan Residences",
              url: "https://titan-bigs.vercel.app",
              description:
                "Interactive 3D luxury real estate prototype with floor plans and amenities.",
              image: "/assets/titan-hero.png",
            },
            {
              name: "Mavenix Studio",
              url: "https://mavenixstudio.netlify.app/",
              description:
                "High-conversion digital marketing agency MVP landing page.",
              image: "/assets/mavenix-hero.png",
            },
            {
              name: "FOSS CEAL",
              url: "https://foss.ceal.in/",
              description:
                "Open source college club platform for events, training, and resources.",
              image: "/assets/fossceal-landing.png",
            },
          ]),
        ]}
      />
      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-subtitle">Our Engineering Artifacts</span>
            <h1 className="page-hero-title">MVPs & Landing Pages</h1>
            <p className="page-hero-subtitle">
              Showcasing rapid Minimum Viable Products (MVPs), high-converting landing pages, and web applications built for startups and growing businesses.
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
                <a href="https://titan-bigs.vercel.app" target="_blank" rel="noopener noreferrer" className="portfolio-mockup" style={{ display: "block", textDecoration: "none" }} data-project-id="case-01">
                  <div className="mockup-header">
                    <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                    <span className="mockup-url">titan.nodewise.cc</span>
                  </div>
                  <div className="mockup-viewport">
                    <img src="/assets/titan-hero.png" alt="Titan Residences Showcase"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div className="mockup-hover-overlay">
                    <ExternalLink className="overlay-icon" />
                    <span>Visit Live Site</span>
                  </div>
                </a>
              </div>
              <div className="portfolio-info">
                <span className="case-meta">Case Study 01 // 3D Interactive Real Estate</span>
                <h3 className="case-title">Titan Residences: Interactive 3D Luxury Real Estate Prototype</h3>
                <p className="case-description">
                  Ascending 24 stories above the metropolitan skyline, Titan stands as an architectural sculpture. An
                  interactive 3D web platform enabling prospective buyers to explore layout blueprints, floor plan
                  hotspots, amenities, and residences in real time.
                </p>
                <div className="portfolio-ctas">
                  <a href="https://titan-bigs.vercel.app" target="_blank" rel="noopener noreferrer"
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
                <a href="https://mavenixstudio.netlify.app/" target="_blank" rel="noopener noreferrer" className="portfolio-mockup" style={{ display: "block", textDecoration: "none" }} data-project-id="case-02">
                  <div className="mockup-header">
                    <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                    <span className="mockup-url">mavenixstudio.netlify.app</span>
                  </div>
                  <div className="mockup-viewport">
                    <img src="/assets/mavenix-hero.png" alt="Mavenix Landing Page MVP Showcase"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div className="mockup-hover-overlay">
                    <ExternalLink className="overlay-icon" />
                    <span>Visit Live Site</span>
                  </div>
                </a>
              </div>
              <div className="portfolio-info">
                <span className="case-meta">Case Study 02 // MVP & Basic Landing Page</span>
                <h3 className="case-title">Mavenix: High-Conversion Digital Marketing Agency MVP</h3>
                <p className="case-description">
                  A modern, high-performance landing page engineered for Mavenix Studio. Perfect for MVP builders and businesses requiring a basic yet premium landing page. It focuses on turning small businesses into big brands through custom strategy audits and sleek conversion funnels.
                </p>
                <div className="portfolio-ctas">
                  <a href="https://mavenixstudio.netlify.app/" target="_blank" rel="noopener noreferrer"
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
                <a href="https://foss.ceal.in/" target="_blank" rel="noopener noreferrer" className="portfolio-mockup" style={{ display: "block", textDecoration: "none" }} data-project-id="case-03">
                  <div className="mockup-header">
                    <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                    <span className="mockup-url">foss.ceal.in</span>
                  </div>
                  <div className="mockup-viewport">
                    <img src="/assets/fossceal-landing.png" alt="FOSS CEAL Linktree Showcase"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div className="mockup-hover-overlay">
                    <ExternalLink className="overlay-icon" />
                    <span>Visit Live Site</span>
                  </div>
                </a>
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
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Schedule Consultation</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    
    </>
  );
}
