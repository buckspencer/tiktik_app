/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "randomuser.me",
      "3xnhi43vikn244hoyg160zl4-wpengine.netdna-ssl.com",
    ],
  },
};

module.exports = nextConfig;
