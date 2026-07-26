import type { MetadataRoute } from "next";
import { ROUTES, SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: route.path === "/" ? SITE.url : `${SITE.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
