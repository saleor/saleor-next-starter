
const instanceURL = new URL(process.env.NEXT_PUBLIC_SALEOR_INSTANCE_URI);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.saleor.cloud',
      },
    ],
    domains: [instanceURL.hostname],
  },
};

module.exports = nextConfig;
