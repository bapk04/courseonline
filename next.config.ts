/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  
  images: {
    domains: [
      "images.unsplash.com",
      "i.ytimg.com",
      "img.youtube.com"
    ]
  }
  
};


export default nextConfig;

