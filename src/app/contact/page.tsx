import Link from "next/link";
import { CheckCircle, Clock, Phone, Send } from "lucide-react";
import type { Metadata } from 'next';

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

            <div className="contact-form-container">
              <form id="contact-consult-form" className="contact-form"
                action="https://formsubmit.co/rulesmashpros@gmail.com" method="POST">
                {/*  FormSubmit Configuration  */}
                <input type="hidden" name="_subject" value="Nodewise - New Consultation Request" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="form-group">
                  <label htmlFor="form-name">Full Name</label>
                  <input type="text" id="form-name" name="name" placeholder="Enter your name" spellCheck="false"
                    required />
                </div>
                <div className="form-group">
                  <label htmlFor="form-contact">Contact (Email or Phone)</label>
                  <input type="text" id="form-contact" name="contact" placeholder="Enter your email or phone number"
                    spellCheck="false" required />
                </div>

                <button type="submit" className="btn btn-primary btn-block" id="btn-submit-consult">
                  <span>Send Consultation Request</span>
                  <Send className="btn-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    
    </>
  );
}
