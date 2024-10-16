import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

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
}

export default withNextIntl(nextConfig);
