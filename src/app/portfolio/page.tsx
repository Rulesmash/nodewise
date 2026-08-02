import Link from "next/link";
import dynamic from "next/dynamic";
import { ExternalLink, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import type { CarouselSlide } from "@/components/ProjectCarousel";
import {
  buildMetadata,
  breadcrumbJsonLd,
  itemListJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import "./portfolio.css";

/** Heavy GSAP carousel — code-split from the RSC page shell (bundle-dynamic-imports). */
const ProjectCarousel = dynamic(
  () => import("@/components/ProjectCarousel"),
  {
    loading: () => (
      <div
        className="pc-root pc-root--loading"
        aria-busy="true"
        aria-label="Loading project screens"
      />
    ),
  }
);

export const metadata: Metadata = buildMetadata({
  title: "Work & Case Studies — MVPs and Landing Pages",
  description:
    "See Nodewise work: Whitebull equity research desk, Titan Residences 3D real estate, Mavenix marketing MVP, FOSS CEAL community platform. Live MVPs and high-converting landing pages for startups.",
  path: "/portfolio",
  keywords: [
    "web development portfolio India",
    "MVP case studies",
    "landing page examples",
    "startup product examples",
  ],
  image: "/assets/whitebull-landing.png",
  imageAlt: "Nodewise portfolio — Whitebull equity research desk",
});

type Project = {
  id: string;
  name: string;
  meta: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  host: string;
  slides: CarouselSlide[];
};

/** Display order: featured project first. Layout flip is derived from index. */
const PROJECTS: Project[] = [
  {
    id: "case-04",
    name: "Whitebull",
    meta: "Indian Equity Research Desk",
    title: "Charts, news, and structured analysis in one operate-density surface",
    description:
      "Full-stack research assistant that bridges chart terminals and news portals—Nifty 50 and Bank Nifty desks, AI market digests, and a stock predictor with entry, stops, and targets. Client engagement concluded; preserved as an interactive Nodewise showcase with demo data.",
    tags: ["Fintech", "Research desk", "Full-stack", "Charts"],
    url: "https://whitebull.nodewise.cc",
    host: "whitebull.nodewise.cc",
    slides: [
      {
        src: "/assets/whitebull-landing.png",
        alt: "Whitebull landing page hero",
        label: "Landing",
      },
      {
        src: "/assets/whitebull-nifty50.png",
        alt: "Whitebull Nifty 50 research desk",
        label: "Nifty 50",
      },
      {
        src: "/assets/whitebull-banknifty.png",
        alt: "Whitebull Bank Nifty desk",
        label: "Bank Nifty",
      },
      {
        src: "/assets/whitebull-analysis.png",
        alt: "Whitebull AI market analysis",
        label: "Analysis",
      },
      {
        src: "/assets/whitebull-predictor.png",
        alt: "Whitebull stock predictor for TCS",
        label: "Predictor",
      },
    ],
  },
  {
    id: "case-01",
    name: "Titan Residences",
    meta: "3D Interactive Real Estate",
    title: "Interactive 3D showcase for a luxury residence brand",
    description:
      "Shipped a live web experience buyers can explore—floor-plan hotspots, amenities, and residence views—without a sales call. Built as a high-fidelity product demo, not a static brochure.",
    tags: ["3D Web", "Real Estate", "Live product"],
    url: "https://titan-bigs.vercel.app",
    host: "titan-bigs.vercel.app",
    slides: [
      {
        src: "/assets/titan-hero.png",
        alt: "Titan Residences hero showcase",
        label: "Hero",
      },
      {
        src: "/assets/titan-features.png",
        alt: "Titan Residences features section",
        label: "Features",
      },
      {
        src: "/assets/titan-blueprint.png",
        alt: "Titan Residences floor plan blueprints",
        label: "Blueprint",
      },
      {
        src: "/assets/titan-amenities.png",
        alt: "Titan Residences amenities",
        label: "Amenities",
      },
      {
        src: "/assets/titan-residence.png",
        alt: "Titan Residences residence detail",
        label: "Residence",
      },
    ],
  },
  {
    id: "case-02",
    name: "Mavenix Studio",
    meta: "MVP & Landing Page",
    title: "Launch-ready marketing site for a digital studio",
    description:
      "A focused landing MVP: clear offer hierarchy, services, and conversion path. Designed so a new studio can go live and look credible from day one.",
    tags: ["MVP", "Landing page", "Marketing"],
    url: "https://mavenixstudio.netlify.app/",
    host: "mavenixstudio.netlify.app",
    slides: [
      {
        src: "/assets/mavenix-hero.png",
        alt: "Mavenix landing page hero",
        label: "Hero",
      },
      {
        src: "/assets/mavenix-services.png",
        alt: "Mavenix services section",
        label: "Services",
      },
      {
        src: "/assets/mavenix-about.png",
        alt: "Mavenix about section",
        label: "About",
      },
    ],
  },
  {
    id: "case-03",
    name: "FOSS CEAL",
    meta: "Open Source Community Hub",
    title: "Community platform for a college open-source club",
    description:
      "Modular hub for FOSS CEAL—training chambers, events, resources, and brand kits in one place. Built for students and organizers to navigate without hand-holding.",
    tags: ["Community", "Open source", "Platform"],
    url: "https://foss.ceal.in/",
    host: "foss.ceal.in",
    slides: [
      {
        src: "/assets/fossceal-landing.png",
        alt: "FOSS CEAL landing page",
        label: "Landing",
      },
      {
        src: "/assets/fossceal-portal.png",
        alt: "FOSS CEAL portal",
        label: "Portal",
      },
      {
        src: "/assets/fossceal-create.png",
        alt: "FOSS CEAL Create 101",
        label: "Create 101",
      },
      {
        src: "/assets/fossceal-train.png",
        alt: "FOSS CEAL Train 303",
        label: "Train 303",
      },
      {
        src: "/assets/fossceal-branding.png",
        alt: "FOSS CEAL brand kit",
        label: "Branding",
      },
    ],
  },
];

export default function Portfolio() {
  return (
    <div className="portfolio-page">
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Portfolio & Case Studies",
            description:
              "MVPs, high-converting landing pages, and custom web applications built by Nodewise.",
            path: "/portfolio",
            type: "CollectionPage",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
          ]),
          itemListJsonLd(
            "Nodewise Portfolio",
            PROJECTS.map((p) => ({
              name: p.name,
              url: p.url,
              description: p.description,
              image: p.slides[0]?.src,
            }))
          ),
        ]}
      />

      <section className="page-hero page-hero--compact">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Selected work</h1>
            <p className="page-hero-subtitle">
              Live products you can open and click through.
            </p>
          </div>
        </div>
      </section>

      <section id="work" className="portfolio-section">
        <div className="container">
          <div className="project-stack">
            {PROJECTS.map((project, index) => {
              // Even indices (featured first): artifact leads on desktop.
              const artifactFirst = index % 2 === 0;
              return (
                <article
                  key={project.id}
                  className={`project-block${artifactFirst ? " is-flip" : ""}`}
                  id={`portfolio-${project.id}`}
                >
                  <div className="project-mobile-head">
                    <h2 className="project-name">{project.name}</h2>
                    <p className="project-meta">{project.meta}</p>
                  </div>

                  <div className="project-info">
                    <h2 className="project-name">{project.name}</h2>
                    <p className="project-meta">{project.meta}</p>
                    <p className="project-title">{project.title}</p>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-ctas">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        id={`btn-verify-${project.id}`}
                      >
                        <ExternalLink className="btn-icon" aria-hidden="true" />
                        <span>Open live site</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </div>
                  </div>

                  <div className="project-carousel-wrap">
                    <ProjectCarousel
                      projectId={project.id}
                      slides={project.slides}
                      liveUrl={project.url}
                      liveHost={project.host}
                      displayName={project.name}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">Need a build like these?</h2>
              <p className="cta-banner-text">
                Start Zero to MVP from ₹29,999, or tell us what you want to ship.
              </p>
            </div>
            <div className="cta-banner-actions">
              <a
                href="https://wa.me/919446998827?text=Hi%20Nodewise%2C%20I%27m%20interested%20in%20the%20Zero%20to%20MVP%20package%20(%E2%82%B929%2C999)."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary cta-banner-btn"
              >
                <span>Start Your MVP</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowRight className="btn-icon" aria-hidden="true" />
              </a>
              <Link href="/contact" className="btn btn-secondary cta-banner-btn">
                <span>Get in touch</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
