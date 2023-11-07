/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'healthdev-assets.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333'
      }
    ],
  }
}

module.exports = nextConfig
