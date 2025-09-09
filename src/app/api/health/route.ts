import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check critical environment variables
    const envCheck = {
      hasSocketUrl: !!process.env.NEXT_PUBLIC_SOCKET_IO_URL,
      hasApiUrl: !!process.env.NEXT_PUBLIC_API_BASE_URL,
      hasServerKey: !!process.env.NEXT_PUBLIC_SERVER_PUBLIC_KEY,
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT,
    }

    // Check if all required env vars are present
    const isHealthy = envCheck.hasSocketUrl && envCheck.hasApiUrl && envCheck.hasServerKey

    return Response.json(
      {
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        environment: envCheck,
        uptime: process.uptime(),
      },
      {
        status: isHealthy ? 200 : 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    )
  } catch (error) {
    console.error('Health check failed:', error)
    return Response.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    )
  }
}
