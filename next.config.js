/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 