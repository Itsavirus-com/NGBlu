import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'io2-frontend.development.ngblu.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'io2-frontend.staging.ngblu.io',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'], // Optioneel als je WebP wilt ondersteunen
  },
  webpack: (config, { buildId, dev, isServer }) => {
    console.log('Build Environment Variables:', {
      MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      NODE_ENV: process.env.NODE_ENV,
      isServer,
    })
    return config
  },
}

export default withNextIntl(nextConfig)
