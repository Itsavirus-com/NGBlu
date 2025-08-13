import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  // Build the URL for the actual Socket.IO server
  const targetUrl = `${process.env.NEXT_PUBLIC_SOCKET_BROADCASTING_AUTH_URL}/broadcasting/auth`

  try {
    // Get the request body
    const body = await request.text()

    // Get the Authorization header from the incoming request
    const authHeader = request.headers.get('Authorization')

    // Forward the request to the actual Socket.IO server
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: process.env.NEXT_PUBLIC_SOCKET_BROADCASTING_AUTH_URL || '',
        // Forward the Authorization header if it exists
        ...(authHeader && { Authorization: authHeader }),
      },
      body: body,
    })

    // Get the response data
    const data = await response.text()

    console.log('Response from socket broadcasting auth:', data)

    return new Response(data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    })
  } catch (error) {
    console.error('Socket proxy error:', error)
    return new Response(JSON.stringify({ error: 'Failed to proxy request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
