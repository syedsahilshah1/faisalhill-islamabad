/** @type {import('next').NextConfig} */
const isVercel = Boolean(process.env.VERCEL);

const nextConfig = {
  output: isVercel
    ? undefined
    : (process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : 'export'),
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },

  // Do not advertise the framework and version to every visitor.
  poweredByHeader: false,

  // Gzip responses at the server. This is the single largest bandwidth win for
  // the JSON payloads this app renders, since plot inventory and CMS blocks are
  // highly repetitive text.
  compress: true,

  // Keep the client bundle free of source maps in production builds.
  productionBrowserSourceMaps: false,
};

export default nextConfig;