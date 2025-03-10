'use client'

import { useState } from 'react'

import { useSentry } from '@/hooks'

interface SentryErrorButtonProps {
  label?: string
  className?: string
}

/**
 * A button component that demonstrates how to use Sentry for error tracking
 */
export const SentryErrorButton = ({
  label = 'Test Sentry Error',
  className = '',
}: SentryErrorButtonProps) => {
  const { captureException, withSpan } = useSentry()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)

    try {
      // Example of using withSpan for performance monitoring
      await withSpan(
        {
          name: 'SentryErrorButton Click',
          op: 'ui.interaction',
        },
        async () => {
          // Simulate an API call
          await new Promise(resolve => setTimeout(resolve, 500))

          // Throw an error to test Sentry error tracking
          throw new Error('Sentry Test Error from SentryErrorButton')
        }
      )
    } catch (error) {
      // Capture the error with Sentry
      captureException(error as Error, {
        component: 'SentryErrorButton',
        action: 'handleClick',
      })

      // You can also show a toast or other UI feedback here
      console.error('Error captured by Sentry:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      className={`btn btn-danger ${className}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Sending...' : label}
    </button>
  )
}
