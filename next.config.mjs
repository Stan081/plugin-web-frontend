/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The Image Optimization API (/_next/image) has unauthenticated RCE
    // advisories (SVG/AVIF) with no fix in Next 14, and storage.googleapis.com
    // below allows any bucket, so anyone could feed it a file. Turning it off
    // makes Next 404 that endpoint; images load straight from their source.
    // Re-enable after moving to a patched Next 15.5+.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias["date-fns/locale/en-US"] =
      "date-fns/locale/en-US/index.js";
    return config;
  },
};

export default nextConfig;
