/** @type {import('next').NextConfig} */
const nextConfig = { images: { domains: [process.env.PUBLIC_API_DOMAIN] } };

module.exports = nextConfig;
