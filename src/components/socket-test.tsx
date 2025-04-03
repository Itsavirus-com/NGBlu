import React, { useEffect, useState } from 'react'

import useSocket from '@/hooks/use-socket'
import { createSocketConnection } from '@/lib/socket-io'

interface SocketTestProps {
  userId: string
  fullname: string
  namespace?: string
}

const SocketTest: React.FC<SocketTestProps> = ({ userId, fullname, namespace }) => {
  const [testMessage, setTestMessage] = useState('')
  const { isConnected, messages, clients, sendMessage, connect, disconnect, socket } = useSocket({
    user_id: userId,
    fullname,
    namespace: namespace as string,
    autoConnect: true,
  })

  const [broadcastMessages, setBroadcastMessages] = useState<string[]>([])

  useEffect(() => {
    // 1. Create the socket connection
    const socket = createSocketConnection({
      user_id: userId,
      fullname,
      // Optional: specify a namespace if needed for the broadcast
      namespace: namespace,
    })

    // 2. Listen for the broadcast event
    socket.on('microsoft-role-sync-started', (data: any) => {
      // Replace 'microsoft-role-sync-started' with the actual event name from your server
      console.log('Received broadcast message:', data)
      // Example: Add the message to component state
      // Adjust based on the actual structure of 'data'
      if (typeof data === 'string') {
        setBroadcastMessages(prevMessages => [...prevMessages, data])
      } else if (data && typeof data.message === 'string') {
        setBroadcastMessages(prevMessages => [...prevMessages, data.message])
      }
    })

    // 3. Important: Clean up the listener and disconnect when the component unmounts
    return () => {
      console.log('Cleaning up socket listener and disconnecting...')
      socket.off('microsoft-role-sync-started') // Remove the specific listener
      socket.disconnect()
    }
  }, []) // Empty dependency array ensures this runs once on mount and cleans up on unmount

  const handleSendMessage = () => {
    if (testMessage.trim()) {
      sendMessage({ text: testMessage })
      setTestMessage('')
    }
  }

  return (
    <div className="border p-4 rounded">
      <h3>Socket.IO Test Component</h3>

      <div className="mb-3">
        <div className="mb-2">
          <strong>Connection Status:</strong>{' '}
          <span className={`badge ${isConnected ? 'bg-success' : 'bg-danger'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          {socket && <div>Socket ID: {socket.id}</div>}
        </div>

        <button className="btn btn-primary me-2" onClick={connect} disabled={isConnected}>
          Connect
        </button>
        <button className="btn btn-danger" onClick={disconnect} disabled={!isConnected}>
          Disconnect
        </button>
      </div>

      <div className="mb-3">
        <h4>Send Test Message</h4>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message"
            value={testMessage}
            onChange={e => setTestMessage(e.target.value)}
            disabled={!isConnected}
          />
          <button
            className="btn btn-primary"
            onClick={handleSendMessage}
            disabled={!isConnected || !testMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>

      <div className="mb-3">
        <h4>Connected Clients ({clients.length})</h4>
        <ul className="list-group">
          {clients.map(client => (
            <li key={client.socket_id} className="list-group-item">
              {client.fullname} ({client.user_id}) - {client.socket_id}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Messages ({messages.length})</h4>
        <ul className="list-group">
          {messages.map((msg, index) => (
            <li key={index} className="list-group-item">
              <strong>{msg.sender}:</strong> {JSON.stringify(msg.data)}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Broadcast Messages:</h2>
        <ul>
          {broadcastMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SocketTest
