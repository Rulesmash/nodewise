import { Check, X, ArrowRight, Clock, Rocket, Shield, Target } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
  productOfferJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import "./ztm.css";

export const metadata: Metadata = buildMetadata({
  title: "Zero to MVP: Live Product in 10–14 Days for ₹29,999",
  description:
    "Turn your idea into a live, investor-ready MVP in 10–14 days. Fixed ₹29,999: consultation, core features, responsive web app, source code, docs and full ownership transfer.",
  path: "/zero-to-mvp",
  keywords: [
    "MVP development India",
    "build MVP in 2 weeks",
    "fixed price MVP",
    "startup MVP package",
    "investor ready MVP",
  ],
});

export default function ZeroToMVP() {
  return (
    <div className="ztm-page">
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Zero to MVP: Build Your Idea in 10–14 Days",
            description:
              "Live, showcase-ready Minimum Viable Product in 10–14 days for ₹29,999.",
            path: "/zero-to-mvp",
            type: "Service",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Zero to MVP", path: "/zero-to-mvp" },
          ]),
          productOfferJsonLd({
            name: "Zero to MVP",
            description:
              "Live showcase-ready Minimum Viable Product in 10–14 days for ₹29,999 with full source code and ownership.",
            path: "/zero-to-mvp",
            price: 29999,
          }),
          serviceJsonLd({
            name: "Zero to MVP Package",
            description:
              "30-minute consultation, core MVP features, clean responsive web app, full source code and docs, ownership transfer, and 2 revision rounds. Delivered in 10–14 days.",
            path: "/zero-to-mvp",
            price: 29999,
          }),
          faqJsonLd([
            {
              question: "What is included in Zero to MVP?",
              answer:
                "A 30-minute idea consultation, core MVP with essential features, a live responsive web app, full source code and documentation, complete ownership transfer, and 2 rounds of revisions.",
            },
            {
              question: "What is not included in the MVP package?",
              answer:
                "Complex enterprise integrations, native mobile apps, and massive scalable cloud architecture are not included in the base ₹29,999 package.",
            },
            {
              question: "How long does Zero to MVP take?",
              answer:
                "Delivery is typically 10–14 days from scope confirmation.",
            },
            {
              question: "Who owns the MVP code?",
              answer:
                "You receive complete ownership of the source code and documentation upon delivery.",
            },
          ]),
        ]}
      />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <p className="ztm-product-name">Zero to MVP</p>
            <h1 className="page-hero-title">
              Live MVP in 10–14 days
            </h1>
            <p className="page-hero-subtitle">
              ₹29,999. Source, docs, and ownership.
            </p>
          </div>
        </div>
      </section>

      <section className="ztm-section">
        <div className="container">
          <div className="ztm-layout">
            <div className="ztm-main">
              <div className="ztm-panel">
                <h2>What you get</h2>
                <ul className="ztm-list">
                  <li>
                    <Check className="icon-check" size={18} aria-hidden="true" />
                    <span>
                      <strong>30-minute idea consultation</strong> to refine
                      your scope
                    </span>
                  </li>
                  <li>
                    <Check className="icon-check" size={18} aria-hidden="true" />
                    <span>
                      <strong>Core MVP</strong> with your most important
                      features built
                    </span>
                  </li>
                  <li>
                    <Check className="icon-check" size={18} aria-hidden="true" />
                    <span>
                      <strong>Clean, responsive web app</strong> deployed with a
                      live link
                    </span>
                  </li>
                  <li>
                    <Check className="icon-check" size={18} aria-hidden="true" />
                    <span>
                      <strong>Full source code</strong> + documentation
                    </span>
                  </li>
                  <li>
                    <Check className="icon-check" size={18} aria-hidden="true" />
                    <span>
                      <strong>Complete ownership</strong> transferred to you
                    </span>
                  </li>
                  <li>
                    <Check className="icon-check" size={18} aria-hidden="true" />
                    <span>
                      <strong>2 rounds of revisions</strong> to polish the
                      product
                    </span>
                  </li>
                </ul>
              </div>

              <div className="ztm-panel">
                <h2>Perfect for</h2>
                <ul className="ztm-list">
                  <li>
                    <Target className="icon-meta" size={18} aria-hidden="true" />
                    <span>Validating your idea quickly in the real market</span>
                  </li>
                  <li>
                    <Shield className="icon-meta" size={18} aria-hidden="true" />
                    <span>Showing investors a tangible, working product</span>
                  </li>
                  <li>
                    <Rocket className="icon-meta" size={18} aria-hidden="true" />
                    <span>Testing with real users for actionable feedback</span>
                  </li>
                  <li>
                    <Clock className="icon-meta" size={18} aria-hidden="true" />
                    <span>Starting without huge upfront costs</span>
                  </li>
                </ul>
              </div>

              <div className="ztm-panel">
                <h2>Not included</h2>
                <ul className="ztm-list">
                  <li>
                    <X className="icon-x" size={18} aria-hidden="true" />
                    <span>
                      Complex integrations (enterprise CRMs, banking APIs)
                    </span>
                  </li>
                  <li>
                    <X className="icon-x" size={18} aria-hidden="true" />
                    <span>
                      Native mobile apps (iOS/Android store publishing)
                    </span>
                  </li>
                  <li>
                    <X className="icon-x" size={18} aria-hidden="true" />
                    <span>
                      Massive scalable cloud architecture (MVP traffic scale)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <aside className="ztm-side">
              <div className="ztm-price-card">
                <span className="ztm-badge">For early-stage founders</span>
                <p className="ztm-price">
                  ₹29,999 <span>(one-time)</span>
                </p>
                <div className="ztm-timeline">
                  <Clock size={18} aria-hidden="true" />
                  <span>
                    <strong>Timeline:</strong> 10–14 days
                    <br />
                    <small>from scope confirmation</small>
                  </span>
                </div>
                <a
                  href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Zero%20to%20MVP%20package%20(%E2%82%B929%2C999)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary ztm-cta"
                  id="lnk-dedicated-mvp-whatsapp"
                >
                  <span>Start your MVP</span>
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                  <ArrowRight className="btn-icon" aria-hidden="true" />
                </a>
                <p className="ztm-price-note">
                  Start this week on WhatsApp.
                </p>
                <div className="ztm-after">
                  <h3>After your MVP</h3>
                  <p>
                    Optional retainer after launch. Quoted when you need it.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
