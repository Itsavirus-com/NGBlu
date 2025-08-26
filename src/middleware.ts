import { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'

import { PUBLIC_PAGES } from './constants/page'
import { defaultLocale, localePrefix, locales } from './navigation'
import { logAuthToSentry } from './utils/sentry-logger'

const intlMiddleware = createIntlMiddleware({
  defaultLocale,
  locales,
  localePrefix,
})

// Add debug wrapper for auth middleware
function debugAuth(req: NextRequest) {
  // Log auth-related requests
  if (req.nextUrl.pathname.includes('/auth') || req.nextUrl.pathname.includes('/api/auth')) {
    // Get relevant headers for debugging
    const headers = {
      cookie: req.headers.get('cookie') ? 'present' : 'missing',
      authorization: req.headers.get('authorization') ? 'present' : 'missing',
      'user-agent': req.headers.get('user-agent'),
      'content-type': req.headers.get('content-type'),
      'content-length': req.headers.get('content-length'),
      'accept-encoding': req.headers.get('accept-encoding'),
      'accept-language': req.headers.get('accept-language'),
      'x-forwarded-for': req.headers.get('x-forwarded-for'),
      'x-real-ip': req.headers.get('x-real-ip'),
      host: req.headers.get('host'),
      referer: req.headers.get('referer'),
    }

    const authRequestData = {
      url: req.nextUrl.toString(),
      method: req.method,
      headers,
      ip: req.ip || 'unknown',
      geo: req.geo
        ? {
            country: req.geo.country,
            region: req.geo.region,
            city: req.geo.city,
          }
        : 'unknown',
      timestamp: new Date().toISOString(),
    }

    console.log('[MIDDLEWARE DEBUG] Auth request', authRequestData)
    logAuthToSentry('Middleware Auth Request', authRequestData)

    // Special handling for callback URLs
    if (req.nextUrl.pathname.includes('/callback')) {
      const callbackData = {
        provider: req.nextUrl.pathname.split('/').pop(),
        urlLength: req.nextUrl.toString().length,
        hasCode: req.nextUrl.searchParams.has('code'),
        hasError: req.nextUrl.searchParams.has('error'),
        error: req.nextUrl.searchParams.get('error'),
        errorDescription: req.nextUrl.searchParams.get('error_description'),
        state: req.nextUrl.searchParams.has('state') ? 'present' : 'missing',
      }

      console.log('[MIDDLEWARE DEBUG] Auth callback detected', callbackData)
      logAuthToSentry('Middleware Auth Callback Detected', callbackData)

      // Check if the URL exceeds common gateway limits
      if (req.nextUrl.toString().length > 8000) {
        const warningData = {
          urlLength: req.nextUrl.toString().length,
          path: req.nextUrl.pathname,
        }
        console.warn('[MIDDLEWARE DEBUG] URL exceeds common gateway limits', warningData)
        logAuthToSentry('URL Exceeds Gateway Limits', warningData, 'warning')
      }
    }
  }

  return null // Continue with normal middleware flow
}

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Debug token validity
        if (!token) {
          console.log('[MIDDLEWARE DEBUG] Unauthorized request', {
            url: 'unavailable in callback',
            timestamp: new Date().toISOString(),
          })
        }
        return token != null
      },
    },
  }
)

export default function middleware(req: NextRequest) {
  // Run debug logging for all requests
  debugAuth(req)

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${PUBLIC_PAGES.flatMap(p => (p === '/' ? ['', '/'] : p)).join(
      '|'
    )})/?$`,
    'i'
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
