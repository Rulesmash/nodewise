import { ROUTES, SITE } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 86400;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(date: Date): string {
  // Google prefers simple W3C dates; avoid millisecond ISO strings
  return date.toISOString().slice(0, 10);
}

function formatPriority(priority: number): string {
  return priority.toFixed(1);
}

export function GET() {
  const lastmod = formatDate(new Date());

  const urls = ROUTES.map((route) => {
    const loc =
      route.path === "/" ? `${SITE.url}/` : `${SITE.url}${route.path}`;

    return [
      "  <url>",
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${route.changeFrequency}</changefreq>`,
      `    <priority>${formatPriority(route.priority)}</priority>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
