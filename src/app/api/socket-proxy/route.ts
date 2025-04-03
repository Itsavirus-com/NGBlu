import { type NextRequest } from 'next/server'

// Socket.IO server to proxy to from environment variable with fallback
const SOCKET_SERVER = process.env.NEXT_PUBLIC_SOCKET_IO_URL

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const path = requestUrl.pathname.replace('/api/socket-proxy', '')
  const searchParams = requestUrl.search

  // Build the URL for the actual Socket.IO server
  const targetUrl = `${SOCKET_SERVER}${path}${searchParams}`

  try {
    // Forward the request to the actual Socket.IO server
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        Origin: process.env.NEXT_PUBLIC_SOCKET_IO_URL || '',
      },
    })

    // Get the response data
    const data = await response.text()

    // Return a new response with CORS headers
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

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const path = requestUrl.pathname.replace('/api/socket-proxy', '')
  const searchParams = requestUrl.search

  // Build the URL for the actual Socket.IO server
  const targetUrl = `${SOCKET_SERVER}${path}${searchParams}`

  try {
    // Get the request body
    const body = await request.text()

    // Forward the request to the actual Socket.IO server
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: process.env.NEXT_PUBLIC_SOCKET_IO_URL || '',
      },
      body: body,
    })

    // Get the response data
    const data = await response.text()

    // Return a new response with CORS headers
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

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
