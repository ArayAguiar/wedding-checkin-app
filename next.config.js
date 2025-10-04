/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable experimental features if needed
  },
  images: {
    domains: [
      'api.qrserver.com', // For QR code generation
      'images.unsplash.com', // For Unsplash images
    ],
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Enable SWC minification for better performance
  swcMinify: true,
}

module.exports = nextConfig