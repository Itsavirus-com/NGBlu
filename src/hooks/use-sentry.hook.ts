import { useCallback } from 'react'

import * as sentryUtils from '@/utils/sentry'

/**
 * Custom hook for Sentry functionality
 * @returns Object with Sentry utility functions
 */
export const useSentry = () => {
  const captureException = useCallback((error: Error, context?: Record<string, any>) => {
    sentryUtils.captureException(error, context)
  }, [])

  const captureMessage = useCallback(
    (
      message: string,
      level?: Parameters<typeof sentryUtils.captureMessage>[1],
      context?: Record<string, any>
    ) => {
      sentryUtils.captureMessage(message, level, context)
    },
    []
  )

  const withSpan = useCallback(
    async <T>(
      operation: Parameters<typeof sentryUtils.withSpan>[0],
      callback: () => Promise<T>
    ): Promise<T> => {
      return sentryUtils.withSpan(operation, callback)
    },
    []
  )

  const setUser = useCallback((user: Parameters<typeof sentryUtils.setUser>[0]) => {
    sentryUtils.setUser(user)
  }, [])

  const clearUser = useCallback(() => {
    sentryUtils.clearUser()
  }, [])

  const setTag = useCallback((key: string, value: string) => {
    sentryUtils.setTag(key, value)
  }, [])

  const setExtra = useCallback((key: string, value: any) => {
    sentryUtils.setExtra(key, value)
  }, [])

  return {
    captureException,
    captureMessage,
    withSpan,
    setUser,
    clearUser,
    setTag,
    setExtra,
  }
}
