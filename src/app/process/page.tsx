import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Process | Fast, Reliable Software Engineering",
  description: "Learn about Nodewise's agile engineering process: discovery, architecture, sprinting, and launch.",
};

export default function Process() {
  return (
    <>

      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-subtitle">Workflow</span>
            <h1 className="page-hero-title">The Collaboration Path</h1>
            <p className="page-hero-subtitle">
              How we turn complex operational bottlenecks into streamlined, scalable software.
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
                <h3 className="step-title">Strategic Alignment</h3>
                <p className="step-description">
                  We analyze your business model, target audience, and operations to pinpoint exactly where custom
                  software will add the most value to your bottom line.
                </p>
              </div>
            </div>

            {/*  Step 2  */}
            <div className="process-step" id="process-step-2">
              <div className="step-marker">
                <span className="step-num">2</span>
              </div>
              <div className="step-content card">
                <h3 className="step-title">Precision Engineering</h3>
                <p className="step-description">
                  Our team builds a tailored, responsive digital asset utilizing clean modern code, ensuring your
                  platform loads instantly on every device.
                </p>
              </div>
            </div>

            {/*  Step 3  */}
            <div className="process-step" id="process-step-3">
              <div className="step-marker">
                <span className="step-num">3</span>
              </div>
              <div className="step-content card">
                <h3 className="step-title">Deployment & Growth</h3>
                <p className="step-description">
                  We launch your platform seamlessly and provide continuous consultation on how to leverage your new
                  digital asset to capture more clients.
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
              <h2 className="cta-banner-title">Ready to Begin?</h2>
              <p className="cta-banner-text">Let's align your operations with custom software.</p>
            </div>
            <a href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Schedule Consultation</span>
              <ArrowRight className="btn-icon" />
            </a>
          </div>
        </div>
      </section>
    
    </>
  );
}
