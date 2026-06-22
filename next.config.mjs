/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The episode wall is a progressive enhancement over a server-rendered list
  // of real <a> links, so every page is fully static-generated for SEO/GEO.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
