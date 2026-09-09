import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FaqList from "@/components/FaqList";
import {
  PAGE_SEO,
  SCHEMA_IDS,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata("premiumWebDevelopment");

const FAQS = [
  {
    question: "What is premium web development at Nodewise?",
    answer:
      "Premium web development means a custom Next.js site. You get the source, the GitHub repo, and a site that is fast on mobile. Three pages start at ₹20,000.",
  },
  {
    question: "How is this different from cheap website builders?",
    answer:
      "We write the product in Next.js. There is no plugin stack, no monthly theme fee, and no lock-in. You own the code after handover.",
  },
  {
    question: "Do you build premium websites from Kerala?",
    answer:
      "Yes. Nodewise is a Kerala studio. We ship premium web development to Kochi, Thiruvananthapuram, statewide Kerala, and worldwide.",
  },
  {
    question: "Is AI SEO part of premium web development?",
    answer:
      "Yes. Schema, llms.txt, and structured content for Google, ChatGPT, and Perplexity ship with the website. There is no separate AI SEO retainer.",
  },
];

export default function PremiumWebDevelopment() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.premiumWebDevelopment.title,
            description: PAGE_SEO.premiumWebDevelopment.description,
            path: "/premium-web-development",
            type: "Service",
            mainEntity: { "@id": SCHEMA_IDS.premiumWebDevelopmentService },
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Premium web development", path: "/premium-web-development" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Premium web development</h1>
            <p className="page-hero-subtitle">
              Custom Next.js. Kerala studio. Sites from ₹20,000 (~$212). You
              own the source.
            </p>
          </div>
        </div>
      </section>

      <section className="quality-section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="grid quality-grid">
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Custom-coded</h2>
                <p className="quality-description">
                  We write Next.js and React. No WordPress, no Elementor, no
                  rented template.
                </p>
                <ul className="scan-list">
                  <li>Home, About, Enquiry as the base</li>
                  <li>Repo and ownership included</li>
                  <li>Vercel deploy, no plugin updates</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Published price</h2>
                <p className="quality-description">
                  Three pages from ₹20,000. Extra pages in the calculator,
                  no cap. No discovery fee to get a price.
                </p>
                <ul className="scan-list">
                  <li>1–2 weeks for the three-page base</li>
                  <li>No maintenance retainer</li>
                  <li>Scope before we write code</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Search-ready</h2>
                <p className="quality-description">
                  Fast loads, schema, and AI SEO so Google and AI search can
                  cite the site. Included in the website package.
                </p>
                <ul className="scan-list">
                  <li>Core Web Vitals on Next.js</li>
                  <li>
                    <Link href="/ai-seo">AI SEO for ChatGPT and Perplexity</Link>
                  </li>
                  <li>
                    <Link href="/website-developers-kerala">
                      Kerala website developers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqList items={FAQS} title="Premium web development questions" />

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Start a premium site</h2>
              <p className="cta-banner-text">
                Price it in the calculator, or send a brief on WhatsApp.
              </p>
            </div>
            <Link
              href="/website-development"
              className="btn btn-primary cta-banner-btn"
            >
              <span>See website pricing</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
