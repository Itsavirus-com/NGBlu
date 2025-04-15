'use client'

import { useSession } from 'next-auth/react' // Import useSession

import SocketTest from '@/components/socket-test'
// import { useUserProfile } from '@/services/swr/use-user-profile' // Keep commented if not using

export default function SocketTestPage() {
  // Use the useSession hook to get session data
  const { data: session, status } = useSession()

  // Extract the access token
  // Note: Adjust 'accessToken' if your session object uses a different key
  const apiToken = session?.accessToken as string | undefined
  console.log('apiToken', apiToken)
  // Keep using test credentials for now, or fetch real ones if needed
  const testUserId = 'test-user-123'
  const testFullname = 'Test User'

  // Handle loading state while session is being fetched
  if (status === 'loading') {
    return <div>Loading session...</div>
  }

  // Optional: Handle unauthenticated state
  // if (status === 'unauthenticated' || !apiToken) {
  //   return <div>Not authenticated or token missing.</div>;
  // }

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
                roomName="private-admin" // Ensure this is the correct room name
                userId={testUserId}
                fullname={testFullname}
                apiToken={apiToken} // Pass the fetched token
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
                roomName="private-admin" // Ensure this is the correct room name
                userId={testUserId}
                fullname={testFullname}
                apiToken={apiToken} // Pass the fetched token
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
