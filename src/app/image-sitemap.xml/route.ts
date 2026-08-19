import { ROUTES, SITE, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const lastmod = SITE.dateModified;
  const urls = ROUTES.map((route) => {
    const loc = escapeXml(absoluteUrl(route.path));
    const images = route.images
      .map((src) => {
        const href = escapeXml(src.startsWith("http") ? src : absoluteUrl(src));
        return `    <image:image>\n      <image:loc>${href}</image:loc>\n    </image:image>`;
      })
      .join("\n");

    const video =
      route.path === "/portfolio"
        ? [
            "    <video:video>",
            `      <video:thumbnail_loc>${escapeXml(absoluteUrl("/assets/whitebull-landing.png"))}</video:thumbnail_loc>`,
            "      <video:title>Nodewise website and software work</video:title>",
            "      <video:description>Selected website and software development work for startups and B2B companies.</video:description>",
            `      <video:content_loc>${escapeXml(absoluteUrl("/assets/node2.mp4"))}</video:content_loc>`,
            "      <video:family_friendly>yes</video:family_friendly>",
            "    </video:video>",
          ].join("\n")
        : "";

    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n${images}${video ? `\n${video}` : ""}\n  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
