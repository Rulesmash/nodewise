import Link from "next/link";
import { Zap, Target, TrendingUp, Linkedin, ArrowRight } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Nodewise | Agile Digital Product Studio",
  description: "Learn about Nodewise, a multi-disciplinary digital product studio engineering custom, lightning-fast digital assets.",
};

export default function About() {
  return (
    <>
      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-subtitle">Who We Are</span>
            <h1 className="page-hero-title">About Nodewise</h1>
            <p className="page-hero-subtitle">
              A small, sharp team building digital products that drive real business results.
            </p>
          </div>
        </div>
      </section>

      {/*  Brand Summary  */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="grid about-grid">
            <div className="about-visual">
              <img src="/assets/logo-full.png" alt="Nodewise Logo" />
            </div>
            <div className="about-content">
              <span className="section-subtitle">The Brand</span>
              <h2 className="section-title">Built for Results</h2>
              <p className="about-lead-text">
                We build high-performance web platforms and custom software tools engineered for business growth.
              </p>
              <div className="about-highlights">
                <div className="about-highlight-item">
                  <Zap className="about-highlight-icon" aria-hidden="true" />
                  <span>Lightning-fast, custom-coded platforms</span>
                </div>
                <div className="about-highlight-item">
                  <Target className="about-highlight-icon" aria-hidden="true" />
                  <span>Conversion-focused design & UX</span>
                </div>
                <div className="about-highlight-item">
                  <TrendingUp className="about-highlight-icon" aria-hidden="true" />
                  <span>Scalable solutions for growing businesses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  Founders  */}
      <section id="team" className="team-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Founders</h2>
            <div className="section-divider"></div>
            <p className="section-lead-desc">
              Hackathon-trained builders who ship fast and deliver high-performance results.
            </p>
          </div>

          <div className="grid team-grid">
            {/*  Founder 1  */}
            <div className="founder-card card" id="founder-induchoodan">
              <a href="https://www.linkedin.com/in/induchoodan-v-s-027513291" target="_blank" rel="noopener noreferrer"
                className="founder-avatar-link" aria-label="Induchoodan V S on LinkedIn">
                <span className="sr-only">(opens in a new tab)</span>
                <div className="founder-avatar">
                  <div className="founder-avatar-image-container">
                    <img src="/assets/induchoodan.png" alt="Induchoodan V S" className="founder-photo" />
                  </div>
                  <div className="founder-linkedin-badge">
                    <Linkedin className="badge-icon" aria-hidden="true" />
                  </div>
                </div>
              </a>
              <h3 className="founder-name">Induchoodan V S</h3>
            </div>

            {/*  Founder 2  */}
            <div className="founder-card card" id="founder-aalif">
              <a href="https://www.linkedin.com/in/aalif-mohammad-r-s?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank" rel="noopener noreferrer" className="founder-avatar-link" aria-label="Aalif Mohammad R S on LinkedIn">
                <span className="sr-only">(opens in a new tab)</span>
                <div className="founder-avatar">
                  <div className="founder-avatar-image-container">
                    <img src="/assets/aalif.png" alt="Aalif Mohammad R S" className="founder-photo" />
                  </div>
                  <div className="founder-linkedin-badge">
                    <Linkedin className="badge-icon" aria-hidden="true" />
                  </div>
                </div>
              </a>
              <h3 className="founder-name">Aalif Mohammad R S</h3>
            </div>
          </div>
        </div>
      </section>

      {/*  CTA Banner  */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Let's Build Something Great</h2>
              <p className="cta-banner-text">Have a project in mind? Let's talk about how we can help you grow.</p>
            </div>
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Get in Touch</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    
    </>
  );
}
