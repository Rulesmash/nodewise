import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import HeroGlassCards from "@/components/HeroGlassCards";
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
});
const HomeMotion = dynamic(() => import("@/components/HomeMotion"), {
  ssr: false,
});

export const metadata: Metadata = buildMetadata({
  title: "B2B Landing Pages and Business Software in India",
  description:
    "Nodewise builds professional B2B landing pages and business software. Landing pages 12k–15k INR. Software from 25k+. Custom platforms quoted. Transparent pricing. Worldwide delivery.",
  path: "/",
  keywords: [
    "B2B landing pages India",
    "business software development",
    "custom web platforms",
    "INR web development pricing",
    "professional landing page",
  ],
});

export default function Home() {
  return (
    <div className="home-page">
      <JsonLd
        data={[
          webPageJsonLd({
            title: "B2B Landing Pages and Business Software in India",
            description:
              "Nodewise builds professional B2B landing pages and business software. Published INR pricing. India-based, worldwide delivery.",
            path: "/",
          }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
          serviceJsonLd({
            name: "Landing Pages",
            description:
              "Professional B2B landing pages and first-site web presence.",
            path: "/packages",
            price: 12000,
            priceMax: 15000,
          }),
          faqJsonLd([
            {
              question: "What does Nodewise build?",
              answer:
                "Professional B2B landing pages, custom web platforms, business portals, dashboards, and automation software.",
            },
            {
              question: "What does web development cost at Nodewise?",
              answer:
                "Landing pages are 12k–15k INR. Business software from 25k+. Custom platforms are quoted. Zero to MVP remains a fixed ₹29,999 timed package.",
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
              Professional B2B sites from 12k–15k INR. Software from 25k+. Source you own.
            </p>
          </div>
          <ul className="hero-subtitle" id="hero-sub-text">
            <li>Conversion-focused landing pages for companies</li>
            <li>Custom platforms, portals, dashboards, and automation</li>
            <li>India-based studio. Worldwide delivery</li>
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
