import { NextRequest } from 'next/server'
import NextAuth from 'next-auth'

import { authOptions } from '@/lib/auth'
import { log502ToSentry, logAuthToSentry } from '@/utils/sentry-logger'
import { analyzeNginxRequest, analyzeNginxUrl } from '@/utils/server/nginx-debug'
import {
  analyzeUrlParameters,
  checkRequestLimits,
  logHttpRequest,
  logServerError,
} from '@/utils/server/request-logger'

// Add debug logging to track NextAuth requests
async function authHandler(req: NextRequest, ...args: any[]) {
  try {
    // Log the request with our utility
    logHttpRequest(req as unknown as Request, 'NextAuth Request')

    // Extract request information for debugging
    const url = new URL(req.url)
    const isCallback = url.pathname.includes('/callback')
    const isError = url.pathname.includes('/error') || url.searchParams.has('error')
    const provider = isCallback ? url.pathname.split('/').pop() : null

    // Check if request might exceed gateway limits
    const limitCheck = checkRequestLimits(req as unknown as Request)

    // Analyze URL parameters
    analyzeUrlParameters(req.url)

    // Special logging for Azure AD callbacks
    if (isCallback && provider === 'azure-ad') {
      console.log('[NEXTAUTH DEBUG] Processing Azure AD callback', {
        timestamp: new Date().toISOString(),
        urlLength: req.url.length,
        hasCode: url.searchParams.has('code'),
        codePresent: url.searchParams.has('code') ? 'yes' : 'no',
        codeLength: url.searchParams.get('code')?.length || 0,
      })

      // Send to Sentry
      logAuthToSentry('Azure AD Callback Processing', {
        urlLength: req.url.length,
        hasCode: url.searchParams.has('code'),
        codeLength: url.searchParams.get('code')?.length || 0,
      })

      // Run Nginx-specific checks for Azure AD callbacks
      const nginxRequestAnalysis = analyzeNginxRequest(req as unknown as Request)
      const nginxUrlAnalysis = analyzeNginxUrl(req.url)

      // If there's a 502 risk, send to Sentry immediately
      if (
        nginxRequestAnalysis?.has502Risk ||
        nginxUrlAnalysis?.has502Risk ||
        limitCheck?.anyLimitExceeded
      ) {
        log502ToSentry({
          nginxRequestAnalysis,
          nginxUrlAnalysis,
          limitCheck,
          url: req.url,
          urlLength: req.url.length,
        })
      }
    }

    if (isError) {
      console.error('[NEXTAUTH DEBUG] Auth error detected', {
        error: url.searchParams.get('error'),
        error_description: url.searchParams.get('error_description'),
      })

      logAuthToSentry(
        'NextAuth Error Detected',
        {
          error: url.searchParams.get('error'),
          error_description: url.searchParams.get('error_description'),
        },
        'error'
      )
    }
  } catch (error) {
    logServerError(error, 'NextAuth Handler Error')
  }

  // Continue with NextAuth handling
  return NextAuth(authOptions)(req, ...args)
}

export { authHandler as GET, authHandler as POST }
