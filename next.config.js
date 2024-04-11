/** @type {import('next').NextConfig} */
const rewritesConfig = require("./rewrite");
const nextConfig = {
  async rewrites() {
    return rewritesConfig;
  },
};

module.exports = nextConfig;
