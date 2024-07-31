/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol:'http',
        hostname:'localhost',
        port:'3000',
        pathname:'/images/**'
      },
      {
        protocol:'https',
        hostname:'newrayvinn.rapidsuite.ng',
        port:'',
        pathname:'/images/**'
      }
    ],
  },
};

module.exports = nextConfig;
