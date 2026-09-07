import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import HeroGlassCards from "@/components/HeroGlassCards";
import PackagesOffer from "@/components/PackagesOffer";
import {
  PAGE_SEO,
  SCHEMA_IDS,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";
import "./home.css";

const HeroStage = dynamic(() => import("@/components/HeroStage"), {
  ssr: false,
});
const HomeMotion = dynamic(() => import("@/components/HomeMotion"), {
  ssr: false,
});

export const metadata: Metadata = pageMetadata("home");

export default function Home() {
  return (
    <div className="home-page">
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.home.title,
            description: PAGE_SEO.home.description,
            path: "/",
            mainEntity: [
              { "@id": SCHEMA_IDS.landingPageService },
              { "@id": SCHEMA_IDS.softwareStudioService },
              { "@id": SCHEMA_IDS.websiteDevelopmentService },
              { "@id": SCHEMA_IDS.softwareDevelopmentService },
            ],
          }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
          faqJsonLd([
            {
              question: "What does Nodewise build?",
              answer:
                "B2B websites and web applications. Sites are Next.js on Vercel, from ₹20,000 (~$212) for Home, About, and Enquiry. Web applications use Node, PostgreSQL, and auth, at ₹1–1.5 lakh (~$1,058–$1,587). Platforms are quoted.",
            },
            {
              question: "Do you use WordPress or page builders?",
              answer:
                "No. We write Next.js, Node, and PostgreSQL. You receive the source and the GitHub repository. There is no plugin stack and no retainer.",
            },
            {
              question: "How do I start a project?",
              answer:
                "WhatsApp +91 94469 98827, email contact@nodewise.cc, or send a brief on the contact page.",
            },
            {
              question: "What does a website or web application cost?",
              answer:
                "Websites start at ₹20,000 (~$212) for three pages. Extra pages are priced in the calculator with no cap. Web applications are ₹1–1.5 lakh (~$1,058–$1,587). Platforms are quoted.",
            },
          ]),
        ]}
      />
      <HomeMotion />

      <section id="hero" className="hero-section">
        <div className="hero-stage-canvas-slot" aria-hidden="true">
          <HeroStage />
        </div>
        <div className="container hero-container">
          <div className="hero-content hero-copy">
            <h1 className="hero-title" id="hero-main-title">
              Websites and web applications
            </h1>
            <p className="hero-offer" id="hero-offer-line">
              B2B engineering in Next.js. Sites from ₹20,000 (~$212). Web apps
              ₹1–1.5 lakh (~$1,058–$1,587). You own the source.
            </p>
          </div>
          <ul className="hero-subtitle" id="hero-sub-text">
            <li>Company sites and landing pages, custom-coded</li>
            <li>Web applications with auth, PostgreSQL, and dashboards</li>
            <li>India studio, worldwide delivery</li>
          </ul>
          <div className="hero-ctas">
            <Link
              href="/portfolio"
              className="btn btn-primary"
              id="btn-hero-view-work"
            >
              <span>View work</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
            <a
              href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%20need%20a%20B2B%20website%20or%20web%20application."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              id="btn-hero-discuss"
            >
              <span>Discuss a project</span>
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </a>
          </div>
          <div className="hero-visual">
            <div className="hero-stage" data-size="lg">
              <HeroGlassCards />
            </div>
          </div>
        </div>
      </section>

      <section
        id="packages"
        className="packages-section"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="container">
          <div className="section-header center" data-reveal>
            <h2 className="section-title">Pricing</h2>
            <p className="packages-pricing-note">INR published up front. USD is a conversion.</p>
          </div>
          <div data-reveal>
            <PackagesOffer />
          </div>
        </div>
      </section>

      <section className="cta-banner-section" data-reveal>
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Scope a build</h2>
              <p className="cta-banner-text">
                Send a brief if the work sits between a site and a platform.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary cta-banner-btn">
              <span>Send a brief</span>
              <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
