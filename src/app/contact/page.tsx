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
            { name: "Request a project", path: "/contact" },
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
              name: "Request a landing page or software project",
              target: [
                SITE.whatsapp,
                `mailto:${SITE.email}`,
                `${SITE.url}/contact`,
              ],
            },
          },
        ]}
      />
      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Request a project</h1>
            <p className="page-hero-subtitle">
              Hire Nodewise for a startup website, B2B site, or custom software.
            </p>
          </div>
        </div>
      </section>

      {/*  Section: Contact / Consultation Booking  */}
      <section id="contact" className="contact-section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="card contact-form-card grid">
            <div className="contact-pitch">
              <h2 className="pitch-title">Start a conversation</h2>
              <p className="pitch-text">
                Tell us the landing page or software you need. We&apos;ll reply within one business day.
              </p>
              <div className="contact-meta-info">
                <div className="c-meta-item">
                  <CheckCircle className="meta-icon" />
                  <span>Free Initial Architecture Review</span>
                </div>
                <div className="c-meta-item">
                  <Clock className="meta-icon" />
                  <span>Replies within 1 business day</span>
                </div>
                <div className="c-meta-item">
                  <Phone className="meta-icon" />
                  <span><a href="tel:+919446998827"
                      style={{ color: "inherit", textDecoration: "none" }}>+91 94469 98827</a></span>
                </div>
              </div>
            </div>

            <Suspense fallback={<div className="contact-form-container"><p style={{ color: "var(--text-muted)" }}>Loading consultation form...</p></div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>

    
    </>
  );
}
