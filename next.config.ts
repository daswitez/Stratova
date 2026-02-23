import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Tree-shake barrel exports — dramatically reduces bundle size for icon/chart libs
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "@mui/icons-material",
      "@mui/material",
      "@radix-ui/react-icons",
      "date-fns",
    ],
  },
};

export default nextConfig;
