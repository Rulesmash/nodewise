import Link from "next/link";
import { Check, X, ArrowRight, Clock, Rocket, Shield, Target } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Zero to MVP | Build Your Idea in 10-14 Days",
  description: "Get a live, showcase-ready Minimum Viable Product (MVP) that you can show to users, investors, or test in the market.",
};

export default function ZeroToMVP() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-subtitle">Zero to MVP</span>
            <h1 className="page-hero-title" style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
              Turn your idea into a working product in just 10–14 days
            </h1>
            <p className="page-hero-subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Get a live, showcase-ready Minimum Viable Product (MVP) that you can show to users, investors, or test in the market. Perfect for early-stage founders.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Pricing */}
      <section className="mvp-dedicated-section" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div className="mvp-split-layout">
            
            {/* Left Content Column */}
            <div className="mvp-content-col">
              
              <div className="mvp-feature-block">
                <h3 className="mvp-block-title">What You Get</h3>
                <ul className="mvp-feature-list included">
                  <li><Check className="icon-check" /> <span><strong>30-minute idea consultation</strong> to refine your scope</span></li>
                  <li><Check className="icon-check" /> <span><strong>Core MVP</strong> with your most important features built</span></li>
                  <li><Check className="icon-check" /> <span><strong>Clean, responsive web app</strong> deployed with a live link</span></li>
                  <li><Check className="icon-check" /> <span><strong>Full source code</strong> + comprehensive documentation</span></li>
                  <li><Check className="icon-check" /> <span><strong>Complete ownership</strong> seamlessly transferred to you</span></li>
                  <li><Check className="icon-check" /> <span><strong>2 rounds of revisions</strong> to polish the final product</span></li>
                </ul>
              </div>

              <div className="mvp-feature-block">
                <h3 className="mvp-block-title">Perfect For</h3>
                <ul className="mvp-feature-list perfect-for">
                  <li><Target className="icon-target" /> <span>Validating your idea quickly in the real market</span></li>
                  <li><Shield className="icon-target" /> <span>Showing investors a tangible, working product</span></li>
                  <li><Rocket className="icon-target" /> <span>Testing with real users to gather actionable feedback</span></li>
                  <li><Clock className="icon-target" /> <span>Starting your business without huge upfront costs</span></li>
                </ul>
              </div>

              <div className="mvp-feature-block excluded-block">
                <h3 className="mvp-block-title">Not Included</h3>
                <p className="mvp-block-desc">To keep timelines tight and costs low, this package excludes:</p>
                <ul className="mvp-feature-list excluded">
                  <li><X className="icon-x" /> <span>Complex integrations (e.g. enterprise CRMs, banking APIs)</span></li>
                  <li><X className="icon-x" /> <span>Native mobile apps (iOS/Android App Store publishing)</span></li>
                  <li><X className="icon-x" /> <span>Massive scalable cloud architecture (designed for MVP traffic)</span></li>
                </ul>
              </div>

            </div>

            {/* Right Pricing Column */}
            <div className="mvp-pricing-col">
              <div className="mvp-pricing-card sticky-card">
                <div className="mvp-card-header">
                  <span className="mvp-badge">Most Popular for Founders</span>
                  <h2 className="mvp-price">₹29,999 <span>(one-time)</span></h2>
                  <div className="mvp-timeline">
                    <Clock size={18} />
                    <span><strong>Timeline:</strong> 10–14 days <br/><small>(depending on complexity)</small></span>
                  </div>
                </div>
                
                <div className="mvp-card-body">
                  <p className="mvp-card-desc">Lock in your spot and let's start building your product this week.</p>
                  <a href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Zero%20to%20MVP%20package%20(%E2%82%B929%2C999)."
                    target="_blank" rel="noopener noreferrer" className="btn btn-primary mvp-cta-btn" id="lnk-dedicated-mvp-whatsapp">
                    <span>Start Your MVP</span>
                    <ArrowRight className="btn-icon" />
                  </a>
                </div>

                <div className="mvp-card-footer">
                  <h4>After your MVP:</h4>
                  <p>We also offer a <strong>Growth Retainer plan</strong> if you want us to continue building features, fix bugs, and scale your product post-launch.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
