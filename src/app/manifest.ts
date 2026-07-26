import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.name,
    description:
      "Agile digital product studio building custom web apps, MVPs, and business software.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c10",
    theme_color: "#0b0c10",
    lang: SITE.language,
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: SITE.logoIcon,
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
