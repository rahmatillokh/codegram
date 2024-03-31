/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["robohash.org"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://codegram-f640.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
