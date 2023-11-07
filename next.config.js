/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'healthdev-assets.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'qa.api.saudehd.com.br',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333'
      }
    ],
  },
  
}

module.exports = nextConfig
