/**
 * Utility functions for debugging authentication issues
 */

// Store debug logs in memory for retrieval
let authDebugLogs: any[] = []
const MAX_LOGS = 50

/**
 * Add a debug log entry
 */
export function logAuthDebug(context: string, data: any) {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    context,
    data,
  }

  console.log(`[AUTH DEBUG][${context}]`, data)

  // Add to in-memory log and maintain max size
  authDebugLogs.unshift(logEntry)
  if (authDebugLogs.length > MAX_LOGS) {
    authDebugLogs = authDebugLogs.slice(0, MAX_LOGS)
  }

  // Also save to sessionStorage for persistence across page loads
  try {
    const storedLogs = getAuthDebugLogs()
    storedLogs.unshift(logEntry)
    if (storedLogs.length > MAX_LOGS) {
      storedLogs.splice(MAX_LOGS)
    }
    sessionStorage.setItem('auth_debug_logs', JSON.stringify(storedLogs))
  } catch (e) {
    console.error('[AUTH DEBUG] Failed to save logs to sessionStorage', e)
  }
}

/**
 * Get all debug logs
 */
export function getAuthDebugLogs(): any[] {
  try {
    const storedLogs = sessionStorage.getItem('auth_debug_logs')
    if (storedLogs) {
      return JSON.parse(storedLogs)
    }
  } catch (e) {
    console.error('[AUTH DEBUG] Failed to retrieve logs from sessionStorage', e)
  }
  return []
}

/**
 * Clear all debug logs
 */
export function clearAuthDebugLogs() {
  authDebugLogs = []
  try {
    sessionStorage.removeItem('auth_debug_logs')
  } catch (e) {
    console.error('[AUTH DEBUG] Failed to clear logs from sessionStorage', e)
  }
}

/**
 * Analyze URL for authentication-related parameters
 */
export function analyzeAuthUrl(url: string) {
  try {
    const parsedUrl = new URL(url)
    const authParams = {
      url: parsedUrl.toString(),
      hostname: parsedUrl.hostname,
      pathname: parsedUrl.pathname,
      params: {} as Record<string, any>,
    }

    // Collect known auth-related parameters
    const authParamNames = [
      'code',
      'error',
      'error_description',
      'state',
      'session_state',
      'id_token',
      'access_token',
      'backend_error',
      'callbackUrl',
    ]

    for (const param of authParamNames) {
      const value = parsedUrl.searchParams.get(param)
      if (value) {
        // For tokens, just show length and truncated value
        if (param.includes('token') || param === 'code') {
          authParams.params[param] = {
            length: value.length,
            truncated: value.substring(0, 10) + '...',
          }
        } else {
          authParams.params[param] = value
        }
      }
    }

    // Log auth-related parameters
    logAuthDebug('URL Analysis', authParams)

    return authParams
  } catch (e) {
    logAuthDebug('URL Analysis Error', { url, error: e })
    return null
  }
}

/**
 * Create a debug log for fetch responses
 */
export function logFetchResponse(context: string, response: Response) {
  try {
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      // Don't log full token values
      if (key.includes('token')) {
        headers[key] = 'present'
      } else {
        headers[key] = value
      }
    })

    logAuthDebug(context, {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers,
      url: response.url,
    })
  } catch (e) {
    logAuthDebug(`${context} Error`, { error: e })
  }
}

// Patch the global fetch to capture auth-related requests
let originalFetch = globalThis.fetch
if (typeof window !== 'undefined') {
  globalThis.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : (input as Request).url

    // Only intercept auth-related requests
    const isAuthRequest =
      url.includes('/auth/') ||
      url.includes('/login') ||
      url.includes('azure') ||
      url.includes('sso')

    if (isAuthRequest) {
      logAuthDebug('Fetch Request', {
        url,
        method: init?.method || 'GET',
        headers: init?.headers || {},
        timestamp: new Date().toISOString(),
      })

      try {
        const response = await originalFetch(input, init)
        logFetchResponse('Fetch Response', response)
        return response.clone() // Return a clone to ensure the response can still be used
      } catch (error) {
        logAuthDebug('Fetch Error', {
          url,
          error: error instanceof Error ? error.message : String(error),
        })
        throw error
      }
    }

    return originalFetch(input, init)
  }
}
