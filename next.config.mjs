import { withSentryConfig } from '@sentry/nextjs'
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
  webpack: config => {
    return config
  },
  /* Uncomment and simplify rewrites */
  async rewrites() {
    return [
      {
        // This will handle all Socket.IO requests
        source: '/socket-proxy/:path*',
        destination: `${process.env.NEXT_PUBLIC_SOCKET_IO_URL}/:path*`,
      },
    ]
  },
}

export default withSentryConfig(withNextIntl(nextConfig), {
  // Organization and project settings
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Ensure errors are captured in development
  transpileClientSDK: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,

  // Enable debug mode in development to help troubleshoot Sentry issues
  debug: process.env.NODE_ENV === 'development',
})
