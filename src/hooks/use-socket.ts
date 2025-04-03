import { useCallback, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'

import { createSocketConnection } from '@/lib/socket-io'

interface UseSocketOptions {
  user_id: string
  fullname: string
  namespace?: string
  autoConnect?: boolean
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
}: UseSocketOptions) => {
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
    if (!socketRef.current && user_id && fullname) {
      const socket = createSocketConnection({ user_id, fullname, namespace })

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
    socket: socketRef.current,
  }
}

export default useSocket
