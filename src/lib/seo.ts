import type { Metadata } from "next";

export const SITE = {
  name: "Nodewise",
  legalName: "Nodewise",
  tagline: "Smarter Code. Better Solutions.",
  url: "https://nodewise.cc",
  domain: "nodewise.cc",
  locale: "en_IN",
  language: "en-IN",
  email: "contact@nodewise.cc",
  phone: "+919446998827",
  phoneDisplay: "+91 94469 98827",
  whatsapp: "https://wa.me/919446998827",
  linkedin: "https://www.linkedin.com/company/nodewise-cc",
  logo: "/assets/logo-full.png",
  logoIcon: "/assets/logo-icon.jpg",
  ogImage: "/assets/logo-full.png",
  foundingDate: "2024",
  areaServed: ["IN", "Worldwide"] as const,
  priceCurrency: "INR",
  sameAs: ["https://www.linkedin.com/company/nodewise-cc"] as const,
  founders: [
    {
      name: "Induchoodan V S",
      url: "https://www.linkedin.com/in/induchoodan-v-s-027513291",
      image: "/assets/induchoodan.png",
      jobTitle: "Co-Founder",
    },
    {
      name: "Aalif Mohammad R S",
      url: "https://www.linkedin.com/in/aalif-mohammad-r-s",
      image: "/assets/aalif.png",
      jobTitle: "Co-Founder",
    },
  ] as const,
  keywords: [
    "Nodewise",
    "B2B landing pages India",
    "business software development",
    "custom web development",
    "digital product studio India",
    "Next.js development",
    "INR web development pricing",
    "web application development India",
  ] as const,
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

/** Apex host, no www. Root keeps trailing slash; other paths do not. */
export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return `${SITE.url}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized.replace(/\/+$/, "")}`;
}

function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 100 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = SITE.ogImage,
  imageAlt = `${SITE.name}: ${SITE.tagline}`,
  type = "website",
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const desc = clampDescription(description);
  const allKeywords = Array.from(new Set([...SITE.keywords, ...keywords]));
  const ogTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;

  return {
    title,
    description: desc,
    keywords: allKeywords,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    category: "technology",
    alternates: {
      canonical: url,
      languages: {
        "en-IN": url,
        en: url,
        "x-default": url,
      },
    },
    openGraph: {
      type,
      locale: SITE.locale,
      alternateLocale: ["en_US"],
      url,
      siteName: SITE.name,
      title: ogTitle,
      description: desc,
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
      title: ogTitle,
      description: desc,
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
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
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
      "Agile digital product studio in India building professional B2B landing pages, custom web platforms, and business software. Transparent INR pricing. Worldwide delivery.",
    slogan: SITE.tagline,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.foundingDate,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    sameAs: [...SITE.sameAs],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "sales",
        email: SITE.email,
        availableLanguage: ["English", "Hindi", "Malayalam"],
        areaServed: ["IN", "Worldwide"],
        url: SITE.whatsapp,
      },
    ],
    founder: SITE.founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      url: f.url,
      image: absoluteUrl(f.image),
      jobTitle: f.jobTitle,
      worksFor: { "@id": `${SITE.url}/#organization` },
    })),
    knowsAbout: [
      "Landing Page Development",
      "B2B Websites",
      "Custom Web Applications",
      "Business Software",
      "Business Portals",
      "Dashboards",
      "Process Automation",
      "MVP Development",
      "Next.js",
      "React",
    ],
    makesOffer: {
      "@type": "Offer",
      name: "Landing Pages",
      price: "12000",
      priceCurrency: SITE.priceCurrency,
      url: absoluteUrl("/packages"),
      description:
        "Professional B2B landing pages from 12k–15k INR.",
    },
    priceRange: "INR",
    currenciesAccepted: "INR",
    paymentAccepted: "Bank Transfer, UPI, Online Payment",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: SITE.name,
    alternateName: ["Nodewise.cc", "Nodewise Studio"],
    description:
      "Digital product studio for startup MVPs, custom web platforms, and business software.",
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
    copyrightHolder: { "@id": `${SITE.url}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
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
  image,
}: {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description: clampDescription(description, 300),
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
    ...(image
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteUrl(image),
          },
        }
      : {}),
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  price,
  priceCurrency = SITE.priceCurrency,
  priceMax,
  category,
}: {
  name: string;
  description: string;
  path: string;
  price?: number | string;
  priceCurrency?: string;
  priceMax?: number | string;
  category?: string;
}) {
  const offers: Record<string, unknown> = {
    "@type": "Offer",
    url: absoluteUrl(path),
    priceCurrency,
    availability: "https://schema.org/InStock",
    seller: { "@id": `${SITE.url}/#organization` },
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
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    serviceType: category || name,
    category: category || name,
    offers,
  };
}

export function productOfferJsonLd({
  name,
  description,
  path,
  price,
  image,
}: {
  name: string;
  description: string;
  path: string;
  price: number | string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: { "@type": "Brand", name: SITE.name },
    url: absoluteUrl(path),
    image: absoluteUrl(image || SITE.ogImage),
    category: "Software Development Service",
    offers: {
      "@type": "Offer",
      url: absoluteUrl(path),
      priceCurrency: SITE.priceCurrency,
      price: String(price),
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE.url}/#organization` },
    },
  };
}

export function offerCatalogJsonLd(
  name: string,
  offers: {
    name: string;
    description: string;
    path: string;
    price?: number | string;
    priceMax?: number | string;
  }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name,
    itemListElement: offers.map((o, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: o.name,
      description: o.description,
      url: absoluteUrl(o.path),
      priceCurrency: SITE.priceCurrency,
      ...(o.price !== undefined ? { price: String(o.price) } : {}),
      ...(o.priceMax !== undefined
        ? {
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: SITE.priceCurrency,
              minPrice: String(o.price),
              maxPrice: String(o.priceMax),
            },
          }
        : {}),
      seller: { "@id": `${SITE.url}/#organization` },
    })),
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
  items: {
    name: string;
    url: string;
    description?: string;
    image?: string;
  }[]
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
        url: item.url.startsWith("http") ? item.url : absoluteUrl(item.url),
        ...(item.description ? { description: item.description } : {}),
        ...(item.image
          ? {
              image: item.image.startsWith("http")
                ? item.image
                : absoluteUrl(item.image),
            }
          : {}),
        creator: { "@id": `${SITE.url}/#organization` },
      },
    })),
  };
}

export const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const, name: "Home" },
  { path: "/packages", priority: 1.0, changeFrequency: "weekly" as const, name: "Pricing" },
  { path: "/portfolio", priority: 0.9, changeFrequency: "monthly" as const, name: "Work" },
  { path: "/zero-to-mvp", priority: 0.7, changeFrequency: "monthly" as const, name: "Zero to MVP" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" as const, name: "Contact" },
  { path: "/capabilities", priority: 0.8, changeFrequency: "monthly" as const, name: "Services" },
  { path: "/process", priority: 0.7, changeFrequency: "monthly" as const, name: "Process" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const, name: "About" },
  { path: "/quality", priority: 0.6, changeFrequency: "yearly" as const, name: "Quality" },
] as const;

export const PAGE_SEO = {
  home: {
    title: "B2B Landing Pages and Business Software in India",
    description:
      "Nodewise builds professional B2B landing pages and business software. Landing pages 12k–15k INR. Software from 25k+. Transparent pricing. Worldwide delivery.",
    keywords: [
      "B2B landing pages India",
      "business software development",
      "custom web platforms",
      "INR web development pricing",
      "professional landing page",
    ],
  },
  zeroToMvp: {
    title: "Zero to MVP: Live Product in 10-14 Days for ₹29,999",
    description:
      "Turn your idea into a live, investor-ready MVP in 10–14 days. Fixed ₹29,999: consultation, core features, responsive web app, source code, docs and full ownership transfer.",
    keywords: [
      "MVP development India",
      "build MVP in 2 weeks",
      "fixed price MVP",
      "startup MVP package",
      "investor ready MVP",
    ],
  },
  portfolio: {
    title: "Work and Case Studies: Landing Pages and Software",
    description:
      "See Nodewise work: Whitebull equity research desk, Titan Residences 3D real estate, Mavenix marketing site, FOSS CEAL community platform. Live products and high-converting landing pages.",
    keywords: [
      "web development portfolio India",
      "MVP case studies",
      "landing page examples",
      "startup product examples",
    ],
    image: "/assets/whitebull-landing.png",
  },
  packages: {
    title: "Web Development Pricing India: Landing Pages from ₹12k",
    description:
      "Transparent Nodewise pricing: B2B landing pages ₹12,000–15,000, business software from ₹25,000, custom platforms quoted.",
    keywords: [
      "web development cost India",
      "website package price",
      "affordable custom software",
      "INR web development pricing",
    ],
  },
  capabilities: {
    title: "Services: Web Platforms, Portals and Automation",
    description:
      "Nodewise services: high-converting web presence, custom business portals and dashboards, and workflow automation. Built for speed, clarity, and growth.",
    keywords: [
      "custom web portal development",
      "business dashboard software",
      "process automation India",
      "web application services",
    ],
  },
  process: {
    title: "Our Process: Discovery, Build and Launch",
    description:
      "How Nodewise ships software: discovery, architecture, focused sprints, and reliable launch. A clear path from idea or bottleneck to a live product.",
    keywords: [
      "MVP development process",
      "agile web development workflow",
      "software delivery process",
    ],
  },
  about: {
    title: "About Nodewise: Digital Product Studio Founders",
    description:
      "Meet Nodewise founders Induchoodan V S and Aalif Mohammad R S. A sharp India-based studio building B2B landing pages and custom web software.",
    keywords: [
      "about Nodewise",
      "digital product studio India",
      "web development founders",
    ],
  },
  quality: {
    title: "Quality Standards: Performance, Security and Ownership",
    description:
      "Nodewise engineering bar: performance-first delivery, secure architecture, clean code you own, and documentation so your team can extend the product.",
    keywords: [
      "software quality standards",
      "performance focused development",
      "clean code ownership",
    ],
  },
  contact: {
    title: "Contact Nodewise: Landing Pages and Software",
    description:
      "Talk to Nodewise about a B2B landing page or business software. WhatsApp +91 94469 98827, email contact@nodewise.cc, or send a project brief online.",
    keywords: [
      "contact web developers India",
      "hire web developers India",
      "schedule software consultation",
      "WhatsApp web agency",
    ],
  },
} as const;