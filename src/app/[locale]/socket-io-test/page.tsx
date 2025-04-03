'use client'

import SocketTest from '@/components/socket-test'

export default function SocketTestPage() {
  // can replace these with actual user credentials or use state to input them
  const testUserId = 'test-user-123'
  const testFullname = 'Test User'

  return (
    <div className="container py-5">
      <h1 className="mb-4">Socket.IO Connection Test</h1>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="h5 mb-0">General Connection</h2>
            </div>
            <div className="card-body">
              <SocketTest
                userId={testUserId}
                fullname={testFullname}
                namespace="/messenger/account-management"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="h5 mb-0">Messenger Connection</h2>
            </div>
            <div className="card-body">
              <SocketTest
                userId={testUserId}
                fullname={testFullname}
                namespace="/messenger/account-management"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-light rounded">
        <h3>How to Test</h3>
        <ol>
          <li>Open browser console to see connection logs</li>
          <li>Click Connect button in one or both panels</li>
          <li>Check if the connection status changes to Connected</li>
          <li>Try sending a message and see if it appears in the messages list</li>
          <li>Open this page in another browser window to test multi-client functionality</li>
        </ol>
      </div>
    </div>
  )
}
