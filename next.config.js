/** @type {import('next').NextConfig} */

const instanceURL = new URL(process.env.NEXT_PUBLIC_SALEOR_INSTANCE_URI);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [instanceURL.hostname],
  },
};

module.exports = nextConfig;
