/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // Disable image optimization for static files
  },
  experimental: {
    serverComponentsExternalPackages: ['mssql'],
  },
}

module.exports = nextConfig