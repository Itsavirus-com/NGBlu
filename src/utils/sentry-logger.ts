import * as Sentry from '@sentry/nextjs'

/**
 * Send auth debug information to Sentry for monitoring
 */

export function logAuthToSentry(
  context: string,
  data: any,
  level: 'info' | 'warning' | 'error' = 'info'
) {
  try {
    // Add breadcrumb for tracking auth flow
    Sentry.addBreadcrumb({
      category: 'auth.debug',
      message: context,
      level: level,
      data: {
        ...data,
        timestamp: new Date().toISOString(),
      },
    })

    // For critical auth errors, also capture as an event
    if (level === 'error' || context.includes('502') || context.includes('Gateway')) {
      Sentry.captureMessage(`Auth Debug: ${context}`, {
        level: level,
        tags: {
          component: 'authentication',
          debug: true,
          context: context,
        },
        extra: data,
      })
    }
  } catch (error) {
    console.error('Failed to log to Sentry:', error)
  }
}

export function logAuthErrorToSentry(error: any, context: string, additionalData?: any) {
  try {
    Sentry.captureException(error, {
      tags: {
        component: 'authentication',
        context: context,
      },
      extra: {
        ...additionalData,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (e) {
    console.error('Failed to log error to Sentry:', e)
  }
}

export function log502ToSentry(requestData: any, browserData?: any) {
  try {
    Sentry.captureMessage('502 Gateway Error in Auth Flow', {
      level: 'error',
      tags: {
        component: 'authentication',
        error_type: '502_gateway',
        critical: true,
      },
      extra: {
        request: requestData,
        browser: browserData,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Failed to log 502 error to Sentry:', error)
  }
}
