/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ik.imagekit.io'],
  },
  webpack: (config) => {
    config.resolve.alias['date-fns/locale/en-US'] = 'date-fns/locale/en-US/index.js';
    return config;
  },
};

export default nextConfig;
