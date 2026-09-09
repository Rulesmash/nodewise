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

export const metadata: Metadata = pageMetadata("aiSeo");

const FAQS = [
  {
    question: "What is AI SEO?",
    answer:
      "AI SEO is how a site becomes visible in Google, Google AI Overviews, ChatGPT, Perplexity, and other answer engines. It is structured data, clean entity markup, llms.txt, and pages that models can quote without guessing.",
  },
  {
    question: "Do you sell AI SEO as a retainer?",
    answer:
      "No. AI SEO ships with Nodewise websites. Schema, llms.txt, canonicals, and fast Next.js are part of premium web development from ₹20,000. There is no monthly add-on.",
  },
  {
    question: "How is AI SEO different from classic SEO?",
    answer:
      "Classic SEO targets ranked links. AI SEO also targets citations: FAQ schema, speakable copy, an llms.txt file for crawlers, and pages written so a model can state the offer, price, and location without hallucination.",
  },
  {
    question: "Can Kerala businesses get AI SEO on a new site?",
    answer:
      "Yes. Every Nodewise site is built in Kerala for Google and AI search from day one. We also engineer quoted platforms with RAG and models when the product itself needs AI.",
  },
];

export default function AiSeo() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.aiSeo.title,
            description: PAGE_SEO.aiSeo.description,
            path: "/ai-seo",
            type: "Service",
            mainEntity: { "@id": SCHEMA_IDS.aiSeoService },
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "AI SEO", path: "/ai-seo" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">AI SEO</h1>
            <p className="page-hero-subtitle">
              Sites engineered for Google, ChatGPT, Perplexity, and AI
              Overviews. Included with the website. No retainer.
            </p>
          </div>
        </div>
      </section>

      <section className="quality-section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="grid quality-grid">
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">What AI search reads</h2>
                <p className="quality-description">
                  Models cite pages that state facts in HTML, not only in
                  images. We write the offer, price, and location in copy
                  and in schema.
                </p>
                <ul className="scan-list">
                  <li>JSON-LD for Organization, Service, FAQ</li>
                  <li>llms.txt for GPTBot, Claude, Perplexity</li>
                  <li>Canonical URLs, sitemap, image sitemap</li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Fast pages</h2>
                <p className="quality-description">
                  Slow themes hurt AI SEO. Premium web development on Next.js
                  keeps Core Web Vitals in range so Google and crawlers stay.
                </p>
                <ul className="scan-list">
                  <li>Static Next.js on Vercel</li>
                  <li>No WordPress plugins</li>
                  <li>
                    <Link href="/premium-web-development">
                      Premium web development
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="quality-item">
              <div className="quality-details">
                <h2 className="quality-title">Google and AI search</h2>
                <p className="quality-description">
                  Kerala businesses need local Google results and a clean
                  entity so ChatGPT can name the studio.
                </p>
                <ul className="scan-list">
                  <li>Kerala NAP and geo markup</li>
                  <li>
                    <Link href="/website-developers-kerala">
                      Kerala website developers
                    </Link>
                  </li>
                  <li>Malayalam, English, Hindi contact</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqList items={FAQS} title="AI SEO questions" />

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Ship a site AI can cite</h2>
              <p className="cta-banner-text">
                AI SEO is in the website package from ₹20,000 (~$212).
              </p>
            </div>
            <Link
              href="/website-development"
              className="btn btn-primary cta-banner-btn"
            >
              <span>Website engineering</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
