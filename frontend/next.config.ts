import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  async redirects() {
    return [
      {
        source: "/ta/overview",
        destination: "/ta",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
