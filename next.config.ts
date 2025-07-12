import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ravedron' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/ravedron' : '',
  env: {
    PUBLIC_URL: process.env.NODE_ENV === 'production' ? '/ravedron' : ''
  }
};

export default nextConfig;
