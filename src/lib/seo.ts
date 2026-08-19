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
  dateModified: "2026-08-20",
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
    "website development for startups",
    "website development for small business",
    "B2B website development",
    "custom software development for startups",
    "custom software development for business",
    "web development company for B2B",
    "startup website design and development",
    "business website development India",
    "software development company India",
    "hire software developers for startup",
    "SME website development",
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
  imageAlt = `${SITE.name}: website and software development for startups and B2B companies`,
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
    classification: "Website development and custom software development",
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
    title: "Website and Software Development for Startups & B2B",
    description:
      "Nodewise builds websites and custom software for startups and B2B companies. Landing pages ₹12k–15k. Software from ₹25k. India-based, worldwide.",
    path: "/",
    keywords: [
      "website development for startups",
      "B2B website development",
      "custom software development for business",
      "startup website development India",
      "web development company for B2B",
    ],
  },
  websiteDevelopment: {
    title: "Website Development for Startups and B2B Companies",
    description:
      "Professional website development for new businesses and B2B companies. Conversion-focused sites and landing pages from ₹12,000. Transparent INR pricing.",
    path: "/website-development",
    keywords: [
      "website development for startups",
      "website development for small business",
      "B2B website development",
      "company website development",
      "startup website design",
      "business website development India",
    ],
  },
  softwareDevelopment: {
    title: "Custom Software Development for Startups and B2B",
    description:
      "Custom software development for startups and B2B companies. Portals, dashboards, automation, and web apps from ₹25,000. You own the source.",
    path: "/software-development",
    keywords: [
      "custom software development for startups",
      "custom software development for business",
      "B2B software development",
      "web application development for business",
      "hire software developers for startup",
      "software development company India",
    ],
  },
  zeroToMvp: {
    title: "Zero to MVP: Live Product in 10-14 Days for ₹29,999",
    description:
      "Turn a startup idea into a live, investor-ready MVP in 10–14 days. Fixed ₹29,999: consultation, core features, responsive web app, source, docs, ownership.",
    path: "/zero-to-mvp",
    keywords: [
      "MVP development for startups",
      "build MVP in 2 weeks",
      "fixed price MVP",
      "startup MVP package",
      "investor ready MVP India",
    ],
  },
  portfolio: {
    title: "Website and Software Development Work",
    description:
      "See Nodewise work for startups and B2B: Whitebull research desk, Titan Residences 3D real estate, Mavenix marketing site, FOSS CEAL community platform.",
    path: "/portfolio",
    keywords: [
      "website development portfolio",
      "B2B software case studies",
      "startup product examples",
      "landing page examples",
    ],
    image: "/assets/whitebull-landing.png",
    imageAlt: "Nodewise website and software work: Whitebull equity research desk",
  },
  packages: {
    title: "Landing Page Pricing India from ₹12,000",
    description:
      "Transparent pricing for startups and B2B: websites and landing pages ₹12,000–15,000, custom software from ₹25,000, platforms quoted.",
    path: "/packages",
    keywords: [
      "website development cost India",
      "software development pricing India",
      "affordable website for startups",
      "B2B website package price",
    ],
  },
  capabilities: {
    title: "Website, Portal and Software Development Services",
    description:
      "Website development, custom business portals, dashboards, and workflow automation for startups and B2B companies. Built for speed, clarity, and growth.",
    path: "/capabilities",
    keywords: [
      "website development services",
      "custom web portal development",
      "business dashboard software",
      "web application services for B2B",
    ],
  },
  process: {
    title: "Our Process: Discovery, Build and Launch",
    description:
      "How Nodewise ships websites and software for startups and B2B: discovery, architecture, focused sprints, and a reliable launch.",
    path: "/process",
    keywords: [
      "website development process",
      "custom software delivery process",
      "agile web development for startups",
    ],
  },
  about: {
    title: "About Our India Software Studio",
    description:
      "Meet Nodewise founders Induchoodan V S and Aalif Mohammad R S. India-based studio building websites and custom software for startups and B2B companies.",
    path: "/about",
    keywords: [
      "about Nodewise",
      "website development studio India",
      "software development founders",
    ],
  },
  quality: {
    title: "Quality Standards: Performance, Security and Ownership",
    description:
      "Nodewise engineering bar for startup and B2B builds: performance-first delivery, secure architecture, clean code you own, and documentation your team can extend.",
    path: "/quality",
    keywords: [
      "software quality standards",
      "performance focused web development",
      "clean code ownership",
    ],
  },
  contact: {
    title: "Request a Landing Page or Software Project",
    description:
      "Talk to Nodewise about a startup website, B2B site, or custom software. WhatsApp +91 94469 98827, email contact@nodewise.cc, or send a project brief.",
    path: "/contact",
    keywords: [
      "hire website developers India",
      "hire software developers for startup",
      "contact web development company",
      "B2B software consultation",
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
      "India-based studio building websites and custom software for startups and B2B companies. Professional landing pages, business websites, portals, dashboards, and web applications. Transparent INR pricing. Worldwide delivery.",
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
      "Website development for startups",
      "Website development for small business",
      "B2B website development",
      "Custom software development",
      "Web application development",
      "Landing page development",
      "Business portals",
      "Dashboards",
      "Process automation",
      "MVP development",
      "Next.js",
      "React",
    ],
    serviceType: [
      "Website development",
      "Custom software development",
      "Web application development",
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
        name: "Discuss website or software development",
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
      "Website development and custom software development for startups, new businesses, and B2B companies.",
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
    alternateName: ["Landing Pages", "Website development for startups"],
    serviceType: "Website Development",
    category: "Website Development",
    description:
      "Professional websites and B2B landing pages for startups and growing companies. Conversion-focused first web presence from ₹12,000–15,000 INR.",
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
        minPrice: "12000",
        maxPrice: "15000",
      },
    },
  };
}

function websiteDevelopmentServiceNode() {
  return {
    "@type": "Service",
    "@id": SCHEMA_IDS.websiteDevelopmentService,
    name: "Website Development for Startups and B2B",
    alternateName: [
      "Website development for small business",
      "B2B website development",
      "Startup website design",
    ],
    serviceType: "Website Development",
    category: "Website Development",
    description:
      "Website development for starting businesses and B2B companies. Company sites and landing pages from ₹12,000–15,000 INR.",
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
        minPrice: "12000",
        maxPrice: "15000",
      },
    },
  };
}

function softwareDevelopmentServiceNode() {
  return {
    "@type": "Service",
    "@id": SCHEMA_IDS.softwareDevelopmentService,
    name: "Custom Software Development for Startups and B2B",
    alternateName: [
      "Custom software development for business",
      "B2B software development",
      "Web application development",
    ],
    serviceType: "Custom Software Development",
    category: "Software Development",
    description:
      "Custom software development for startups and B2B companies: portals, dashboards, automation, and web apps from ₹25,000 INR. You own the source.",
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
      price: "25000",
      availability: "https://schema.org/InStock",
      seller: { "@id": SCHEMA_IDS.organization },
    },
  };
}

function softwareStudioServiceNode() {
  return {
    "@type": "Service",
    "@id": SCHEMA_IDS.softwareStudioService,
    name: "Custom Business Software",
    alternateName: ["Software development services", "Business Software"],
    serviceType: "Custom Software Development",
    category: "Software Development",
    description:
      "Custom software development from Nodewise: web platforms, portals, dashboards, and light automation from ₹25,000 INR.",
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
      price: "25000",
      availability: "https://schema.org/InStock",
      seller: { "@id": SCHEMA_IDS.organization },
    },
  };
}

function offerCatalogNode() {
  return {
    "@type": "OfferCatalog",
    "@id": SCHEMA_IDS.offerCatalog,
    name: "Nodewise website and software packages",
    itemListElement: [
      {
        "@type": "Offer",
        position: 1,
        itemOffered: { "@id": SCHEMA_IDS.websiteDevelopmentService },
        name: "Website development",
        description:
          "Websites and landing pages for startups and B2B companies from ₹12,000–15,000 INR.",
        url: absoluteUrl("/website-development"),
        priceCurrency: SITE.priceCurrency,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: SITE.priceCurrency,
          minPrice: "12000",
          maxPrice: "15000",
        },
        seller: { "@id": SCHEMA_IDS.organization },
      },
      {
        "@type": "Offer",
        position: 2,
        itemOffered: { "@id": SCHEMA_IDS.softwareDevelopmentService },
        name: "Custom software development",
        description:
          "Portals, dashboards, automation, and web apps for startups and B2B from ₹25,000 INR.",
        url: absoluteUrl("/software-development"),
        priceCurrency: SITE.priceCurrency,
        price: "25000",
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
    path: "/capabilities",
    priority: 0.8,
    changeFrequency: "monthly" as const,
    name: "Services",
    images: [SITE.ogImage],
  },
  {
    path: "/about",
    priority: 0.7,
    changeFrequency: "monthly" as const,
    name: "About",
    images: [SITE.ogImage, "/assets/induchoodan.png", "/assets/aalif.png"],
  },
  {
    path: "/process",
    priority: 0.7,
    changeFrequency: "monthly" as const,
    name: "Process",
    images: [SITE.ogImage],
  },
  {
    path: "/zero-to-mvp",
    priority: 0.75,
    changeFrequency: "monthly" as const,
    name: "Zero to MVP",
    images: [SITE.ogImage],
  },
  {
    path: "/quality",
    priority: 0.6,
    changeFrequency: "yearly" as const,
    name: "Quality",
    images: [SITE.ogImage],
  },
] as const;
