import type { Metadata } from "next";

export const SITE = {
  name: "Nodewise",
  legalName: "Nodewise",
  tagline: "Smarter Code. Better Solutions.",
  url: "https://nodewise.cc",
  domain: "nodewise.cc",
  locale: "en_IN",
  language: "en",
  email: "contact@nodewise.cc",
  phone: "+919446998827",
  phoneDisplay: "+91 94469 98827",
  whatsapp: "https://wa.me/919446998827",
  linkedin: "https://www.linkedin.com/company/nodewise-cc",
  logo: "/assets/logo-full.png",
  logoIcon: "/assets/logo-icon.jpg",
  ogImage: "/assets/logo-full.png",
  foundingDate: "2024",
  areaServed: ["IN", "Worldwide"],
  priceCurrency: "INR",
  sameAs: [
    "https://www.linkedin.com/company/nodewise-cc",
  ],
  founders: [
    {
      name: "Induchoodan V S",
      url: "https://www.linkedin.com/in/induchoodan-v-s-027513291",
      image: "/assets/induchoodan.png",
    },
    {
      name: "Aalif Mohammad R S",
      url: "https://www.linkedin.com/in/aalif-mohammad-r-s",
      image: "/assets/aalif.png",
    },
  ],
  keywords: [
    "Nodewise",
    "custom web development",
    "MVP development India",
    "startup MVP builder",
    "business software development",
    "web application development",
    "landing page development",
    "Next.js development agency",
    "affordable MVP ₹29999",
    "digital product studio",
    "custom portals",
    "SaaS MVP development",
  ],
} as const;

export type PageSeoInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE.url;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = SITE.ogImage,
  imageAlt = `${SITE.name} — ${SITE.tagline}`,
  type = "website",
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const allKeywords = Array.from(new Set([...SITE.keywords, ...keywords]));

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: `${title} | ${SITE.name}`,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(SITE.logo),
      width: 1200,
      height: 630,
    },
    image: absoluteUrl(SITE.logo),
    description:
      "Agile digital product studio building custom web applications, MVPs, and business software optimized for speed and profitability.",
    slogan: SITE.tagline,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.foundingDate,
    areaServed: SITE.areaServed.map((code) =>
      code === "Worldwide"
        ? { "@type": "Place", name: "Worldwide" }
        : { "@type": "Country", name: code }
    ),
    sameAs: SITE.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "sales",
        availableLanguage: ["English", "Hindi", "Malayalam"],
        areaServed: SITE.areaServed,
      },
    ],
    founder: SITE.founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      url: f.url,
      image: absoluteUrl(f.image),
      worksFor: { "@id": `${SITE.url}/#organization` },
    })),
    knowsAbout: [
      "Web Application Development",
      "MVP Development",
      "Landing Page Design",
      "Business Software",
      "Custom Portals",
      "Process Automation",
    ],
    priceRange: "₹₹",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.tagline,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
  type = "WebPage",
}: {
  title: string;
  description: string;
  path: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  price,
  priceCurrency = SITE.priceCurrency,
  priceMax,
}: {
  name: string;
  description: string;
  path: string;
  price?: number | string;
  priceCurrency?: string;
  priceMax?: number | string;
}) {
  const offers: Record<string, unknown> = {
    "@type": "Offer",
    url: absoluteUrl(path),
    priceCurrency,
    availability: "https://schema.org/InStock",
  };

  if (price !== undefined) {
    offers.price = String(price);
  }
  if (priceMax !== undefined) {
    offers.priceSpecification = {
      "@type": "PriceSpecification",
      priceCurrency,
      minPrice: String(price),
      maxPrice: String(priceMax),
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: SITE.areaServed,
    serviceType: name,
    offers,
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function itemListJsonLd(
  name: string,
  items: { name: string; url: string; description?: string; image?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        url: item.url,
        ...(item.description ? { description: item.description } : {}),
        ...(item.image ? { image: absoluteUrl(item.image) } : {}),
      },
    })),
  };
}

export const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const, name: "Home" },
  { path: "/portfolio", priority: 0.9, changeFrequency: "monthly" as const, name: "Portfolio" },
  { path: "/zero-to-mvp", priority: 0.95, changeFrequency: "weekly" as const, name: "Zero to MVP" },
  { path: "/packages", priority: 0.9, changeFrequency: "monthly" as const, name: "Packages" },
  { path: "/capabilities", priority: 0.85, changeFrequency: "monthly" as const, name: "Services" },
  { path: "/process", priority: 0.75, changeFrequency: "monthly" as const, name: "Process" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const, name: "About" },
  { path: "/quality", priority: 0.65, changeFrequency: "yearly" as const, name: "Quality" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const, name: "Contact" },
];
