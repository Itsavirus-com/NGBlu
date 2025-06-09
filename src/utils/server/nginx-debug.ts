/**
 * Utilities for diagnosing Nginx-specific 502 Gateway issues
 */

import { logAuthErrorToSentry, logAuthToSentry } from '../sentry-logger'

// Common Nginx configuration limits that can cause 502 errors
const NGINX_COMMON_LIMITS = {
  client_max_body_size: 10485760, // 10MB
  client_header_buffer_size: 1024, // 1KB
  large_client_header_buffers_size: 8192, // 8KB
  large_client_header_buffers_number: 4,
  proxy_read_timeout: 60, // 60 seconds
  proxy_connect_timeout: 60, // 60 seconds
  proxy_send_timeout: 60, // 60 seconds
  send_timeout: 60, // 60 seconds
  keepalive_timeout: 65, // 65 seconds
}

/**
 * Analyzes a request to check for potential Nginx 502 issues
 *
 * @param req The HTTP request
 * @returns Analysis of potential Nginx issues
 */
export function analyzeNginxRequest(req: Request): Record<string, any> {
  try {
    const url = new URL(req.url)
    const contentLength = parseInt(req.headers.get('content-length') || '0')

    // Calculate header size
    let headerSize = 0
    const headerLengths: Record<string, number> = {}

    req.headers.forEach((value, key) => {
      const headerLength = key.length + value.length + 4 // +4 for ': ' and '\r\n'
      headerSize += headerLength
      headerLengths[key] = headerLength
    })

    // Get the cookie size
    const cookieSize = (req.headers.get('cookie') || '').length

    // Check for query string size
    const queryStringSize = url.search.length

    // Get request line size (METHOD + URL + HTTP/1.1)
    const requestLineSize = req.method.length + url.pathname.length + 10 // +10 for ' HTTP/1.1\r\n'

    // Analyze if we're exceeding common Nginx limits
    const issues = {
      bodyTooLarge: contentLength > NGINX_COMMON_LIMITS.client_max_body_size,
      headersTooLarge:
        headerSize >
        NGINX_COMMON_LIMITS.large_client_header_buffers_size *
          NGINX_COMMON_LIMITS.large_client_header_buffers_number,
      singleHeaderTooLarge: false,
      cookieTooLarge: cookieSize > NGINX_COMMON_LIMITS.large_client_header_buffers_size,
      queryStringTooLarge: queryStringSize > NGINX_COMMON_LIMITS.large_client_header_buffers_size,
      requestLineTooLarge: requestLineSize > NGINX_COMMON_LIMITS.large_client_header_buffers_size,
      largeHeaders: [] as string[],
    }

    // Check if any single header exceeds buffer size
    req.headers.forEach((value, key) => {
      const headerLength = key.length + value.length + 4
      if (headerLength > NGINX_COMMON_LIMITS.large_client_header_buffers_size) {
        issues.singleHeaderTooLarge = true
        issues.largeHeaders.push(key)
      }
    })

    // Create result object
    const result = {
      timestamp: new Date().toISOString(),
      requestInfo: {
        method: req.method,
        url: url.toString(),
        urlLength: url.toString().length,
        contentLength,
        headerSize,
        cookieSize,
        queryStringSize,
        requestLineSize,
        topHeaders: Object.entries(headerLengths)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([key, size]) => ({ key, size })),
      },
      nginxLimits: NGINX_COMMON_LIMITS,
      potentialIssues: issues,
      has502Risk:
        issues.bodyTooLarge ||
        issues.headersTooLarge ||
        issues.singleHeaderTooLarge ||
        issues.cookieTooLarge ||
        issues.queryStringTooLarge ||
        issues.requestLineTooLarge,
    }

    // Log if there's a risk
    if (result.has502Risk) {
      console.warn('[NGINX DEBUG] Request has potential for 502 Gateway error:', result)
    }

    logAuthToSentry('Nginx Request Analysis', result, result.has502Risk ? 'warning' : 'info')

    return result
  } catch (error) {
    console.error('[NGINX DEBUG] Error analyzing request:', error)
    logAuthErrorToSentry(error, 'Nginx Request Analysis Error', { url: req.url })
    return { error: String(error) }
  }
}

/**
 * Analyzes a URL to check if it might cause Nginx 502 issues
 *
 * @param url The URL to analyze
 * @returns Analysis of potential Nginx issues with the URL
 */
export function analyzeNginxUrl(url: string): Record<string, any> {
  try {
    const parsedUrl = new URL(url)

    // Check various components of the URL
    const urlLength = url.length
    const pathLength = parsedUrl.pathname.length
    const queryLength = parsedUrl.search.length
    const fragmentLength = parsedUrl.hash.length

    // Count and measure query parameters
    const queryParams: Record<string, any> = {}
    let largestParamName = ''
    let largestParamValue = ''
    let largestParamSize = 0

    parsedUrl.searchParams.forEach((value, key) => {
      queryParams[key] = {
        length: value.length,
        truncated:
          value.length > 20
            ? `${value.substring(0, 10)}...${value.substring(value.length - 10)}`
            : value,
      }

      const totalSize = key.length + value.length
      if (totalSize > largestParamSize) {
        largestParamName = key
        largestParamValue = value
        largestParamSize = totalSize
      }
    })

    // Potential issues
    const issues = {
      urlTooLong:
        urlLength >
        NGINX_COMMON_LIMITS.large_client_header_buffers_size *
          NGINX_COMMON_LIMITS.large_client_header_buffers_number,
      queryTooLong: queryLength > NGINX_COMMON_LIMITS.large_client_header_buffers_size,
      singleParamTooLarge: largestParamSize > NGINX_COMMON_LIMITS.large_client_header_buffers_size,
      largestParam: largestParamName
        ? {
            name: largestParamName,
            valueLength: largestParamValue.length,
            totalSize: largestParamSize,
          }
        : null,
    }

    const result = {
      url,
      urlLength,
      pathLength,
      queryLength,
      fragmentLength,
      queryParamCount: parsedUrl.searchParams.size,
      largestParam: issues.largestParam,
      potentialIssues: issues,
      has502Risk: issues.urlTooLong || issues.queryTooLong || issues.singleParamTooLarge,
    }

    // Log if there's a risk
    if (result.has502Risk) {
      console.warn('[NGINX DEBUG] URL has potential for 502 Gateway error:', result)
    }

    return result
  } catch (error) {
    console.error('[NGINX DEBUG] Error analyzing URL:', error)
    return { error: String(error) }
  }
}
