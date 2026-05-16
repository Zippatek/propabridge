import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Frontend becomes a "dumb renderer" as per plan
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.propabridge.com' },
    ],
  },
  typescript: { ignoreBuildErrors: true },
}

export default nextConfig
