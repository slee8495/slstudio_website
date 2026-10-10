import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/sprout",
        destination: "/roun",
        permanent: true,
      },
      {
        // Daily Math was withdrawn from the studio site. Temporary, in case it comes back.
        source: "/daily-math",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
