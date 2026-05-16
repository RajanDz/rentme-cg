import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // When real photos ship, add external CDN origins here, e.g.:
    // remotePatterns: [{ protocol: 'https', hostname: 'cdn.rentme.cg' }],
  },
}

export default nextConfig
