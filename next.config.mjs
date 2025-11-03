// Import from the new, safe slugs file
import { getAllServiceSlugs } from './components/data/service-slugs.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return getAllServiceSlugs();
  },
};

export default nextConfig;