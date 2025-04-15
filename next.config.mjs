/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 Skips all ESLint checks
  },
};

export default nextConfig;
