/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    reactRemoveProperties: false
  },
  experimental: { reactRoot: true }
}

module.exports = nextConfig
