import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb', // Increased to support 10MB PDF uploads + metadata
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'hdprrfcrpnusijcfjgbi.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.facebook.com',
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'compren.com.mx',
      },
      {
        protocol: 'https',
        hostname: '**.compren.com.mx',
      },
      {
        protocol: 'https',
        hostname: 'desarrolladoresweb.org',
      },
    ],
  },
};

export default nextConfig;
