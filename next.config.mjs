import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
      domains: [
        'localhost',
        'io2-frontend.development.ngblu.io',
        'io2-frontend.staging.ngblu.io'
      ],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      formats: ['image/webp'], // Optioneel als je WebP wilt ondersteunen
}

export default withNextIntl(nextConfig)
