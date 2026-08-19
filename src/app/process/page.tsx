import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  PAGE_SEO,
  breadcrumbJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata("process");

export default function Process() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.process.title,
            description: PAGE_SEO.process.description,
            path: "/process",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Process", path: "/process" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How Nodewise Builds Landing Pages and Software",
            description:
              "How our software studio takes a landing page or software request from discovery to launch.",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Discovery",
                text: "Map goals, constraints, and success metrics in a focused consultation.",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Architecture",
                text: "Design the technical blueprint and product scope for speed and scale.",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Build Sprints",
                text: "Ship iteratively with transparent progress and rapid feedback loops.",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Launch",
                text: "Deploy, hand over source code, and support a clean go-live.",
              },
            ],
          },
        ]}
      />
      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">How we work</h1>
            <p className="page-hero-subtitle">
              Discovery, build, launch.
            </p>
          </div>
        </div>
      </section>

      {/*  Section: The Collaboration Path (Our Process)  */}
      <section id="process" className="process-section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="process-timeline">
            {/*  Timeline Path SVG  */}
            <div className="timeline-line-bg"></div>
            <div className="timeline-line-progress" id="timeline-progress-bar"></div>

            {/*  Step 1  */}
            <div className="process-step" id="process-step-1">
              <div className="step-marker">
                <span className="step-num">1</span>
              </div>
              <div className="step-content card">
                <h3 className="step-title">Discovery</h3>
                <p className="step-description">
                  Goals, constraints, and success metrics in one consult.
                </p>
              </div>
            </div>

            {/*  Step 2  */}
            <div className="process-step" id="process-step-2">
              <div className="step-marker">
                <span className="step-num">2</span>
              </div>
              <div className="step-content card">
                <h3 className="step-title">Build</h3>
                <p className="step-description">
                  Clean, responsive software in focused sprints.
                </p>
              </div>
            </div>

            {/*  Step 3  */}
            <div className="process-step" id="process-step-3">
              <div className="step-marker">
                <span className="step-num">3</span>
              </div>
              <div className="step-content card">
                <h3 className="step-title">Launch</h3>
                <p className="step-description">
                  Go live, hand over source, support the first days.
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
              <h2 className="cta-banner-title">Ready to start?</h2>
              <p className="cta-banner-text">Book a consult and we&apos;ll scope the first sprint.</p>
            </div>
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Schedule a consult</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    
    </>
  );
}
