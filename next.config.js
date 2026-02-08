/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: true },
      { source: '/services', destination: '/', permanent: true },
      { source: '/technology', destination: '/', permanent: true },
      { source: '/guides', destination: '/insights', permanent: true },
      { source: '/guides/office-costs-calgary', destination: '/insights/office-costs-calgary', permanent: true },
      { source: '/guides/sublease-vs-headlease', destination: '/insights/sublease-vs-headlease', permanent: true },
      { source: '/guides/plan-office-move-calgary', destination: '/insights/plan-office-move', permanent: true },
    ];
  },
};

module.exports = nextConfig;
