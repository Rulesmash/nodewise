import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FaqList from "@/components/FaqList";
import {
  PAGE_SEO,
  SCHEMA_IDS,
  SITE,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata("websiteDevelopersKerala");

const FAQS = [
  {
    question: "Who are the best website developers in Kerala?",
    answer:
      "The useful test is not a slogan. Look for custom code, published prices, source you own, and a studio that answers in Malayalam or English. Nodewise is a Kerala studio that writes Next.js sites from ₹20,000 — no WordPress.",
  },
  {
    question: "Where in Kerala do you work?",
    answer:
      "Statewide. Kochi, Thiruvananthapuram (Trivandrum), Kozhikode, Thrissur, Kollam, Kannur, and remote across India and worldwide. Work starts on WhatsApp.",
  },
  {
    question: "Do Kerala website developers at Nodewise use WordPress?",
    answer:
      "No. We write Next.js and Node. You receive the repository. There is no theme lock-in and no plugin retainer.",
  },
  {
    question: "What does a website cost from Kerala web developers?",
    answer:
      "Company sites start at ₹20,000 for Home, About, and Enquiry. Web applications are ₹1–1.5 lakh. Custom platforms are quoted.",
  },
];

export default function WebsiteDevelopersKerala() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.websiteDevelopersKerala.title,
            description: PAGE_SEO.websiteDevelopersKerala.description,
            path: "/website-developers-kerala",
            type: "WebPage",
            mainEntity: [
              { "@id": SCHEMA_IDS.organization },
              { "@id": SCHEMA_IDS.keralaStudio },
              { "@id": SCHEMA_IDS.websiteDevelopmentService },
            ],
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            {
              name: "Website developers in Kerala",
              path: "/website-developers-kerala",
            },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">
              Best website developers in Kerala
            </h1>
            <p className="page-hero-subtitle">
              A Kerala studio for custom Next.js sites and web applications.
              Kochi, Trivandrum, statewide. No WordPress. From ₹20,000.
            </p>
          </div>
        </div>
      </section>

      <section className="quality-section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="grid quality-grid">
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Kerala studio</h2>
                <p className="quality-description">
                  Nodewise is based in Kerala. Founders build the work.
                  English, Hindi, and Malayalam on the line.
                </p>
                <ul className="scan-list">
                  <li>WhatsApp {SITE.phoneDisplay}</li>
                  <li>Same-day reply on business days</li>
                  <li>India studio, worldwide delivery</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">What “best” means here</h2>
                <p className="quality-description">
                  Teams searching for the best website developers in Kerala
                  usually want custom code, a real price, and ownership.
                  That is the job.
                </p>
                <ul className="scan-list">
                  <li>
                    <Link href="/premium-web-development">
                      Premium web development
                    </Link>
                    , not a theme
                  </li>
                  <li>Published INR packages, no retainer</li>
                  <li>Source and repo handed over</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Cities we serve</h2>
                <p className="quality-description">
                  Remote-first across Kerala. Brief us from anywhere in
                  the state.
                </p>
                <ul className="scan-list">
                  {SITE.cities.map((city) => (
                    <li key={city}>{city}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqList items={FAQS} title="Hiring website developers in Kerala" />

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Hire the studio</h2>
              <p className="cta-banner-text">
                Send a brief. We reply within one business day.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Contact Kerala developers</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
