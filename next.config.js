/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_API_DOMAIN,
        port: "",
        pathname: "/media",
      },
    ],
  },
};

console.log(process.env.NEXT_PUBLIC_API_DOMAIN);
module.exports = nextConfig;
