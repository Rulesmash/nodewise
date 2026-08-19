import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  PAGE_SEO,
  SCHEMA_IDS,
  breadcrumbJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata("packages");

export default function Packages() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.packages.title,
            description: PAGE_SEO.packages.description,
            path: "/packages",
            type: "CollectionPage",
            mainEntity: { "@id": SCHEMA_IDS.offerCatalog },
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/packages" },
          ]),
        ]}
      />
      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Pricing</h1>
            <p className="page-hero-subtitle">
              Website development, custom software, and platforms for startups and B2B.
            </p>
          </div>
        </div>
      </section>

      {/*  Section: Packages  */}
      <section id="packages" className="packages-section" style={{ paddingTop: "1rem", paddingBottom: "4rem" }}>
        <div className="container">
          <div className="packages-grid">

            <div className="package-card" id="package-minimum">
              <h3 className="package-title">Landing Pages</h3>
              <div className="package-price">12k - 15k <span>INR</span></div>
              <p className="package-desc">Professional B2B landing pages and a first web presence.</p>

              <ul className="package-features">
                <li><Check aria-hidden="true" /> <span>Basic Web Development</span></li>
                <li><Check aria-hidden="true" /> <span>Simple Landing Pages</span></li>
                <li><Check aria-hidden="true" /> <span>Entry-level SEO Setup</span></li>
                <li><Check aria-hidden="true" /> <span>Basic Marketing Setup</span></li>
                <li><Check aria-hidden="true" /> <span>Initial Architecture Consultation</span></li>
              </ul>

              <a href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20Landing%20Pages%20(12-15k%20INR)."
                target="_blank" rel="noopener noreferrer" className="btn btn-secondary package-btn">
                <span>Inquire via WhatsApp</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight className="btn-icon" aria-hidden="true" />
              </a>
            </div>

            <div className="package-card highlighted" id="package-standard">
              <h3 className="package-title">Business Software</h3>
              <div className="package-price">25k+ <span>INR</span></div>
              <p className="package-desc">Custom site plus light automation.</p>

              <ul className="package-features">
                <li><Check aria-hidden="true" /> <span>Full Custom Web Development</span></li>
                <li><Check aria-hidden="true" /> <span>Moderate Custom Solutions</span></li>
                <li><Check aria-hidden="true" /> <span>Basic–Medium Dashboards & Portals</span></li>
                <li><Check aria-hidden="true" /> <span>SEO + Conversion-focused Marketing</span></li>
                <li><Check aria-hidden="true" /> <span>Light Workflow Automation</span></li>
              </ul>

              <a href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20Business%20Software%20(25k%2B%20INR)."
                target="_blank" rel="noopener noreferrer" className="btn btn-primary package-btn">
                <span>Inquire via WhatsApp</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight className="btn-icon" aria-hidden="true" />
              </a>
            </div>

            <div className="package-card" id="package-enterprise">
              <h3 className="package-title">Custom Platforms</h3>
              <div className="package-price">Custom <span>Pricing</span></div>
              <p className="package-desc">Multi-user platforms and integrations.</p>

              <ul className="package-features">
                <li><Check aria-hidden="true" /> <span>Advanced Custom Software Platforms</span></li>
                <li><Check aria-hidden="true" /> <span>Complex Dashboards & Multi-user Portals</span></li>
                <li><Check aria-hidden="true" /> <span>Heavy Workflow Automation</span></li>
                <li><Check aria-hidden="true" /> <span>Strategic Consultation & Integrations</span></li>
                <li><Check aria-hidden="true" /> <span>Ongoing Technical Support</span></li>
              </ul>

              <a href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20Custom%20Platforms."
                target="_blank" rel="noopener noreferrer" className="btn btn-secondary package-btn">
                <span>Inquire via WhatsApp</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight className="btn-icon" aria-hidden="true" />
              </a>
            </div>

          </div>
        </div>
      </section>

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need a timed MVP instead?</h2>
              <p className="cta-banner-text">
                Zero to MVP is ₹29,999 in 10–14 days, with source and ownership.
              </p>
            </div>
            <Link href="/zero-to-mvp" className="btn btn-secondary cta-banner-btn">
              <span>Zero to MVP details</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/*  CTA Banner  */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need a custom quote?</h2>
              <p className="cta-banner-text">Unsure whether you need a landing page or software? We&apos;ll map it in a short call.</p>
            </div>
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Contact Us</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    
    </>
  );
}
