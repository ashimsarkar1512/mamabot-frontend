import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "i.pravatar.cc",
      "images.unsplash.com",
      "nrw.inkleinelevators.com",
      "images-na.ssl-images-amazon.com",
      "m.media-amazon.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "nrw.inkleinelevators.com",
      },
      {
        protocol: "https",
        hostname: "**.amazon.com",
      },
      {
        protocol: "https",
        hostname: "**.media-amazon.com",
      },
    ],
  },
};

export default nextConfig;
