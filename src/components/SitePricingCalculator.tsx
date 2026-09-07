"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import {
  SITE_EXTRA_PAGES,
  SITE_INCLUDED_PAGES,
  SITE_MIN_PAGES,
  type SiteExtraId,
  extrasFromPageCount,
  PRICE_COPY,
  formatInrPrice,
  formatUsdPrice,
  siteQuote,
  siteWhatsappHref,
} from "@/lib/pricing";

export default function SitePricingCalculator() {
  const [extraIds, setExtraIds] = useState<SiteExtraId[]>([]);
  const [unnamedCount, setUnnamedCount] = useState(0);
  const quote = useMemo(
    () => siteQuote(extraIds, unnamedCount),
    [extraIds, unnamedCount]
  );
  const extraSet = useMemo(() => new Set(quote.extraIds), [quote.extraIds]);

  const setCount = (pages: number) => {
    const next = extrasFromPageCount(Math.max(SITE_MIN_PAGES, pages));
    setExtraIds(next.extraIds);
    setUnnamedCount(next.unnamedCount);
  };

  const toggleExtra = (id: SiteExtraId) => {
    setExtraIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="site-pricing package-card highlighted" id="package-minimum">
      <div className="site-pricing__top">
        <h3 className="package-title">Websites</h3>
        <p className="package-desc">
          Home, About, and Enquiry to start. Add pages and the price updates.
          Next.js on Vercel. No WordPress. No retainer.
        </p>
      </div>

      <div className="site-pricing__price-row">
        <div className="package-price site-pricing__price" aria-live="polite">
          {formatInrPrice(quote.price)} <span>INR</span>
          <span className="price-usd">{formatUsdPrice(quote.price)}</span>
        </div>
        <div className="site-pricing__stepper" role="group" aria-label="Page count">
          <button
            type="button"
            className="site-pricing__step"
            onClick={() => setCount(quote.pageCount - 1)}
            disabled={quote.pageCount <= SITE_MIN_PAGES}
            aria-label="Fewer pages"
          >
            <Minus size={16} aria-hidden="true" />
          </button>
          <span className="site-pricing__count">
            {quote.pageCount} pages
          </span>
          <button
            type="button"
            className="site-pricing__step"
            onClick={() => setCount(quote.pageCount + 1)}
            aria-label="More pages"
          >
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="site-pricing__meta">
        {quote.timeline} · no maintenance fee · source you own
      </p>

      <div className="site-pricing__pages">
        <p className="site-pricing__label">Included</p>
        <div className="site-pricing__chips">
          {SITE_INCLUDED_PAGES.map((page) => (
            <span
              key={page.id}
              className="site-pricing__chip site-pricing__chip--locked"
            >
              <Check size={14} aria-hidden="true" />
              {page.label}
            </span>
          ))}
        </div>
        <p className="site-pricing__label">Add pages</p>
        <div className="site-pricing__chips">
          {SITE_EXTRA_PAGES.map((page) => {
            const on = extraSet.has(page.id);
            return (
              <button
                key={page.id}
                type="button"
                className={`site-pricing__chip${on ? " is-on" : ""}`}
                aria-pressed={on}
                onClick={() => toggleExtra(page.id)}
              >
                {page.label}
              </button>
            );
          })}
          {Array.from({ length: unnamedCount }, (_, i) => (
            <button
              key={`unnamed-${i}`}
              type="button"
              className="site-pricing__chip is-on"
              aria-pressed="true"
              onClick={() => setUnnamedCount((n) => Math.max(0, n - 1))}
            >
              Extra page {i + 1}
            </button>
          ))}
        </div>
      </div>

      <ul className="package-features">
        <li>
          <Check size={16} aria-hidden="true" />
          <span>Custom-coded Next.js. Shipped on Vercel.</span>
        </li>
        <li>
          <Check size={16} aria-hidden="true" />
          <span>Static and fast. No page builders, no plugin tax.</span>
        </li>
        <li>
          <Check size={16} aria-hidden="true" />
          <span>Basic SEO, responsive layout, enquiry form.</span>
        </li>
        <li>
          <Check size={16} aria-hidden="true" />
          <span>GitHub repo handed over. You run it after launch.</span>
        </li>
      </ul>

      <p className="site-pricing__note">
        ₹20,000 (~{PRICE_COPY.siteFromUsd}) for three pages. Each extra page
        adds ₹1,500 (~{PRICE_COPY.extraPageUsd}) after six pages (₹25,000 /{" "}
        {PRICE_COPY.sixPageUsd}). No page cap. Use + or the chips.
      </p>

      <a
        href={siteWhatsappHref(quote)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary package-btn"
      >
        <span>Inquire via WhatsApp</span>
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
        <ArrowRight className="btn-icon" aria-hidden="true" />
      </a>
    </div>
  );
}
