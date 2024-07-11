/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        { hostname: "images.unsplash.com" },
        { hostname: "google.com/url" },
        { hostname: "lh3.googleusercontent.com" },
        { hostname: "images.pexels.com" },
      ],
    },
  };
  
  module.exports = nextConfig;
