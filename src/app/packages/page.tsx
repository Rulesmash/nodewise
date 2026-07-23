import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pricing & Packages | Transparent Web Development Cost",
  description: "View Nodewise's transparent pricing for custom websites, growth engines, and enterprise web architecture.",
};

export default function Packages() {
  return (
    <>

      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-subtitle">Transparent Pricing</span>
            <h1 className="page-hero-title">Service Packages</h1>
            <p className="page-hero-subtitle">
              Choose the right tier to scale your operations, from basic web presence to advanced enterprise software.
            </p>
          </div>
        </div>
      </section>

      {/*  Section: Packages  */}
      <section id="packages" className="packages-section" style={{ paddingTop: "1rem", paddingBottom: "4rem" }}>
        <div className="container">
          <div className="packages-grid">

            {/*  Tier 1: Minimum  */}
            <div className="package-card" id="package-minimum">
              <span className="package-badge">Minimum</span>
              <h3 className="package-title">Starter Foundation</h3>
              <div className="package-price">12k - 15k <span>INR</span></div>
              <p className="package-desc">Perfect for small businesses establishing their first premium digital footprint.
              </p>

              <ul className="package-features">
                <li><Check aria-hidden="true" /> <span>Basic Web Development</span></li>
                <li><Check aria-hidden="true" /> <span>Simple Landing Pages</span></li>
                <li><Check aria-hidden="true" /> <span>Entry-level SEO Setup</span></li>
                <li><Check aria-hidden="true" /> <span>Basic Marketing Setup</span></li>
                <li><Check aria-hidden="true" /> <span>Initial Architecture Consultation</span></li>
              </ul>

              <a href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Minimum%20package%20(12-15k%20INR)."
                target="_blank" rel="noopener noreferrer" className="btn btn-secondary package-btn">
                <span>Inquire via WhatsApp</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight className="btn-icon" aria-hidden="true" />
              </a>
            </div>

            {/*  Tier 2: Standard (Highlighted)  */}
            <div className="package-card highlighted" id="package-standard">
              <span className="package-badge">Standard</span>
              <h3 className="package-title">Growth Engine</h3>
              <div className="package-price">25k+ <span>INR</span></div>
              <p className="package-desc">For growing ventures that need optimized conversion funnels and light automation.
              </p>

              <ul className="package-features">
                <li><Check aria-hidden="true" /> <span>Full Custom Web Development</span></li>
                <li><Check aria-hidden="true" /> <span>Moderate Custom Solutions</span></li>
                <li><Check aria-hidden="true" /> <span>Basic–Medium Dashboards & Portals</span></li>
                <li><Check aria-hidden="true" /> <span>SEO + Conversion-focused Marketing</span></li>
                <li><Check aria-hidden="true" /> <span>Light Workflow Automation</span></li>
              </ul>

              <a href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Standard%20package%20(25k%2B%20INR)."
                target="_blank" rel="noopener noreferrer" className="btn btn-primary package-btn">
                <span>Inquire via WhatsApp</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight className="btn-icon" aria-hidden="true" />
              </a>
            </div>

            {/*  Tier 3: Enterprise  */}
            <div className="package-card" id="package-enterprise">
              <span className="package-badge">Enterprise</span>
              <h3 className="package-title">Full Architecture</h3>
              <div className="package-price">Custom <span>Pricing</span></div>
              <p className="package-desc">Advanced custom software and complex multi-user portals for large-scale
                operations.</p>

              <ul className="package-features">
                <li><Check aria-hidden="true" /> <span>Advanced Custom Software Platforms</span></li>
                <li><Check aria-hidden="true" /> <span>Complex Dashboards & Multi-user Portals</span></li>
                <li><Check aria-hidden="true" /> <span>Heavy Workflow Automation</span></li>
                <li><Check aria-hidden="true" /> <span>Strategic Consultation & Integrations</span></li>
                <li><Check aria-hidden="true" /> <span>Ongoing Technical Support</span></li>
              </ul>

              <a href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Enterprise%20custom%20software%20package."
                target="_blank" rel="noopener noreferrer" className="btn btn-secondary package-btn">
                <span>Inquire via WhatsApp</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight className="btn-icon" aria-hidden="true" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/*  CTA Banner  */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need a Custom Quote?</h2>
              <p className="cta-banner-text">If you're unsure which tier fits your project, let's discuss it directly.</p>
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
