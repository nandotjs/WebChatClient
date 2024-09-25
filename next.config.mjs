/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    port: 5000
  },
  publicRuntimeConfig: {
    port: 5000
  }
}

export default nextConfig;
