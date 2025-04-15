import React, { useEffect, useState } from 'react'

import useSocket from '@/hooks/use-socket'

interface SocketTestProps {
  userId: string
  fullname: string
  namespace?: string
  roomName: string
  apiToken?: string // Add apiToken prop
}

const SocketTest: React.FC<SocketTestProps> = ({
  userId,
  fullname,
  namespace,
  roomName,
  apiToken,
}) => {
  const [testMessage, setTestMessage] = useState('')
  // Pass apiToken to useSocket and get joinRoom function
  const { isConnected, messages, clients, sendMessage, connect, disconnect, socket, joinRoom } =
    useSocket({
      user_id: userId,
      fullname,
      namespace: namespace as string,
      autoConnect: true,
      apiToken, // Pass the token
    })

  const [broadcastMessages, setBroadcastMessages] = useState<any[]>([]) // Changed to any[] to handle diverse payloads

  console.log('broadcastMessages', broadcastMessages)

  useEffect(() => {
    // We now use the joinRoom function from the hook which handles authorization
    if (socket && isConnected && joinRoom) {
      console.log(`Socket connected: ${socket.id}. Attempting to join rooms...`)

      // Join the primary room (assuming it might be private)
      joinRoom(roomName, true)

      // Define the handler for broadcast messages
      const handleBroadcast = (data: any) => {
        console.log(`Received broadcast message (event: roles.synced):`, data)
        // Adjust how you process and store the message based on actual payload
        // Example: storing the whole data object
        setBroadcastMessages(prevMessages => [...prevMessages, data])
      }

      // Set up the listener
      socket.on('roles.synced', handleBroadcast)

      // Cleanup function
      return () => {
        console.log(`Cleaning up broadcast listener for room ${roomName}...`)
        socket.off('roles.synced', handleBroadcast)
      }
    }
    // Add joinRoom and isConnected to dependency array
  }, [socket, roomName, joinRoom, isConnected])

  const handleSendMessage = () => {
    if (testMessage.trim() && socket) {
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

      <div className="mb-3">
        <h4>Listening in Room: {roomName}</h4>
      </div>

      <div>
        <h4>Broadcast Messages (Room: {roomName})</h4>
        <ul className="list-group">
          {broadcastMessages.map((msg, index) => (
            <li key={index} className="list-group-item">
              {/* Display the message - adjust based on expected structure */}
              {typeof msg === 'string' ? msg : JSON.stringify(msg)}
            </li>
          ))}
          {broadcastMessages.length === 0 && (
            <li className="list-group-item">No broadcast messages received yet.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default SocketTest
