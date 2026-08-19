import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "PerplexityBot",
  "ClaudeBot",
  "Applebot-Extended",
  "CCBot",
  "anthropic-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: ["/", "/llms.txt"],
      },
    ],
    host: SITE.url,
    sitemap: [`${SITE.url}/sitemap.xml`, `${SITE.url}/image-sitemap.xml`],
  };
}
