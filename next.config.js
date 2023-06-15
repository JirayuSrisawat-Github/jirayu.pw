/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "docs",
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jirayu.pw",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
