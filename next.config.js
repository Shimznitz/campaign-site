/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'thepalacenews.com' },
      { protocol: 'https', hostname: 'thenewspointer.com.ng' },
    ],
  },
};

module.exports = nextConfig;