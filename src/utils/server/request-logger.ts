/**
 * Server-side request logging utilities for diagnosing auth issues
 */

import { IncomingMessage } from 'http'

import { logAuthErrorToSentry, logAuthToSentry } from '../sentry-logger'

// Log a detailed HTTP request
export function logHttpRequest(
  request: Request | IncomingMessage,
  context: string = 'HTTP Request'
) {
  try {
    // Handle both Request and IncomingMessage types
    let url: string
    let method: string
    let headers: Record<string, string> = {}

    if ('url' in request && typeof request.url === 'string') {
      // Request object
      url = request.url
      method = request.method || 'GET'
      if (request.headers) {
        const reqHeaders = request.headers as Headers
        reqHeaders.forEach((value, key) => {
          headers[key] = value
        })
      }
    } else {
      // IncomingMessage
      const incomingMsg = request as IncomingMessage
      url = incomingMsg.url || 'unknown'
      method = incomingMsg.method || 'GET'
      if (incomingMsg.headers) {
        Object.entries(incomingMsg.headers).forEach(([key, value]) => {
          headers[key] = Array.isArray(value) ? value.join(', ') : value || ''
        })
      }
    }

    const requestData = {
      method,
      url,
      urlLength: url.length,
      timestamp: new Date().toISOString(),
      headers: {
        'content-type': headers['content-type'] || 'not set',
        'content-length': headers['content-length'] || 'not set',
        'user-agent': headers['user-agent'] || 'not set',
        'accept-encoding': headers['accept-encoding'] || 'not set',
        host: headers['host'] || 'not set',
      },
    }

    console.log(`[${context}]`, requestData)
    logAuthToSentry(`${context} - Request Logged`, requestData)
  } catch (error) {
    console.error(`[${context}] Failed to log request:`, error)
    logAuthErrorToSentry(error, `${context} - Log Request Error`)
  }
}

// Log detailed error information
export function logServerError(error: any, context: string = 'Server Error') {
  try {
    const errorData = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown',
      timestamp: new Date().toISOString(),
    }

    console.error(`[${context}]`, errorData)
    logAuthErrorToSentry(error, context, errorData)
  } catch (logError) {
    console.error(`[${context}] Failed to log error:`, logError)
  }
}

// Check if a request exceeds common gateway limits
export function checkRequestLimits(request: Request | IncomingMessage) {
  try {
    let url: string
    let contentLength = 0

    if ('url' in request && typeof request.url === 'string') {
      url = request.url
      const clHeader = (request.headers as Headers)?.get('content-length')
      contentLength = clHeader ? parseInt(clHeader, 10) : 0
    } else {
      const incomingMsg = request as IncomingMessage
      url = incomingMsg.url || ''
      const clHeader = incomingMsg.headers['content-length']
      contentLength = clHeader ? parseInt(clHeader as string, 10) : 0
    }

    const limits = {
      urlLength: url.length,
      urlLimit: 8192, // Common Nginx limit
      contentLength,
      contentLengthLimit: 10485760, // 10MB
      urlExceeded: url.length > 8192,
      contentExceeded: contentLength > 10485760,
      anyLimitExceeded: url.length > 8192 || contentLength > 10485760,
    }

    console.log('[REQUEST LIMITS]', limits)
    logAuthToSentry('Request Limits Check', limits, limits.anyLimitExceeded ? 'warning' : 'info')

    return limits
  } catch (error) {
    console.error('[REQUEST LIMITS] Error checking limits:', error)
    logAuthErrorToSentry(error, 'Request Limits Check Error')
    return null
  }
}

// Parse URL parameters and analyze them for debugging
export function analyzeUrlParameters(url: string) {
  try {
    const urlObj = new URL(url)
    const params = Array.from(urlObj.searchParams.entries())

    const analysis = {
      totalParams: params.length,
      paramSizes: params.map(([key, value]) => ({
        key,
        keyLength: key.length,
        valueLength: value.length,
        total: key.length + value.length,
      })),
      totalParameterBytes: params.reduce((sum, [key, value]) => sum + key.length + value.length, 0),
      largestParam: params.reduce(
        (largest, [key, value]) => {
          const size = key.length + value.length
          return size > largest.size ? { key, size } : largest
        },
        { key: '', size: 0 }
      ),
    }

    console.log('[URL PARAMETERS]', analysis)
    logAuthToSentry('URL Parameters Analysis', analysis)

    return analysis
  } catch (error) {
    console.error('[URL PARAMETERS] Error analyzing URL parameters:', error)
    logAuthErrorToSentry(error, 'URL Parameters Analysis Error', { url })
    return null
  }
}
