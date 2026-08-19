import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import HeroGlassCards from "@/components/HeroGlassCards";
import {
  PAGE_SEO,
  SCHEMA_IDS,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";
import "./home.css";

const HeroStage = dynamic(() => import("@/components/HeroStage"), {
  ssr: false,
});
const HomeMotion = dynamic(() => import("@/components/HomeMotion"), {
  ssr: false,
});

export const metadata: Metadata = pageMetadata("home");

export default function Home() {
  return (
    <div className="home-page">
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.home.title,
            description: PAGE_SEO.home.description,
            path: "/",
            mainEntity: [
              { "@id": SCHEMA_IDS.landingPageService },
              { "@id": SCHEMA_IDS.softwareStudioService },
              { "@id": SCHEMA_IDS.websiteDevelopmentService },
              { "@id": SCHEMA_IDS.softwareDevelopmentService },
            ],
          }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
          faqJsonLd([
            {
              question: "How do I request a landing page?",
              answer:
                "WhatsApp +91 94469 98827, email contact@nodewise.cc, or send a brief on the contact page. B2B landing pages are ₹12,000–15,000 INR.",
            },
            {
              question: "Is Nodewise a software studio?",
              answer:
                "Yes. Nodewise is an India-based software studio that builds B2B landing pages, custom web platforms, and business software, delivered worldwide.",
            },
            {
              question: "Do you build websites for startups and new businesses?",
              answer:
                "Yes. Nodewise builds professional websites and landing pages for starting businesses and B2B companies. Website packages start at 12k–15k INR.",
            },
            {
              question: "Do you build custom software for B2B companies?",
              answer:
                "Yes. We build custom software, portals, dashboards, and light automation for B2B teams. Software work starts from 25k INR. Custom platforms are quoted.",
            },
            {
              question: "What does Nodewise build?",
              answer:
                "Website development and custom software development: B2B landing pages, company sites, web platforms, portals, dashboards, and automation software.",
            },
            {
              question: "What does website and software development cost?",
              answer:
                "Websites and landing pages are 12k–15k INR. Custom software from 25k+. Custom platforms are quoted. Zero to MVP remains a fixed ₹29,999 timed package.",
            },
            {
              question: "Do you still offer Zero to MVP?",
              answer:
                "Yes. Zero to MVP is a timed founder package at ₹29,999 in 10–14 days, with source code and ownership. It is listed separately from landing pages and business software.",
            },
          ]),
        ]}
      />
      <HomeMotion />

      <section id="hero" className="hero-section">
        <div className="container hero-container">
          <div className="hero-content hero-copy">
            <h1 className="hero-title" id="hero-main-title">
              Landing pages and business software
            </h1>
            <p className="hero-offer" id="hero-offer-line">
              For startups and B2B. Sites from 12k–15k INR. Software from 25k+. Source you own.
            </p>
          </div>
          <ul className="hero-subtitle" id="hero-sub-text">
            <li>Websites and landing pages for new businesses and B2B companies</li>
            <li>Custom software, portals, dashboards, and automation</li>
            <li>India-based software studio. Worldwide delivery</li>
          </ul>
          <div className="hero-ctas">
            <Link
              href="/portfolio"
              className="btn btn-primary"
              id="btn-hero-view-work"
            >
              <span>View our work</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
            <a
              href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%20need%20a%20B2B%20landing%20page%20or%20business%20software."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              id="btn-hero-start-mvp"
            >
              <span>Discuss a project</span>
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </a>
          </div>
          <div className="hero-visual">
            <div className="hero-stage" data-size="lg">
              <HeroStage />
              <div className="hero-stage-glow" aria-hidden="true" />
              <HeroGlassCards />
            </div>
          </div>
        </div>
      </section>

      <section
        id="packages"
        className="packages-section"
        style={{ paddingTop: "5rem", paddingBottom: "2rem" }}
      >
        <div className="container">
          <div className="section-header center" data-reveal>
            <h2 className="section-title">Packages</h2>
            <p className="packages-pricing-note">INR pricing, published up front</p>
          </div>
          <div className="packages-grid" data-reveal-stagger>
            <div className="package-card" id="package-minimum" data-reveal-item>
              <h3 className="package-title">Landing Pages</h3>
              <div className="package-price">
                12k - 15k <span>INR</span>
              </div>
              <p className="package-desc">
                Professional B2B landing pages and a first web presence.
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
                href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20Landing%20Pages%20(12-15k%20INR)."
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
              <h3 className="package-title">Business Software</h3>
              <div className="package-price">
                25k+ <span>INR</span>
              </div>
              <p className="package-desc">
                Custom site plus light automation.
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
                href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20Business%20Software%20(25k%2B%20INR)."
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
              <h3 className="package-title">Custom Platforms</h3>
              <div className="package-price">
                Custom <span>Pricing</span>
              </div>
              <p className="package-desc">
                Multi-user platforms and integrations.
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
                href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20Custom%20Platforms."
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
              <h2 className="cta-banner-title">Need a timed MVP instead?</h2>
              <p className="cta-banner-text">
                Zero to MVP is ₹29,999 in 10–14 days, with source and ownership.
              </p>
            </div>
            <Link
              href="/zero-to-mvp"
              className="btn btn-secondary cta-banner-btn"
              id="lnk-home-mvp-details"
            >
              <span>Zero to MVP details</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-banner-section" data-reveal>
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need a custom quote?</h2>
              <p className="cta-banner-text">
                Unsure whether you need a landing page or software? We&apos;ll map it in a short call.
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
