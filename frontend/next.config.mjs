/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.openai.com',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/commercial',
        destination: '/faisal-hills-commercial',
        permanent: true,
      },
      {
        source: '/residential',
        destination: '/faisal-hills-blocks',
        permanent: true,
      },
      {
        source: '/faisal-hills-block-a',
        destination: '/blocks/block-a',
        permanent: true,
      },
      {
        source: '/block-b',
        destination: '/blocks/block-b',
        permanent: true,
      },
      {
        source: '/block-c',
        destination: '/blocks/block-c',
        permanent: true,
      },
      {
        source: '/block-d',
        destination: '/blocks/block-d',
        permanent: true,
      },
      {
        source: '/plots-for-sale-taxila',
        destination: '/plots',
        permanent: true,
      },
      {
        source: '/block-b1-extension',
        destination: '/blocks/block-b1-extension',
        permanent: true,
      },
      {
        source: '/payment-plan',
        destination: '/faisal-hills-payment-plan',
        permanent: true,
      },
      {
        source: '/ubaid/admin/plots',
        destination: '/ubaid/admin/login',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
