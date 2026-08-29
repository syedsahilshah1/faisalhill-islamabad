/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
