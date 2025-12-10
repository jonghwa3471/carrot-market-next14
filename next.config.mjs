/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "imagedelivery.net",
      },
    ],
  },
  /*   experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  }, */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
