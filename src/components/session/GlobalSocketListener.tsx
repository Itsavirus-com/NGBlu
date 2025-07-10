'use client'

import { signOut, useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'

import useSocket from '@/hooks/use-socket'
import { useToast } from '@/hooks/use-toast.hook'

interface SessionInvalidatedPayload {
  id: string
  status: string
  icon?: string | null
  title: string
  message: string
  action?: string | null
  payload?: any
  sender?: string | null
  timestamp: string
  socket?: string | null
}

interface EventHandler {
  eventName: string
  handler: (data: any) => void
}

interface GlobalSocketListenerProps {
  /**
   * Custom event handlers to register
   */
  eventHandlers?: EventHandler[]
  /**
   * Room name pattern - defaults to 'private-users.{userId}'
   */
  roomNamePattern?: string
  /**
   * Whether to enable session invalidation handling - defaults to true
   */
  enableSessionInvalidation?: boolean
  /**
   * Custom namespace for the socket connection
   */
  namespace?: string
  /**
   * Whether to auto-connect - defaults to true
   */
  autoConnect?: boolean
}

export const GlobalSocketListener = ({
  eventHandlers = [],
  roomNamePattern = 'private-users.{userId}',
  enableSessionInvalidation = true,
  namespace = undefined,
  autoConnect = true,
}: GlobalSocketListenerProps) => {
  const { data: session, status } = useSession()
  const { showToast } = useToast()
  const logoutInProgressRef = useRef(false)

  // Simplified shouldConnect logic - explicitly boolean
  const shouldConnect = Boolean(
    status === 'authenticated' && autoConnect && session?.user?.id && session?.accessToken
  )

  // Use the existing useSocket hook
  const { socket, isConnected, joinRoom } = useSocket({
    user_id: session?.user?.id || 0,
    fullname: session?.user?.name || 'Unknown User',
    namespace,
    autoConnect: shouldConnect,
    apiToken: session?.accessToken,
  })

  useEffect(() => {
    if (socket && isConnected && joinRoom && shouldConnect) {
      // Join the room - replace {userId} placeholder with actual userId
      const roomName = roomNamePattern.replace('{userId}', String(session?.user?.id || ''))
      joinRoom(roomName, true)

      // Default session invalidation handler
      const handleSessionInvalidated = (data: SessionInvalidatedPayload) => {
        // Prevent multiple logout attempts
        if (logoutInProgressRef.current) {
          return
        }

        // Check if this is the session invalidation we're looking for
        if (data.title === 'Session Invalidated') {
          logoutInProgressRef.current = true

          // Show the custom message from the payload
          showToast({
            variant: 'warning',
            title: data.title,
            body: data.message,
          })

          // Logout the user after a short delay to allow the toast to be visible
          setTimeout(() => {
            signOut({ callbackUrl: '/auth/login' })
          }, 2000)
        }
      }

      // Register session invalidation handler if enabled
      if (enableSessionInvalidation) {
        socket.on('session.invalidated', handleSessionInvalidated)
      }

      // Register custom event handlers
      eventHandlers.forEach(({ eventName, handler }) => {
        socket.on(eventName, handler)
      })

      // Cleanup function
      return () => {
        // Clean up session invalidation handler
        if (enableSessionInvalidation) {
          socket.off('session.invalidated', handleSessionInvalidated)
        }

        // Clean up custom event handlers
        eventHandlers.forEach(({ eventName, handler }) => {
          socket.off(eventName, handler)
        })

        logoutInProgressRef.current = false
      }
    }
  }, [
    socket,
    isConnected,
    joinRoom,
    shouldConnect,
    session?.user?.id,
    showToast,
    eventHandlers,
    roomNamePattern,
    enableSessionInvalidation,
  ])

  // Reset logout flag if session status changes
  useEffect(() => {
    if (status === 'unauthenticated') {
      logoutInProgressRef.current = false
    }
  }, [status])

  // This component doesn't render anything
  return null
}

// Export a default version with session invalidation enabled for backward compatibility
export const SessionInvalidationListener = () => (
  <GlobalSocketListener enableSessionInvalidation={true} />
)
