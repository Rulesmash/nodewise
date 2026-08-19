import { Suspense } from "react";
import { CheckCircle, Clock, Phone } from "lucide-react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import {
  SITE,
  buildMetadata,
  breadcrumbJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Nodewise: MVP and Web Consultation",
  description:
    "Talk to Nodewise about your MVP or custom web platform. WhatsApp +91 94469 98827, email contact@nodewise.cc, or send a project brief online.",
  path: "/contact",
  keywords: [
    "contact MVP developers India",
    "hire web developers India",
    "schedule software consultation",
    "WhatsApp web agency",
  ],
});

export default function Contact() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Contact Nodewise",
            description:
              "Schedule a technical consultation for web platforms, MVPs, and custom software.",
            path: "/contact",
            type: "ContactPage",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Nodewise",
            url: `${SITE.url}/contact`,
            mainEntity: {
              "@type": "Organization",
              "@id": `${SITE.url}/#organization`,
              name: SITE.name,
              email: SITE.email,
              telephone: SITE.phone,
              url: SITE.url,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: SITE.phone,
                contactType: "sales",
                availableLanguage: ["English", "Hindi", "Malayalam"],
                url: `${SITE.url}/contact`,
              },
            },
          },
        ]}
      />
      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Contact</h1>
            <p className="page-hero-subtitle">
              WhatsApp, email, or a short brief.
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
                Tell us the product. We&apos;ll reply within one business day.
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
                      style={{ color: "inherit", textDecoration: "none" }}>+919446998827</a></span>
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
