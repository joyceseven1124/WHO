/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '**',
      },
    ],
    // domains: ['firebasestorage.googleapis.com'],
  },
  // experimental: {
  //   appDir: true,
  // },
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
};

export default nextConfig;
