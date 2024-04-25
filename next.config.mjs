/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
};

export default nextConfig;
