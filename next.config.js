/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'localhost',
      'gemstonesmontessori.com',
      'rayvvin.onrender.com'
      //   'res.cloudinary.com',
      //   'res.cloudinary.co',
      //   'blog.voyagequest.travel',
      //   'blog.tgmtravels.org',
      //   'secure.gravatar.com',
      //   'article.com'
    ],
  },
};

module.exports = nextConfig;
