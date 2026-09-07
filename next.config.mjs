/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nodewise.cc" }],
        destination: "https://nodewise.cc/:path*",
        statusCode: 301,
      },
      { source: "/services", destination: "/packages", permanent: true },
      { source: "/capabilities", destination: "/packages", permanent: true },
      { source: "/process", destination: "/about", permanent: true },
      { source: "/quality", destination: "/about", permanent: true },
      { source: "/work", destination: "/portfolio", permanent: true },
      { source: "/pricing", destination: "/packages", permanent: true },
      { source: "/web-development", destination: "/website-development", permanent: true },
      { source: "/website-design", destination: "/website-development", permanent: true },
      { source: "/startup-website", destination: "/website-development", permanent: true },
      { source: "/b2b-website", destination: "/website-development", permanent: true },
      { source: "/custom-software", destination: "/software-development", permanent: true },
      { source: "/custom-software-development", destination: "/software-development", permanent: true },
      { source: "/software-development-company", destination: "/software-development", permanent: true },
      { source: "/mvp", destination: "/packages", permanent: true },
      { source: "/zero-to-mvp", destination: "/packages", permanent: true },
      { source: "/hire", destination: "/contact", permanent: true },
      { source: "/premium-web-dev", destination: "/premium-web-development", permanent: true },
      { source: "/premium-website-development", destination: "/premium-web-development", permanent: true },
      { source: "/kerala", destination: "/website-developers-kerala", permanent: true },
      { source: "/web-developers-kerala", destination: "/website-developers-kerala", permanent: true },
      { source: "/website-developers-in-kerala", destination: "/website-developers-kerala", permanent: true },
      { source: "/best-website-developers-kerala", destination: "/website-developers-kerala", permanent: true },
      { source: "/kochi-web-developers", destination: "/website-developers-kerala", permanent: true },
      { source: "/trivandrum-web-developers", destination: "/website-developers-kerala", permanent: true },
      { source: "/ai-search-optimization", destination: "/ai-seo", permanent: true },
      { source: "/generative-engine-optimization", destination: "/ai-seo", permanent: true },
      { source: "/llm-seo", destination: "/ai-seo", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/image-sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

