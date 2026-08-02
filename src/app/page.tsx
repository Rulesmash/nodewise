import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Calendar, Check, X, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import HomeMotion from "@/components/HomeMotion";
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import "./home.css";

const HeroStage = dynamic(() => import("@/components/HeroStage"), {
  ssr: false,
  loading: () => (
    <div className="hero-stage hero-stage--loading" aria-hidden="true" />
  ),
});

export const metadata: Metadata = buildMetadata({
  title: "Startup MVP & Custom Web Development in India",
  description:
    "Nodewise builds startup MVPs and custom web platforms. Zero to MVP from ₹29,999 in 10–14 days with full source code and ownership. Transparent pricing. Worldwide delivery.",
  path: "/",
  keywords: [
    "startup MVP India",
    "hire MVP developers",
    "custom web platforms",
    "fixed price MVP",
    "build MVP fast",
  ],
});

export default function Home() {
  return (
    <div className="home-page">
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Startup MVP & Custom Web Development in India",
            description:
              "Nodewise builds startup MVPs and custom web platforms. Zero to MVP from ₹29,999 in 10–14 days with full ownership.",
            path: "/",
          }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
          serviceJsonLd({
            name: "Zero to MVP",
            description:
              "Live, showcase-ready Minimum Viable Product in 10–14 days with full source code and ownership.",
            path: "/zero-to-mvp",
            price: 29999,
          }),
          faqJsonLd([
            {
              question: "How fast can Nodewise build an MVP?",
              answer:
                "Our Zero to MVP package delivers a live, showcase-ready product in 10–14 days, including consultation, core features, source code, and ownership transfer.",
            },
            {
              question: "What does web development cost at Nodewise?",
              answer:
                "Starter packages start at ₹12,000–15,000 INR. Growth packages from ₹25,000+. Enterprise architecture is custom-quoted. Zero to MVP is a fixed ₹29,999.",
            },
            {
              question: "What does Nodewise build?",
              answer:
                "Custom web platforms, high-converting landing pages, startup MVPs, business portals, dashboards, and automation software.",
            },
          ]),
        ]}
      />
      <HomeMotion />

      <section id="hero" className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title" id="hero-main-title">
              Ship a live MVP in 10–14 days
            </h1>
            <p className="hero-offer" id="hero-offer-line">
              Zero to MVP from ₹29,999 — full source code and ownership transfer.
            </p>
            <ul className="hero-subtitle" id="hero-sub-text">
              <li>Showcase-ready web app you can demo to users or investors</li>
              <li>Fixed scope, fixed price, India-based — worldwide delivery</li>
              <li>Consultation, core build, live deploy, and two revision rounds</li>
            </ul>
            <div className="hero-ctas">
              <a
                href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Zero%20to%20MVP%20package%20(%E2%82%B929%2C999)."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="btn-hero-start-mvp"
              >
                <span>Start Your MVP</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight className="btn-icon" aria-hidden="true" />
              </a>
              <Link
                href="/portfolio"
                className="btn btn-secondary"
                id="btn-hero-view-work"
              >
                <span>View Our Work</span>
              </Link>
              <Link
                href="/contact"
                className="link-cta"
                id="link-hero-consult"
              >
                <span>Schedule a Consultation</span>
                <Calendar className="link-icon" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <HeroStage />
          </div>
        </div>
      </section>

      <section
        id="zero-to-mvp-highlight"
        className="mvp-highlight-section"
        style={{ paddingTop: "5rem", paddingBottom: "2rem" }}
      >
        <div className="container">
          <div className="mvp-highlight-card">
            <div className="mvp-highlight-content">
              <p className="mvp-product-name">Zero to MVP</p>
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>
                Turn your idea into a working product in just 10–14 days
              </h2>
              <p className="mvp-highlight-desc">
                Get a live, showcase-ready Minimum Viable Product (MVP) that you
                can show to users, investors, or test in the market. Perfect for
                early-stage founders.
              </p>

              <div className="mvp-feature-grid">
                <div className="mvp-feature-column">
                  <h3
                    style={{
                      color: "var(--text-light)",
                      marginBottom: "1rem",
                      fontSize: "1.1rem",
                    }}
                  >
                    What You Get
                  </h3>
                  <ul className="mvp-feature-list included">
                    <li>
                      <Check className="icon-check" size={16} aria-hidden="true" />{" "}
                      <span>30-minute idea consultation</span>
                    </li>
                    <li>
                      <Check className="icon-check" size={16} aria-hidden="true" />{" "}
                      <span>Core MVP with essential features</span>
                    </li>
                    <li>
                      <Check className="icon-check" size={16} aria-hidden="true" />{" "}
                      <span>Clean, responsive web app (live)</span>
                    </li>
                    <li>
                      <Check className="icon-check" size={16} aria-hidden="true" />{" "}
                      <span>Full source code + docs</span>
                    </li>
                    <li>
                      <Check className="icon-check" size={16} aria-hidden="true" />{" "}
                      <span>Complete ownership transferred</span>
                    </li>
                    <li>
                      <Check className="icon-check" size={16} aria-hidden="true" />{" "}
                      <span>2 rounds of revisions</span>
                    </li>
                  </ul>
                </div>
                <div className="mvp-feature-column">
                  <h3
                    style={{
                      color: "var(--text-light)",
                      marginBottom: "1rem",
                      fontSize: "1.1rem",
                    }}
                  >
                    Not Included
                  </h3>
                  <ul className="mvp-feature-list excluded">
                    <li>
                      <X className="icon-x" size={16} aria-hidden="true" />{" "}
                      <span>Complex enterprise integrations</span>
                    </li>
                    <li>
                      <X className="icon-x" size={16} aria-hidden="true" />{" "}
                      <span>Native mobile apps</span>
                    </li>
                    <li>
                      <X className="icon-x" size={16} aria-hidden="true" />{" "}
                      <span>Massive scalable cloud architecture</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mvp-highlight-pricing">
              <div className="mvp-pricing-box">
                <p
                  className="mvp-price-big"
                  style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}
                >
                  ₹29,999
                </p>
                <span className="mvp-price-label">(one-time)</span>

                <div className="mvp-timeline-box">
                  <Clock size={16} aria-hidden="true" />
                  <span>
                    <strong>Timeline:</strong> 10–14 days
                  </span>
                </div>

                <a
                  href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Zero%20to%20MVP%20package%20(%E2%82%B929%2C999)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mvp-cta-btn"
                  id="lnk-home-mvp-whatsapp"
                >
                  <span>Start Your MVP</span>
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                  <ArrowRight className="btn-icon" aria-hidden="true" />
                </a>
                <Link
                  href="/zero-to-mvp"
                  className="mvp-learn-more-link"
                  id="lnk-home-mvp-details"
                >
                  View Full MVP Details &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="packages"
        className="packages-section"
        style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
      >
        <div className="container">
          <div className="section-header center" data-reveal>
            <h2 className="section-title">Service Packages</h2>
            <p className="packages-pricing-note">Transparent Pricing</p>
          </div>
          <div className="packages-grid" data-reveal-stagger>
            <div className="package-card" id="package-minimum" data-reveal-item>
              <span className="package-badge">Minimum</span>
              <h3 className="package-title">Starter Foundation</h3>
              <div className="package-price">
                12k - 15k <span>INR</span>
              </div>
              <p className="package-desc">
                Ideal for small businesses launching their first digital
                footprint.
              </p>

              <ul className="package-features">
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Basic Web Development</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Simple Landing Pages</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Entry-level SEO Setup</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Basic Marketing Setup</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Initial Architecture Consultation</span>
                </li>
              </ul>

              <a
                href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Minimum%20package%20(12-15k%20INR)."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary package-btn"
              >
                <span>Inquire via WhatsApp</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight className="btn-icon" aria-hidden="true" />
              </a>
            </div>

            <div
              className="package-card highlighted"
              id="package-standard"
              data-reveal-item
            >
              <span className="package-badge">Standard</span>
              <h3 className="package-title">Growth Engine</h3>
              <div className="package-price">
                25k+ <span>INR</span>
              </div>
              <p className="package-desc">
                For growing ventures needing optimized funnels and light
                automation.
              </p>

              <ul className="package-features">
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Full Custom Web Development</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Moderate Custom Solutions</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Basic–Medium Dashboards & Portals</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>SEO + Conversion-focused Marketing</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Light Workflow Automation</span>
                </li>
              </ul>

              <a
                href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Standard%20package%20(25k%2B%20INR)."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary package-btn"
              >
                <span>Inquire via WhatsApp</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight className="btn-icon" aria-hidden="true" />
              </a>
            </div>

            <div
              className="package-card"
              id="package-enterprise"
              data-reveal-item
            >
              <span className="package-badge">Enterprise</span>
              <h3 className="package-title">Full Architecture</h3>
              <div className="package-price">
                Custom <span>Pricing</span>
              </div>
              <p className="package-desc">
                Advanced software and multi-user portals for large-scale
                operations.
              </p>

              <ul className="package-features">
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Advanced Custom Software Platforms</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Complex Dashboards & Multi-user Portals</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Heavy Workflow Automation</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Strategic Consultation & Integrations</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />{" "}
                  <span>Ongoing Technical Support</span>
                </li>
              </ul>

              <a
                href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Enterprise%20custom%20software%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary package-btn"
              >
                <span>Inquire via WhatsApp</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight className="btn-icon" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner-section" data-reveal>
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need a Custom Quote?</h2>
              <p className="cta-banner-text">
                Unsure which tier fits? Let&apos;s discuss your project.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Contact Us</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
