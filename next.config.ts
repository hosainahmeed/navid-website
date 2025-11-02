import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      '18.219.241.81',
      'api.divandioneapp.com',
      'images.unsplash.com',
      'placehold.co',
      "i.pinimg.com",
      "example.com",
      "amazon.com",
      "amazon.in",
      "m.media-amazon.com",
      "i0.wp.com",
      "5.imimg.com",
      "birdiemaedesigns.com",
      "img.freepik.com","10.10.20.54","192.168.0.103","localhost"],
    // unoptimized: true
    // Alternatively, you can use remotePatterns for more control:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;
