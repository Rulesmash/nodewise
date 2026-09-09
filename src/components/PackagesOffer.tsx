import { ArrowRight, Check } from "lucide-react";
import SitePricingCalculator from "@/components/SitePricingCalculator";
import {
  PLATFORMS_WHATSAPP_HREF,
  PRICE_COPY,
  SOFTWARE_WHATSAPP_HREF,
} from "@/lib/pricing";

export default function PackagesOffer() {
  return (
    <div className="pricing-stack">
      <SitePricingCalculator />

      <div className="packages-grid packages-grid--pair">
        <div className="package-card" id="package-standard">
          <h3 className="package-title">{PRICE_COPY.softwareTitle}</h3>
          <div className="package-price">
            {PRICE_COPY.softwareRangeShort} <span>INR</span>
            <span className="price-usd">{PRICE_COPY.softwareRangeUsd}</span>
          </div>
          <p className="package-desc">
            Portals, dashboards, and internal tools with auth and a database.
          </p>
          <ul className="package-features">
            <li>
              <Check aria-hidden="true" />{" "}
              <span>Next.js + Node APIs + PostgreSQL</span>
            </li>
            <li>
              <Check aria-hidden="true" />{" "}
              <span>Supabase Auth, roles, and admin views</span>
            </li>
            <li>
              <Check aria-hidden="true" />{" "}
              <span>Dashboards, portals, light automation</span>
            </li>
            <li>
              <Check aria-hidden="true" />{" "}
              <span>4–8 weeks typical. Source you own.</span>
            </li>
          </ul>
          <a
            href={SOFTWARE_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary package-btn"
          >
            <span>Inquire via WhatsApp</span>
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            <ArrowRight className="btn-icon" aria-hidden="true" />
          </a>
        </div>

        <div className="package-card" id="package-enterprise">
          <h3 className="package-title">{PRICE_COPY.platformsTitle}</h3>
          <div className="package-price">
            Quoted <span>INR</span>
          </div>
          <p className="package-desc">
            Multi-user systems, realtime, Python, and models. Scoped after a
            brief.
          </p>
          <ul className="package-features">
            <li>
              <Check aria-hidden="true" />{" "}
              <span>WebSockets, webhooks, and integrations</span>
            </li>
            <li>
              <Check aria-hidden="true" />{" "}
              <span>RAG, Gemini / Mistral, realtime voice</span>
            </li>
            <li>
              <Check aria-hidden="true" />{" "}
              <span>Custom models and data pipelines</span>
            </li>
            <li>
              <Check aria-hidden="true" />{" "}
              <span>Ongoing support when the system needs it</span>
            </li>
          </ul>
          <a
            href={PLATFORMS_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary package-btn"
          >
            <span>Inquire via WhatsApp</span>
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            <ArrowRight className="btn-icon" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
