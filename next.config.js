/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
};

module.exports = nextConfig; 