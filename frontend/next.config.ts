import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `
      @use "@/styles/variables" as *;
      @use "@/styles/mixins" as *;
    `,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },

  // async rewrites() {
  //   if (!backendUrl) {
  //     return [];
  //   }

  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${backendUrl}/api/:path*`,
  //     },
  //   ];
  // },

  reactCompiler: true,
};

export default nextConfig;
