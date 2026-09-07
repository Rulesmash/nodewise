import { Suspense } from "react";
import { CheckCircle, Clock, Phone } from "lucide-react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import {
  PAGE_SEO,
  SCHEMA_IDS,
  SITE,
  breadcrumbJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata("contact");

export default function Contact() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: PAGE_SEO.contact.title,
            description: PAGE_SEO.contact.description,
            path: "/contact",
            type: "ContactPage",
            mainEntity: { "@id": SCHEMA_IDS.organization },
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Start a project", path: "/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${SITE.url}/contact#contactpage`,
            name: PAGE_SEO.contact.title,
            url: `${SITE.url}/contact`,
            mainEntity: { "@id": SCHEMA_IDS.organization },
            potentialAction: {
              "@type": "CommunicateAction",
              name: "Request a website or web application",
              target: [
                SITE.whatsapp,
                `mailto:${SITE.email}`,
                `${SITE.url}/contact`,
              ],
            },
          },
        ]}
      />
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Start a project</h1>
            <p className="page-hero-subtitle">
              Hire website developers in Kerala for premium web development,
              a web application, or AI SEO.
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="contact-section"
        style={{ paddingTop: "2rem" }}
      >
        <div className="container">
          <div className="card contact-form-card grid">
            <div className="contact-pitch">
              <h2 className="pitch-title">Send a brief</h2>
              <p className="pitch-text">
                Describe the site or application. We reply within one
                business day.
              </p>
              <div className="contact-meta-info">
                <div className="c-meta-item">
                  <CheckCircle className="meta-icon" />
                  <span>Scope confirmed before you pay</span>
                </div>
                <div className="c-meta-item">
                  <Clock className="meta-icon" />
                  <span>Reply within 1 business day</span>
                </div>
                <div className="c-meta-item">
                  <Phone className="meta-icon" />
                  <span>
                    <a
                      href="tel:+919446998827"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      +91 94469 98827
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="contact-form-container">
                  <p style={{ color: "var(--text-muted)" }}>Loading form…</p>
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
