import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['msw'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'swyp-bucket.kr.object.ncloudstorage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
