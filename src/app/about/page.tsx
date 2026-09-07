import Link from "next/link";
import { Linkedin, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  PAGE_SEO,
  SCHEMA_IDS,
  SITE,
  absoluteUrl,
  breadcrumbJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata("about");

export default function About() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.about.title,
            description: PAGE_SEO.about.description,
            path: "/about",
            type: "AboutPage",
            mainEntity: { "@id": SCHEMA_IDS.organization },
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Studio", path: "/about" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@id": `${SITE.url}/#organization`,
            },
            mentions: SITE.founders.map((f) => ({
              "@type": "Person",
              name: f.name,
              url: f.url,
              image: absoluteUrl(f.image),
              jobTitle: "Founder",
              worksFor: { "@id": `${SITE.url}/#organization` },
              sameAs: [f.url],
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How Nodewise builds websites and web applications",
            description:
              "How the studio takes a website or web application from scope to handover.",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Scope",
                text: "Goals, constraints, and a published price in one conversation.",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Build",
                text: "Next.js, Node, and PostgreSQL in focused sprints. No WordPress.",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Handover",
                text: "Deploy on Vercel, hand over the repository, you operate it.",
              },
            ],
          },
        ]}
      />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">The studio</h1>
            <p className="page-hero-subtitle">
              Two founders. Premium web development from Kerala. AI SEO
              included. Worldwide delivery.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <div className="grid about-grid">
            <div className="about-visual">
              <img src="/assets/logo-full.png" alt="Nodewise" />
            </div>
            <div className="about-content">
              <h2 className="section-title">What we do</h2>
              <p className="about-lead-text">
                Nodewise is a Kerala software studio. We write Next.js and
                Node. We do not use WordPress or page builders. You receive
                the repository and run the product.
              </p>
              <ul className="scan-list">
                <li>
                  Custom architecture.{" "}
                  <Link href="/premium-web-development">
                    Premium web development
                  </Link>
                  , no theme.
                </li>
                <li>
                  Vercel deploys. Fast loads,{" "}
                  <Link href="/ai-seo">AI SEO</Link>, no retainer to patch.
                </li>
                <li>
                  <Link href="/website-developers-kerala">
                    Website developers in Kerala
                  </Link>
                  . Scope and price before we write code.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="team-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Founders</h2>
            <p className="section-lead-desc">
              Induchoodan V S and Aalif Mohammad R S. We build the work.
            </p>
          </div>

          <div className="grid team-grid">
            <div className="founder-card card" id="founder-induchoodan">
              <a
                href="https://www.linkedin.com/in/induchoodan-v-s-027513291"
                target="_blank"
                rel="noopener noreferrer"
                className="founder-avatar-link"
                aria-label="Induchoodan V S on LinkedIn"
              >
                <span className="sr-only">(opens in a new tab)</span>
                <div className="founder-avatar">
                  <div className="founder-avatar-image-container">
                    <img
                      src="/assets/induchoodan.png"
                      alt="Induchoodan V S"
                      className="founder-photo"
                    />
                  </div>
                  <div className="founder-linkedin-badge">
                    <Linkedin className="badge-icon" aria-hidden="true" />
                  </div>
                </div>
              </a>
              <h3 className="founder-name">Induchoodan V S</h3>
            </div>

            <div className="founder-card card" id="founder-aalif">
              <a
                href="https://www.linkedin.com/in/aalif-mohammad-r-s?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="founder-avatar-link"
                aria-label="Aalif Mohammad R S on LinkedIn"
              >
                <span className="sr-only">(opens in a new tab)</span>
                <div className="founder-avatar">
                  <div className="founder-avatar-image-container">
                    <img
                      src="/assets/aalif.png"
                      alt="Aalif Mohammad R S"
                      className="founder-photo"
                    />
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

      <section id="process" className="quality-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">How an engagement runs</h2>
            <p className="section-lead-desc">
              Scope, build, handover. Typical site: 1–2 weeks. Typical web
              app: 4–8 weeks.
            </p>
          </div>
          <div className="process-timeline">
            <div className="timeline-line-bg"></div>
            <div className="timeline-line-progress" id="timeline-progress-bar"></div>

            <div className="process-step" id="process-step-1">
              <div className="step-marker">
                <span className="step-num">1</span>
              </div>
              <div className="step-content card">
                <h3 className="step-title">Scope</h3>
                <p className="step-description">
                  Goals, constraints, and a published price in one
                  conversation.
                </p>
              </div>
            </div>

            <div className="process-step" id="process-step-2">
              <div className="step-marker">
                <span className="step-num">2</span>
              </div>
              <div className="step-content card">
                <h3 className="step-title">Build</h3>
                <p className="step-description">
                  Next.js, Node, and PostgreSQL in focused sprints. No
                  WordPress.
                </p>
              </div>
            </div>

            <div className="process-step" id="process-step-3">
              <div className="step-marker">
                <span className="step-num">3</span>
              </div>
              <div className="step-content card">
                <h3 className="step-title">Handover</h3>
                <p className="step-description">
                  Ship on Vercel, hand over the repo, you operate it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Have a project?</h2>
              <p className="cta-banner-text">
                Tell us what needs to go live.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Send a brief</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
