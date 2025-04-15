import { Socket, io } from 'socket.io-client'

type SocketOptions = {
  user_id: string
  fullname: string
  namespace?: string
  apiToken: string
}

export const createSocketConnection = (options: SocketOptions): Socket => {
  const { namespace, apiToken } = options

  // Get server URL from environment variable with fallback
  const SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_IO_URL

  // Choose the appropriate URL based on namespace
  const socketUrl = namespace ? `${SERVER_URL}${namespace}` : SERVER_URL

  // Create the Socket.IO client with proper options - using only websocket transport
  const socket = io(socketUrl, {
    // Authentication data
    auth: {
      token: `Bearer ${apiToken}`,
    },
    // Force websocket transport only
    transports: ['websocket'],
    // Don't send cookies
    withCredentials: false,
  })

  // Add debug event listeners
  socket.on('connect', () => {
    console.log('Socket connected!', socket.id)
  })

  socket.on('connect_error', error => {
    console.error('Socket connection error:', error)
    console.error('Socket connection error details:', error.message)
  })

  socket.on('disconnect', reason => {
    console.log('Socket disconnected:', reason)
  })

  return socket
}

export const createMessengerConnection = (
  options: Omit<SocketOptions, 'namespace'>,
  channelId: string
): Socket => {
  console.log(`Creating messenger connection for channel: ${channelId}`)
  return createSocketConnection({
    ...options,
    namespace: `/messenger/${channelId}`,
  })
}

export default createSocketConnection
