import * as Sentry from '@sentry/nextjs'

/**
 * Captures an exception and sends it to Sentry
 * @param error The error to capture
 * @param context Additional context to add to the error
 */
export const captureException = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    contexts: context ? { additionalContext: context } : undefined,
  })
}

/**
 * Captures a message and sends it to Sentry
 * @param message The message to capture
 * @param level The level of the message
 * @param context Additional context to add to the message
 */
export const captureMessage = (
  message: string,
  level?: Sentry.SeverityLevel,
  context?: Record<string, any>
) => {
  Sentry.captureMessage(message, {
    level,
    contexts: context ? { additionalContext: context } : undefined,
  })
}

/**
 * Creates a span for performance monitoring
 * @param operation The operation to monitor
 * @param callback The callback to execute within the span
 * @returns The result of the callback
 */
export const withSpan = async <T>(
  operation: { name: string; op: string; data?: Record<string, any> },
  callback: () => Promise<T>
): Promise<T> => {
  return Sentry.startSpan(
    {
      name: operation.name,
      op: operation.op,
    },
    callback
  )
}

/**
 * Sets the user context for Sentry
 * @param user The user information to set
 */
export const setUser = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser(user)
}

/**
 * Clears the user context for Sentry
 */
export const clearUser = () => {
  Sentry.setUser(null)
}

/**
 * Sets a tag for Sentry
 * @param key The tag key
 * @param value The tag value
 */
export const setTag = (key: string, value: string) => {
  Sentry.setTag(key, value)
}

/**
 * Sets extra context for Sentry
 * @param key The context key
 * @param value The context value
 */
export const setExtra = (key: string, value: any) => {
  Sentry.setExtra(key, value)
}
