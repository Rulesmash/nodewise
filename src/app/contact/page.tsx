import { Suspense } from "react";
import { CheckCircle, Clock, Phone } from "lucide-react";
import type { Metadata } from 'next';
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Nodewise | Schedule a Technical Consultation",
  description: "Get in touch with Nodewise to discuss your software architecture, web platforms, and digital product needs.",
};

export default function Contact() {
  return (
    <>

      {/*  Page Hero Banner  */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-subtitle">Get in Touch</span>
            <h1 className="page-hero-title">Schedule Consultation</h1>
            <p className="page-hero-subtitle">
              Ready to engineer your business growth? Let's talk.
            </p>
          </div>
        </div>
      </section>

      {/*  Section: Contact / Consultation Booking  */}
      <section id="contact" className="contact-section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="card contact-form-card grid">
            <div className="contact-pitch">
              <h2 className="pitch-title">Ready to Engineer Your Business Growth?</h2>
              <p className="pitch-text">
                Book a brief consultation with our engineering team. We'll identify operational bottlenecks and map out
                a custom digital asset designed to scale your margins.
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
