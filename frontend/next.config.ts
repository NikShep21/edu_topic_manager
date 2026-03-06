import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "@/styles/variables as *"`,
  },
  reactCompiler: true,
};

export default nextConfig;
