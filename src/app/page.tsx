import Link from "next/link";
import { ArrowRight, Calendar, Check, X, Clock } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nodewise | Custom Web Platforms & Business Software",
  description: "We build reliable, high-performance web platforms and custom software engineered to maximize your profitability.",
};

export default function Home() {
  return (
    <>
      {/* Section I: Hero Section */}
      <section id="hero" className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title" id="hero-main-title">
              Smarter Code. Better Solutions.
            </h1>
            <div className="hero-subtitle" id="hero-sub-text">
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                <li style={{ marginBottom: "0.5rem" }}>▪ High-performance custom web platforms</li>
                <li style={{ marginBottom: "0.5rem" }}>▪ Reliable software engineered for growth</li>
                <li>▪ Premium code built for maximum profitability</li>
              </ul>
            </div>
            <div className="hero-ctas">
              <Link href="/portfolio" className="btn btn-primary" id="btn-hero-view-work">
                <span>View Our Work</span>
                <ArrowRight className="btn-icon" />
              </Link>
              <Link href="/contact" className="link-cta" id="link-hero-consult">
                <span>Schedule a Consultation</span>
                <Calendar className="link-icon" />
              </Link>
            </div>
          </div>
          <div className="hero-visual">
          </div>
        </div>
      </section>

      {/* Section: Zero to MVP Highlight */}
      <section id="zero-to-mvp-highlight" className="mvp-highlight-section" style={{ paddingTop: "5rem", paddingBottom: "2rem" }}>
        <div className="container">
          <div className="mvp-highlight-card">
            <div className="mvp-highlight-content">
              <span className="section-subtitle">Zero to MVP</span>
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>Turn your idea into a working product in just 10–14 days</h2>
              <p className="mvp-highlight-desc">Get a live, showcase-ready Minimum Viable Product (MVP) that you can show to users, investors, or test in the market. Perfect for early-stage founders.</p>
              
              <div className="mvp-feature-grid">
                <div className="mvp-feature-column">
                  <h4 style={{ color: "var(--text-light)", marginBottom: "1rem" }}>What You Get</h4>
                  <ul className="mvp-feature-list included">
                    <li><Check className="icon-check" size={16} /> <span>30-minute idea consultation</span></li>
                    <li><Check className="icon-check" size={16} /> <span>Core MVP with essential features</span></li>
                    <li><Check className="icon-check" size={16} /> <span>Clean, responsive web app (live)</span></li>
                    <li><Check className="icon-check" size={16} /> <span>Full source code + docs</span></li>
                    <li><Check className="icon-check" size={16} /> <span>Complete ownership transferred</span></li>
                    <li><Check className="icon-check" size={16} /> <span>2 rounds of revisions</span></li>
                  </ul>
                </div>
                <div className="mvp-feature-column">
                  <h4 style={{ color: "var(--text-light)", marginBottom: "1rem" }}>Not Included</h4>
                  <ul className="mvp-feature-list excluded">
                    <li><X className="icon-x" size={16} /> <span>Complex enterprise integrations</span></li>
                    <li><X className="icon-x" size={16} /> <span>Native mobile apps</span></li>
                    <li><X className="icon-x" size={16} /> <span>Massive scalable cloud architecture</span></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mvp-highlight-pricing">
              <div className="mvp-pricing-box">
                <h3 className="mvp-price-big">₹9,599</h3>
                <span className="mvp-price-label">(one-time)</span>
                
                <div className="mvp-timeline-box">
                  <Clock size={16} />
                  <span><strong>Timeline:</strong> 10–14 days</span>
                </div>
                
                <a href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Zero%20to%20MVP%20package%20(%E2%82%B99%2C599)."
                  target="_blank" rel="noopener noreferrer" className="btn btn-primary mvp-cta-btn" id="lnk-home-mvp-whatsapp">
                  <span>Start Your MVP</span>
                  <ArrowRight className="btn-icon" />
                </a>
                <Link href="/zero-to-mvp" className="mvp-learn-more-link" id="lnk-home-mvp-details">
                  View Full MVP Details &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Packages */}
      <section id="packages" className="packages-section" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-subtitle">Transparent Pricing</span>
            <h2 className="section-title">Service Packages</h2>
            <div className="section-divider"></div>
          </div>
          <div className="packages-grid">

            {/* Tier 1: Minimum */}
            <div className="package-card" id="package-minimum">
              <span className="package-badge">Minimum</span>
              <h3 className="package-title">Starter Foundation</h3>
              <div className="package-price">12k - 15k <span>INR</span></div>
              <p className="package-desc">Ideal for small businesses launching their first digital footprint.</p>

              <ul className="package-features">
                <li><Check size={16} /> <span>Basic Web Development</span></li>
                <li><Check size={16} /> <span>Simple Landing Pages</span></li>
                <li><Check size={16} /> <span>Entry-level SEO Setup</span></li>
                <li><Check size={16} /> <span>Basic Marketing Setup</span></li>
                <li><Check size={16} /> <span>Initial Architecture Consultation</span></li>
              </ul>

              <a href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Minimum%20package%20(12-15k%20INR)."
                target="_blank" rel="noopener noreferrer" className="btn btn-secondary package-btn">
                <span>Inquire via WhatsApp</span>
                <ArrowRight className="btn-icon" />
              </a>
            </div>

            {/* Tier 2: Standard (Highlighted) */}
            <div className="package-card highlighted" id="package-standard">
              <span className="package-badge">Standard</span>
              <h3 className="package-title">Growth Engine</h3>
              <div className="package-price">25k+ <span>INR</span></div>
              <p className="package-desc">For growing ventures needing optimized funnels and light automation.</p>

              <ul className="package-features">
                <li><Check size={16} /> <span>Full Custom Web Development</span></li>
                <li><Check size={16} /> <span>Moderate Custom Solutions</span></li>
                <li><Check size={16} /> <span>Basic–Medium Dashboards & Portals</span></li>
                <li><Check size={16} /> <span>SEO + Conversion-focused Marketing</span></li>
                <li><Check size={16} /> <span>Light Workflow Automation</span></li>
              </ul>

              <a href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Standard%20package%20(25k%2B%20INR)."
                target="_blank" rel="noopener noreferrer" className="btn btn-primary package-btn">
                <span>Inquire via WhatsApp</span>
                <ArrowRight className="btn-icon" />
              </a>
            </div>

            {/* Tier 3: Enterprise */}
            <div className="package-card" id="package-enterprise">
              <span className="package-badge">Enterprise</span>
              <h3 className="package-title">Full Architecture</h3>
              <div className="package-price">Custom <span>Pricing</span></div>
              <p className="package-desc">Advanced software and multi-user portals for large-scale operations.</p>

              <ul className="package-features">
                <li><Check size={16} /> <span>Advanced Custom Software Platforms</span></li>
                <li><Check size={16} /> <span>Complex Dashboards & Multi-user Portals</span></li>
                <li><Check size={16} /> <span>Heavy Workflow Automation</span></li>
                <li><Check size={16} /> <span>Strategic Consultation & Integrations</span></li>
                <li><Check size={16} /> <span>Ongoing Technical Support</span></li>
              </ul>

              <a href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Enterprise%20custom%20software%20package."
                target="_blank" rel="noopener noreferrer" className="btn btn-secondary package-btn">
                <span>Inquire via WhatsApp</span>
                <ArrowRight className="btn-icon" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need a Custom Quote?</h2>
              <p className="cta-banner-text">Unsure which tier fits? Let's discuss your project.</p>
            </div>
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Contact Us</span>
              <ArrowRight className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
