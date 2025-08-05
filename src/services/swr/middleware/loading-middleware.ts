import { Middleware } from 'swr'

import { loadingModel } from '@/stores/loading-model'
import { showStackedToast } from '@/stores/toast-store.actions'
import { getCurrentLocale, getTranslation } from '@/utils/translation'

// Debounce mechanism for error toasts
let errorToastTimeout: NodeJS.Timeout | null = null
let pendingErrorToast: any = null
let errorCount = 0

/**
 * SWR middleware that automatically shows loading indicators
 * @param prefix - Optional prefix for loading IDs
 * @returns SWR middleware
 */
export const loadingMiddleware = (prefix = 'swr'): Middleware => {
  return useSWRNext => {
    return (key, fetcher, config) => {
      // Create a unique loading ID based on the SWR key
      let loadingId: string

      if (typeof key === 'string') {
        loadingId = `${prefix}:${key}`
      } else if (Array.isArray(key)) {
        // Handle array keys
        loadingId = `${prefix}:${key.join('/')}`
      } else if (key !== null && typeof key === 'object') {
        // Handle object keys (like in FetcherParams)
        const keyObj = key as any
        loadingId = `${prefix}:${keyObj.path || ''}${keyObj.id ? `/${keyObj.id}` : ''}`
      } else {
        // Fallback
        loadingId = `${prefix}:${Date.now()}`
      }

      // Use translation key for consistent message
      const loadingMessage = 'common.retrievingData'

      // Wrap the fetcher to track loading state
      const wrappedFetcher = fetcher
        ? async (...args: any[]) => {
            // Only start loading if not already loading for this ID
            if (!(loadingModel as any).isLoadingById(loadingId)) {
              ;(loadingModel as any).startLoading(loadingId, loadingMessage)
            }

            try {
              return await fetcher(...args)
            } catch (error) {
              // Stop loading immediately on error
              ;(loadingModel as any).stopLoading(loadingId)

              // Check if this is a GET request by examining the key or fetcher
              const isGetRequest = checkIfGetRequest(key, fetcher)

              // Only apply deduplication and error handling for GET requests
              if (isGetRequest) {
                // Increment error count
                errorCount++

                // Get current locale and translated error messages
                const currentLocale = getCurrentLocale()
                const errorTitle = getTranslation('common.error.title', currentLocale)
                const baseErrorBody = getTranslation('common.error.fetchData', currentLocale)

                // Create error message based on count
                const errorBody =
                  errorCount > 1
                    ? `${baseErrorBody} (Multiple API failures detected)`
                    : baseErrorBody

                // Debounce error toasts to prevent multiple identical toasts
                const errorToast = {
                  variant: 'danger' as const,
                  title: errorTitle,
                  body: errorBody,
                  visible: true,
                }

                // Clear any existing timeout
                if (errorToastTimeout) {
                  clearTimeout(errorToastTimeout)
                }

                // Set the pending error toast
                pendingErrorToast = errorToast

                // Show error toast after a short delay to group multiple failures
                errorToastTimeout = setTimeout(() => {
                  if (pendingErrorToast) {
                    showStackedToast(pendingErrorToast)
                    pendingErrorToast = null
                    // Reset error count after showing toast
                    errorCount = 0
                  }
                }, 150) // Slightly longer delay to better group simultaneous failures
              }

              throw error
            } finally {
              // Only stop loading if it was started by this call
              if ((loadingModel as any).isLoadingById(loadingId)) {
                ;(loadingModel as any).stopLoading(loadingId)
              }
            }
          }
        : fetcher

      // Call the original hook
      return useSWRNext(key, wrappedFetcher, config)
    }
  }
}

/**
 * Helper function to check if a request is a GET request
 */
function checkIfGetRequest(key: any, fetcher: any): boolean {
  // Check if the key contains method information
  if (typeof key === 'object' && key !== null) {
    const keyObj = key as any
    if (keyObj.method && keyObj.method.toUpperCase() !== 'GET') {
      return false
    }
  }

  // Check if the fetcher is a function and examine its source
  if (typeof fetcher === 'function') {
    const fetcherString = fetcher.toString().toLowerCase()
    // Look for common patterns that indicate non-GET requests
    if (
      fetcherString.includes('post') ||
      fetcherString.includes('put') ||
      fetcherString.includes('patch') ||
      fetcherString.includes('delete')
    ) {
      return false
    }
  }

  // Default to true for GET requests (most SWR usage is for GET)
  return true
}
