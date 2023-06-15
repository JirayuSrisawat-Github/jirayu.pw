/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "docs",
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
