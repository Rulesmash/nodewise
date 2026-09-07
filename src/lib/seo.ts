import type { Metadata } from "next";

export const SITE = {
  name: "Nodewise",
  legalName: "Nodewise",
  tagline: "Smarter Code. Better Solutions.",
  studioName: "Nodewise Software Studio",
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
  dateModified: "2026-09-08",
  areaServed: ["IN", "Worldwide"] as const,
  priceCurrency: "INR",
  sameAs: ["https://www.linkedin.com/company/nodewise-cc"] as const,
  alternateNames: [
    "Nodewise Software Studio",
    "Nodewise Studio",
    "Nodewise.cc",
  ] as const,
  naics: "541511",
  isicV4: "6201",
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
    "B2B website development",
    "web application development",
    "website engineering India",
    "custom software development for business",
    "Next.js website development",
    "B2B web applications",
    "company website development",
    "software development company India",
    "custom web application development",
    "Nodewise",
  ] as const,
} as const;

export const SCHEMA_IDS = {
  organization: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
  logo: `${SITE.url}/#logo`,
  landingPageService: `${SITE.url}/#landing-page-service`,
  softwareStudioService: `${SITE.url}/#software-studio-service`,
  websiteDevelopmentService: `${SITE.url}/#website-development-service`,
  softwareDevelopmentService: `${SITE.url}/#software-development-service`,
  offerCatalog: `${SITE.url}/#offer-catalog`,
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

function brandedTitle(title: string): string {
  return title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
}

const audience = [
  { "@type": "Audience", audienceType: "Startups and new businesses" },
  { "@type": "Audience", audienceType: "Small and medium businesses" },
  { "@type": "BusinessAudience", audienceType: "B2B companies" },
];

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = SITE.ogImage,
  imageAlt = `${SITE.name}: B2B website and web application engineering`,
  type = "website",
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const desc = clampDescription(description);
  const allKeywords = Array.from(new Set([...SITE.keywords, ...keywords]));
  const ogTitle = brandedTitle(title);
  const isHome = path === "/";

  return {
    title: isHome ? { absolute: ogTitle } : title,
    description: desc,
    keywords: allKeywords,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.studioName,
    publisher: SITE.name,
    category: "technology",
    classification: "Website and web application engineering",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: url,
      languages: {
        "en-IN": url,
        en: url,
        "x-default": url,
      },
      types: {
        "text/plain": absoluteUrl("/llms.txt"),
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
      countryName: "India",
      emails: [SITE.email],
      phoneNumbers: [SITE.phoneDisplay],
      determiner: "the",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: imageUrl.endsWith(".jpg") ? "image/jpeg" : "image/png",
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
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    other: {
      "og:logo": absoluteUrl(SITE.logo),
    },
  };
}

export const PAGE_SEO = {
  home: {
    title: "B2B Website and Web Application Engineering",
    description:
      "Nodewise engineers Next.js websites and web applications for B2B. Sites from ₹20,000. Web apps ₹1–1.5 lakh. India studio, worldwide.",
    path: "/",
    keywords: [
      "B2B website development",
      "web application engineering",
      "Next.js website development",
      "custom web application development",
    ],
  },
  websiteDevelopment: {
    title: "B2B Website Engineering in Next.js",
    description:
      "Custom-coded Next.js websites for B2B companies. Three pages from ₹20,000. Extra pages priced in the calculator. No WordPress.",
    path: "/website-development",
    keywords: [
      "B2B website development",
      "company website development",
      "Next.js website development",
      "business website development India",
    ],
  },
  softwareDevelopment: {
    title: "Web Application Engineering for B2B",
    description:
      "Portals, dashboards, and internal tools for B2B teams. Next.js, Node, PostgreSQL. ₹1–1.5 lakh. You own the source.",
    path: "/software-development",
    keywords: [
      "web application development for business",
      "B2B software development",
      "custom web application development",
      "software development company India",
    ],
  },
  portfolio: {
    title: "Website and Web Application Work",
    description:
      "Nodewise work: Whitebull research desk, Titan Residences 3D real estate, Mavenix marketing site, FOSS CEAL community platform.",
    path: "/portfolio",
    keywords: [
      "website development portfolio",
      "web application case studies",
      "B2B product examples",
    ],
    image: "/assets/whitebull-landing.png",
    imageAlt: "Nodewise work: Whitebull equity research desk",
  },
  packages: {
    title: "Website and Web Application Pricing from ₹20,000",
    description:
      "Published INR pricing: Next.js sites from ₹20,000, web applications ₹1–1.5 lakh, platforms quoted.",
    path: "/packages",
    keywords: [
      "website development cost India",
      "web application pricing India",
      "B2B website package price",
    ],
  },
  about: {
    title: "Nodewise Engineering Studio",
    description:
      "India studio led by Induchoodan V S and Aalif Mohammad R S. B2B websites and web applications in Next.js and Node.",
    path: "/about",
    keywords: [
      "about Nodewise",
      "website engineering studio India",
      "web application founders",
    ],
  },
  contact: {
    title: "Start a Website or Web Application Project",
    description:
      "Brief Nodewise on a B2B website, web application, or quoted platform. WhatsApp +91 94469 98827, email contact@nodewise.cc.",
    path: "/contact",
    keywords: [
      "hire website developers India",
      "hire web application developers",
      "contact web engineering studio",
    ],
  },
} as const;

export type PageSeoKey = keyof typeof PAGE_SEO;

export function pageMetadata(
  key: PageSeoKey,
  extra: Partial<PageSeoInput> = {}
): Metadata {
  const page = PAGE_SEO[key];
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: [...page.keywords],
    ...("image" in page && page.image ? { image: page.image } : {}),
    ...("imageAlt" in page && page.imageAlt ? { imageAlt: page.imageAlt } : {}),
    ...extra,
  });
}

function logoNode() {
  return {
    "@type": "ImageObject",
    "@id": SCHEMA_IDS.logo,
    url: absoluteUrl(SITE.logo),
    contentUrl: absoluteUrl(SITE.logo),
    width: 1200,
    height: 630,
    caption: SITE.name,
  };
}

function founderNodes() {
  return SITE.founders.map((f) => ({
    "@type": "Person",
    name: f.name,
    url: f.url,
    image: absoluteUrl(f.image),
    jobTitle: f.jobTitle,
    worksFor: { "@id": SCHEMA_IDS.organization },
    sameAs: [f.url],
  }));
}

function organizationNode() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": SCHEMA_IDS.organization,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: [...SITE.alternateNames],
    url: SITE.url,
    logo: { "@id": SCHEMA_IDS.logo },
    image: { "@id": SCHEMA_IDS.logo },
    description:
      "India studio engineering B2B websites and web applications. Next.js sites, portals, dashboards, and custom software. Published INR pricing. Worldwide delivery.",
    slogan: SITE.tagline,
    brand: { "@type": "Brand", name: SITE.name, logo: { "@id": SCHEMA_IDS.logo } },
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.foundingDate,
    naics: SITE.naics,
    isicV4: SITE.isicV4,
    numberOfEmployees: { "@type": "QuantitativeValue", value: 2 },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    audience,
    sameAs: [...SITE.sameAs],
    knowsLanguage: ["en", "hi", "ml"],
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
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.email,
        url: absoluteUrl("/contact"),
        availableLanguage: ["English", "Hindi", "Malayalam"],
      },
    ],
    founder: founderNodes(),
    knowsAbout: [
      "B2B website development",
      "Web application engineering",
      "Custom software development",
      "Landing page development",
      "Business portals",
      "Dashboards",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
    ],
    serviceType: [
      "Website engineering",
      "Web application engineering",
      "Custom software development",
      "B2B landing pages",
    ],
    hasOfferCatalog: { "@id": SCHEMA_IDS.offerCatalog },
    makesOffer: [
      { "@id": SCHEMA_IDS.websiteDevelopmentService },
      { "@id": SCHEMA_IDS.softwareDevelopmentService },
      { "@id": SCHEMA_IDS.landingPageService },
      { "@id": SCHEMA_IDS.softwareStudioService },
    ],
    potentialAction: [
      {
        "@type": "CommunicateAction",
        name: "Discuss a website or web application",
        target: {
          "@type": "EntryPoint",
          urlTemplate: SITE.whatsapp,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform",
          ],
        },
      },
      {
        "@type": "OrderAction",
        name: "Send a project brief",
        target: absoluteUrl("/contact"),
      },
    ],
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Bank Transfer, UPI, Online Payment",
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": SCHEMA_IDS.website,
    url: `${SITE.url}/`,
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    description:
      "B2B website and web application engineering. Next.js, Node, PostgreSQL.",
    publisher: { "@id": SCHEMA_IDS.organization },
    inLanguage: SITE.language,
    copyrightHolder: { "@id": SCHEMA_IDS.organization },
    about: { "@id": SCHEMA_IDS.organization },
  };
}

function landingPageServiceNode() {
  return {
    "@type": "Service",
    "@id": SCHEMA_IDS.landingPageService,
    name: "B2B Landing Page Development",
    alternateName: ["Landing Pages", "B2B website engineering"],
    serviceType: "Website Engineering",
    category: "Website Development",
    description:
      "Custom-coded Next.js sites and B2B landing pages. From ₹20,000 INR. No WordPress.",
    url: absoluteUrl("/website-development"),
    provider: { "@id": SCHEMA_IDS.organization },
    audience,
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/website-development"),
      priceCurrency: SITE.priceCurrency,
      availability: "https://schema.org/InStock",
      seller: { "@id": SCHEMA_IDS.organization },
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: SITE.priceCurrency,
        minPrice: "20000",
      },
    },
  };
}

function websiteDevelopmentServiceNode() {
  return {
    "@type": "Service",
    "@id": SCHEMA_IDS.websiteDevelopmentService,
    name: "B2B Website Engineering",
    alternateName: [
      "Website development for B2B",
      "Company website development",
      "Next.js website engineering",
    ],
    serviceType: "Website Engineering",
    category: "Website Development",
    description:
      "Custom Next.js websites for B2B companies. From ₹20,000 INR. No WordPress.",
    url: absoluteUrl("/website-development"),
    provider: { "@id": SCHEMA_IDS.organization },
    audience,
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/website-development"),
      priceCurrency: SITE.priceCurrency,
      availability: "https://schema.org/InStock",
      seller: { "@id": SCHEMA_IDS.organization },
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: SITE.priceCurrency,
        minPrice: "20000",
      },
    },
  };
}

function softwareDevelopmentServiceNode() {
  return {
    "@type": "Service",
    "@id": SCHEMA_IDS.softwareDevelopmentService,
    name: "Web Application Engineering for B2B",
    alternateName: [
      "Custom software development for business",
      "B2B software development",
      "Web application development",
    ],
    serviceType: "Web Application Engineering",
    category: "Software Development",
    description:
      "Portals, dashboards, internal tools, and web applications for B2B teams. ₹1–1.5 lakh INR. You own the source.",
    url: absoluteUrl("/software-development"),
    provider: { "@id": SCHEMA_IDS.organization },
    audience,
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/software-development"),
      priceCurrency: SITE.priceCurrency,
      price: "100000",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: SITE.priceCurrency,
        minPrice: "100000",
        maxPrice: "150000",
      },
      availability: "https://schema.org/InStock",
      seller: { "@id": SCHEMA_IDS.organization },
    },
  };
}

function softwareStudioServiceNode() {
  return {
    "@type": "Service",
    "@id": SCHEMA_IDS.softwareStudioService,
    name: "Web Applications",
    alternateName: ["Software development services", "Business Software"],
    serviceType: "Web Application Engineering",
    category: "Software Development",
    description:
      "Web applications from Nodewise: portals, dashboards, and light automation for ₹1–1.5 lakh INR.",
    url: absoluteUrl("/software-development"),
    provider: { "@id": SCHEMA_IDS.organization },
    audience,
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/software-development"),
      priceCurrency: SITE.priceCurrency,
      price: "100000",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: SITE.priceCurrency,
        minPrice: "100000",
        maxPrice: "150000",
      },
      availability: "https://schema.org/InStock",
      seller: { "@id": SCHEMA_IDS.organization },
    },
  };
}

function offerCatalogNode() {
  return {
    "@type": "OfferCatalog",
    "@id": SCHEMA_IDS.offerCatalog,
    name: "Nodewise website and web application packages",
    itemListElement: [
      {
        "@type": "Offer",
        position: 1,
        itemOffered: { "@id": SCHEMA_IDS.websiteDevelopmentService },
        name: "Website engineering",
        description:
          "Custom Next.js sites for B2B companies from ₹20,000 INR.",
        url: absoluteUrl("/website-development"),
        priceCurrency: SITE.priceCurrency,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: SITE.priceCurrency,
          minPrice: "20000",
        },
        seller: { "@id": SCHEMA_IDS.organization },
      },
      {
        "@type": "Offer",
        position: 2,
        itemOffered: { "@id": SCHEMA_IDS.softwareDevelopmentService },
        name: "Web application engineering",
        description:
          "Portals, dashboards, and web applications for B2B teams. ₹1–1.5 lakh INR.",
        url: absoluteUrl("/software-development"),
        priceCurrency: SITE.priceCurrency,
        price: "100000",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: SITE.priceCurrency,
          minPrice: "100000",
          maxPrice: "150000",
        },
        seller: { "@id": SCHEMA_IDS.organization },
      },
      {
        "@type": "Offer",
        position: 3,
        name: "Custom Platforms",
        description: "Multi-user software platforms and integrations. Quoted.",
        url: absoluteUrl("/packages"),
        seller: { "@id": SCHEMA_IDS.organization },
      },
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    ...organizationNode(),
    logo: logoNode(),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    ...websiteNode(),
  };
}

/** Single @graph for the site: website and software development offers. */
export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      logoNode(),
      organizationNode(),
      websiteNode(),
      websiteDevelopmentServiceNode(),
      softwareDevelopmentServiceNode(),
      landingPageServiceNode(),
      softwareStudioServiceNode(),
      offerCatalogNode(),
    ],
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
  mainEntity,
}: {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
  mainEntity?: Record<string, unknown> | Record<string, unknown>[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description: clampDescription(description, 300),
    isPartOf: { "@id": SCHEMA_IDS.website },
    about: { "@id": SCHEMA_IDS.organization },
    inLanguage: SITE.language,
    dateModified: SITE.dateModified,
    ...(image
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteUrl(image),
          },
        }
      : {}),
    ...(mainEntity ? { mainEntity } : {}),
    publisher: { "@id": SCHEMA_IDS.organization },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".page-hero-subtitle", ".hero-title", ".hero-offer"],
    },
    potentialAction: {
      "@type": "ReadAction",
      target: absoluteUrl(path),
    },
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
  id,
}: {
  name: string;
  description: string;
  path: string;
  price?: number | string;
  priceCurrency?: string;
  priceMax?: number | string;
  category?: string;
  id?: string;
}) {
  const offers: Record<string, unknown> = {
    "@type": "Offer",
    url: absoluteUrl(path),
    priceCurrency,
    availability: "https://schema.org/InStock",
    seller: { "@id": SCHEMA_IDS.organization },
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
    ...(id ? { "@id": id } : {}),
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": SCHEMA_IDS.organization },
    audience,
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
    audience,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(path),
      priceCurrency: SITE.priceCurrency,
      price: String(price),
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": SCHEMA_IDS.organization },
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
      seller: { "@id": SCHEMA_IDS.organization },
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
        creator: { "@id": SCHEMA_IDS.organization },
      },
    })),
  };
}

export const PORTFOLIO_SITEMAP_IMAGES = [
  "/assets/whitebull-landing.png",
  "/assets/whitebull-nifty50.png",
  "/assets/whitebull-banknifty.png",
  "/assets/whitebull-analysis.png",
  "/assets/whitebull-predictor.png",
  "/assets/titan-hero.png",
  "/assets/titan-features.png",
  "/assets/titan-blueprint.png",
  "/assets/titan-amenities.png",
  "/assets/titan-residence.png",
  "/assets/mavenix-hero.png",
  "/assets/mavenix-services.png",
  "/assets/mavenix-about.png",
  "/assets/fossceal-landing.png",
  "/assets/fossceal-portal.png",
  "/assets/fossceal-create.png",
  "/assets/fossceal-train.png",
  "/assets/fossceal-branding.png",
] as const;

export const ROUTES = [
  {
    path: "/",
    priority: 1.0,
    changeFrequency: "weekly" as const,
    name: "Home",
    images: [SITE.ogImage],
  },
  {
    path: "/website-development",
    priority: 0.95,
    changeFrequency: "weekly" as const,
    name: "Website Development",
    images: [SITE.ogImage],
  },
  {
    path: "/software-development",
    priority: 0.95,
    changeFrequency: "weekly" as const,
    name: "Software Development",
    images: [SITE.ogImage],
  },
  {
    path: "/packages",
    priority: 1.0,
    changeFrequency: "weekly" as const,
    name: "Pricing",
    images: [SITE.ogImage],
  },
  {
    path: "/contact",
    priority: 0.85,
    changeFrequency: "monthly" as const,
    name: "Contact",
    images: [SITE.ogImage],
  },
  {
    path: "/portfolio",
    priority: 0.9,
    changeFrequency: "monthly" as const,
    name: "Work",
    images: [...PORTFOLIO_SITEMAP_IMAGES],
  },
  {
    path: "/about",
    priority: 0.7,
    changeFrequency: "monthly" as const,
    name: "Studio",
    images: [SITE.ogImage, "/assets/induchoodan.png", "/assets/aalif.png"],
  },
] as const;
