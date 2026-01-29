import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
<<<<<<< HEAD
    domains: [
      "i.pravatar.cc",
      "images.unsplash.com",
      "nrw.inkleinelevators.com",
=======
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
>>>>>>> ahsan
    ],
  },
};

export default nextConfig;
