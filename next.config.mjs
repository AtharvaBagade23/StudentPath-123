/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment the following line if you want to disable ESLint during production builds
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Optimize for production
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
}

export default nextConfig
