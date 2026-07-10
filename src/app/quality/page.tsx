import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Quality Standards | Performance, Security & Clean Code",
  description: "Nodewise's commitment to quality: optimized performance, robust security, and clean, scalable code architecture.",
};

export default function Quality() {
  return (
    <>

      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-subtitle">Our Standards</span>
            <h1 className="page-hero-title">Work Quality</h1>
            <p className="page-hero-subtitle">
              How we define premium engineering and what you can expect from our software.
            </p>
          </div>
        </div>
      </section>

      {/*  Section: Work Quality  */}
      <section id="quality" className="quality-section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="grid quality-grid">
            {/*  Quality Block 1  */}
            <div className="quality-item" id="quality-item-hackathon">
              <div className="quality-num">01</div>
              <div className="quality-details">
                <h3 className="quality-title">Rapid, High-Fidelity Execution</h3>
                <p className="quality-description">
                  Our roots are grounded in competitive, high-intensity technical hackathons. This background trained
                  our team to engineer advanced logic, clean interfaces, and scalable system architectures rapidly
                  without compromising stability.
                </p>
              </div>
            </div>

            {/*  Quality Block 2  */}
            <div className="quality-item" id="quality-item-architecture">
              <div className="quality-num">02</div>
              <div className="quality-details">
                <h3 className="quality-title">Clean Architectural Hygiene</h3>
                <p className="quality-description">
                  We don't rely on generic page builders or clunky, bloated templates. Every line of code we write is
                  custom, optimized for lightning-fast page speeds, mobile responsiveness, and clean code maintenance.
                </p>
              </div>
            </div>

            {/*  Quality Block 3  */}
            <div className="quality-item" id="quality-item-jargon">
              <div className="quality-num">03</div>
              <div className="quality-details">
                <h3 className="quality-title">Zero Technical Jargon</h3>
                <p className="quality-description">
                  We speak the language of business growth, not confusing code languages. We focus entirely on how our
                  software creates operational efficiency, establishes your market authority, and unlocks new paths to
                  profit.
                </p>
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
              <h2 className="cta-banner-title">Experience the Difference</h2>
              <p className="cta-banner-text">Let's build a platform that meets the highest standards.</p>
            </div>
            <a href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Start Your Project</span>
              <ArrowRight className="btn-icon" />
            </a>
          </div>
        </div>
      </section>
    
    </>
  );
}
