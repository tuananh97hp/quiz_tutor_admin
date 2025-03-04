/**
 * @type {import('next').NextConfig}
 * Document: https://nextjs.org/docs/app/api-reference/next-config-js
 **/
const nextConfig = {
  distDir: 'build',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  env: {
    customKey: 'key',
  },
  // Docs: https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ];
  },
};

module.exports = nextConfig;
