import createMiddleware from 'next-intl/middleware'

import { defaultLocale, localePrefix, locales } from './navigation'

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
})

export const config = {
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
