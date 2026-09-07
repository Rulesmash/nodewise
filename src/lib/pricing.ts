import { SITE } from "@/lib/seo";

/** Three-page engineered site. Extra pages add to the quote with no cap. */
export const SITE_INCLUDED_PAGES = [
  { id: "home", label: "Home", hint: "Landing page" },
  { id: "about", label: "About", hint: "Who you are" },
  { id: "enquiry", label: "Enquiry", hint: "Contact form" },
] as const;

export const SITE_EXTRA_PAGES = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "faq", label: "FAQ" },
  { id: "offer", label: "Offer" },
] as const;

export type SiteExtraId = (typeof SITE_EXTRA_PAGES)[number]["id"];

/** 3 pages ₹20k; 4 ₹22k; 5 ₹23.5k; 6 ₹25k; each page after that +₹1,500 */
export const SITE_MIN_PAGES = 3;
export const SITE_MIN_PRICE = 20000;
export const SITE_EXTRA_AFTER_SIX = 1500;

export function sitePriceForExtras(extraCount: number): number {
  const n = Math.max(0, extraCount);
  if (n === 0) return 20000;
  if (n === 1) return 22000;
  if (n === 2) return 23500;
  return 25000 + (n - 3) * SITE_EXTRA_AFTER_SIX;
}

export function siteTimeline(pageCount: number): string {
  if (pageCount <= 4) return "1 week";
  if (pageCount <= 6) return "1–2 weeks";
  if (pageCount <= 10) return "2–3 weeks";
  return "3–4 weeks";
}

export const SOFTWARE_MIN_PRICE = 100000;
export const SOFTWARE_MAX_PRICE = 150000;

export type SiteQuote = {
  extraIds: SiteExtraId[];
  extras: { id: SiteExtraId; label: string }[];
  unnamedCount: number;
  extraCount: number;
  pageCount: number;
  price: number;
  timeline: string;
  pageLabels: string[];
};

export function siteQuote(
  extraIds: readonly string[],
  unnamedCount = 0
): SiteQuote {
  const extras = SITE_EXTRA_PAGES.filter((p) => extraIds.includes(p.id));
  const unnamed = Math.max(0, unnamedCount);
  const extraCount = extras.length + unnamed;
  const pageCount = SITE_MIN_PAGES + extraCount;
  const unnamedLabels = Array.from(
    { length: unnamed },
    (_, i) => `Extra page ${i + 1}`
  );
  return {
    extraIds: extras.map((p) => p.id),
    extras,
    unnamedCount: unnamed,
    extraCount,
    pageCount,
    price: sitePriceForExtras(extraCount),
    timeline: siteTimeline(pageCount),
    pageLabels: [
      ...SITE_INCLUDED_PAGES.map((p) => p.label),
      ...extras.map((p) => p.label),
      ...unnamedLabels,
    ],
  };
}

export function extrasFromPageCount(pages: number): {
  extraIds: SiteExtraId[];
  unnamedCount: number;
} {
  const extras = Math.max(0, pages - SITE_MIN_PAGES);
  const namedTake = Math.min(extras, SITE_EXTRA_PAGES.length);
  return {
    extraIds: SITE_EXTRA_PAGES.slice(0, namedTake).map((p) => p.id),
    unnamedCount: Math.max(0, extras - namedTake),
  };
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

export function formatInrPrice(amount: number): string {
  return `₹${formatInr(amount)}`;
}

/** Mid-market USD/INR ~94.5 (Sep 2026). USD is a conversion of published INR. */
export const INR_PER_USD = 94.5;

export function inrToUsd(amountInr: number): number {
  return Math.round(amountInr / INR_PER_USD);
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

export function formatUsdPrice(amountInr: number): string {
  return `$${formatUsd(inrToUsd(amountInr))}`;
}

export function formatUsdRange(minInr: number, maxInr: number): string {
  return `${formatUsdPrice(minInr)}–${formatUsdPrice(maxInr)}`;
}

const SITE_FROM_USD = formatUsdPrice(SITE_MIN_PRICE);
const SOFTWARE_USD = formatUsdRange(SOFTWARE_MIN_PRICE, SOFTWARE_MAX_PRICE);
const SIX_PAGE_USD = formatUsdPrice(25000);
const EXTRA_PAGE_USD = formatUsdPrice(SITE_EXTRA_AFTER_SIX);

export const PRICE_COPY = {
  siteTitle: "Websites",
  siteRange: "from ₹20,000",
  siteRangeShort: "from 20k",
  siteFrom: "from ₹20,000",
  siteFromUsd: SITE_FROM_USD,
  siteFromBoth: `from ₹20,000 (~${SITE_FROM_USD})`,
  siteRangeShortBoth: `from 20k · ${SITE_FROM_USD}`,
  softwareTitle: "Web applications",
  softwareRange: "₹1–1.5 lakh",
  softwareRangeShort: "₹1–1.5L",
  softwareRangeUsd: SOFTWARE_USD,
  softwareRangeBoth: `₹1–1.5 lakh (~${SOFTWARE_USD})`,
  softwareRangeShortBoth: `₹1–1.5L · ${SOFTWARE_USD}`,
  softwareRangeGlass: `1–1.5L · ${SOFTWARE_USD}`,
  sixPageUsd: SIX_PAGE_USD,
  extraPageUsd: EXTRA_PAGE_USD,
  platformsTitle: "Custom platforms",
} as const;

export function waHref(text: string): string {
  return `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function siteWhatsappHref(quote: SiteQuote): string {
  return waHref(
    `Hi Nodewise, I want a website: ${quote.pageCount} pages (${quote.pageLabels.join(", ")}) at ${formatInrPrice(quote.price)}, ${quote.timeline}.`
  );
}

export const SOFTWARE_WHATSAPP_HREF = waHref(
  `Hi Nodewise, I'm interested in a web application (${PRICE_COPY.softwareRange}).`
);

export const PLATFORMS_WHATSAPP_HREF = waHref(
  "Hi Nodewise, I'm interested in a custom platform. Let's scope it."
);
