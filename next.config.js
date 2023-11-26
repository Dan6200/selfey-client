/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [process.env.NEXT_PUBLIC_API_DOMAIN] },
};

module.exports = nextConfig;
