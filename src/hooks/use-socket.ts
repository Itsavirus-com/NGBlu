import { useCallback, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'

import { createSocketConnection } from '@/lib/socket-io'

// Function to authorize channel access against Laravel backend via Next.js proxy
const authorizeChannel = async (
  channelName: string,
  apiToken: string | undefined
): Promise<boolean> => {
  // Token is required to send to the proxy, which forwards it
  if (!apiToken) {
    console.error(
      `Authorization via proxy failed for ${channelName}: No API token provided to send.`
    )
    return false
  }

  // Call the Next.js proxy route
  const authEndpoint = '/api/broadcast-auth'

  console.log(`Attempting authorization for ${channelName} via proxy ${authEndpoint}`)

  try {
    const response = await fetch(authEndpoint, {
      method: 'POST',
      headers: {
        // Send Authorization header TO the proxy
        Authorization: `Bearer ${apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ channel_name: channelName }),
    })

    if (!response.ok) {
      // Log detailed error for non-2xx responses from the proxy
      const errorBody = await response.text()
      console.error(
        `Authorization via proxy failed for ${channelName}: ${response.status} - ${response.statusText}. Body: ${errorBody}`
      )
      return false
    }

    // Proxy returned 2xx, authorization successful
    console.log(`Authorization via proxy successful for ${channelName}`)
    return true
  } catch (error) {
    console.error(`Error during authorization request via proxy for channel ${channelName}:`, error)
    return false
  }
}

interface UseSocketOptions {
  user_id: string
  fullname: string
  namespace?: string
  autoConnect?: boolean
  apiToken?: string // Added API token for authorization
}

interface SocketMessage {
  data: any
  sender: string
}

interface ClientInfo {
  fullname: string
  user_id: string
  socket_id: string
}

export const useSocket = ({
  user_id,
  fullname,
  namespace,
  autoConnect = true,
  apiToken, // Destructure apiToken
}: UseSocketOptions) => {
  console.log('apiToken masukk', apiToken)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<SocketMessage[]>([])
  const [clients, setClients] = useState<ClientInfo[]>([])
  const socketRef = useRef<Socket | null>(null)

  // Initialize socket connection
  useEffect(() => {
    if (!user_id || !fullname || !autoConnect) return

    const socket = createSocketConnection({
      user_id,
      fullname,
      namespace: namespace,
      apiToken: apiToken as string,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('message', (msg: SocketMessage) => {
      setMessages(prev => [...prev, msg])
    })

    socket.on('client_connected', (client: ClientInfo) => {
      setClients(prev => [...prev.filter(c => c.socket_id !== client.socket_id), client])
    })

    socket.on('client_disconnect', (client: ClientInfo) => {
      setClients(prev => prev.filter(c => c.socket_id !== client.socket_id))
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [user_id, fullname, namespace, autoConnect])

  // Function to join a room after authorization
  const joinRoom = useCallback(
    async (roomName: string, isPrivate: boolean = true) => {
      if (!socketRef.current || !isConnected) {
        console.warn('Socket not connected, cannot join room:', roomName)
        return
      }

      let canJoin = true
      // Only authorize if marked as private
      if (isPrivate) {
        console.log(`Authorizing channel: ${roomName}...`)
        canJoin = await authorizeChannel(roomName, apiToken)
      }

      if (canJoin) {
        console.log(`Joining Socket.IO room: ${roomName}`)
        socketRef.current.emit('join', roomName)
        // Consider adding state to track joined rooms if needed
      } else {
        console.error(`Not authorized or failed to join room: ${roomName}`)
        // Handle unauthorized access (e.g., show a message to the user)
      }
    },
    [isConnected, apiToken]
  ) // Add apiToken dependency

  // Send message
  const sendMessage = useCallback(
    (message: any) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit('message', message)
      }
    },
    [isConnected]
  )

  // Kick a user
  const kickUser = useCallback(
    (socketId: string) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit('kick', { socket: socketId })
      }
    },
    [isConnected]
  )

  // Manual connect/disconnect methods
  const connect = useCallback(() => {
    if (!socketRef.current && user_id && fullname && apiToken) {
      const socket = createSocketConnection({ user_id, fullname, namespace, apiToken })

      socketRef.current = socket
    } else if (socketRef.current) {
      socketRef.current.connect()
    }
  }, [user_id, fullname, namespace])

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect()
    }
  }, [])

  return {
    isConnected,
    messages,
    clients,
    sendMessage,
    kickUser,
    connect,
    disconnect,
    joinRoom, // Expose joinRoom
    socket: socketRef.current,
  }
}

export default useSocket
