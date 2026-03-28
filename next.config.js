/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // This ensures your luxury animations load smoothly
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
