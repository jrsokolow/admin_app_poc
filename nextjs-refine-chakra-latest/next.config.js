/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ['@refinedev/chakra-ui', '@refinedev/react-hook-form'],
}

module.exports = nextConfig


