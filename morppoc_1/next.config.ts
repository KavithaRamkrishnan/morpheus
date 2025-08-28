// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const config: NextConfig = {
  turbopack: {
    root: path.join(__dirname), // <- force workspace root
  },
};

export default config;
