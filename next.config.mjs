/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co'
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co'
      },
      {
        protocol: 'https',
        hostname: 'seed-mix-image.spotifycdn.com'
      },
      {
        protocol: 'https',
        hostname: "thisis-images.spotifycdn.com"
      },
      {
        protocol: 'https',
        hostname: 'dailymix-images.scdn.co'
      },
      {
        protocol: 'https',
        hostname: "image-cdn-ak.spotifycdn.com"
      },
      {
        protocol: 'https',
        hostname: "lineup-images.scdn.co"
      },
      {
        protocol: 'https',
        hostname: "image-cdn-fa.spotifycdn.com"
      },
      {
        protocol: 'https',
        hostname: "lineup-images.scdn.co"
      }
    ]
  }
};

export default nextConfig;
