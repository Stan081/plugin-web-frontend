/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
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
