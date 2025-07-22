import { NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'

import { parseAccessTokenExpiresAt } from '@/utils/dateTime'
import { logAuthErrorToSentry, logAuthToSentry } from '@/utils/sentry-logger'

// Global variable to store backend error (temporary solution for NextAuth limitation)
let lastBackendError: string | null = null

// Define custom user type for credentials provider
interface CustomUser {
  id: string
  accessToken: string
  accessTokenExpiresAt: string
  clientPrivateKey: string
  userData?: UserData
}

// Define user data interface based on BE login manual response
interface UserData {
  id: number
  firstname: string
  lastname: string
  email: string
  blockedAt: string | null
  accountActivatedAt: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  entraObjectId: string | null
  invitationSentAt: string | null
  lastLogin: string
  personId: number
  roles: Role[]
}

interface Role {
  id: number
  name: string
  guardName: string
  createdAt: string
  updatedAt: string
}

// Extend the Session interface
declare module 'next-auth' {
  interface Session {
    accessToken: string
    accessTokenExpiresAt: string
    sharedSecret: string
    provider: string
    clientPrivateKey: string
    user: {
      id: number
      name: string
      email: string
      roles: Role[]
      personId: number
      lastLogin: string
    }
  }
}

// Extend the JWT interface
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    accessTokenExpiresAt: string
    sharedSecret: string
    provider: string
    clientPrivateKey: string
    error?: string
    userData?: UserData
  }
}

async function getAccessToken(idToken: string) {
  try {
    console.log('[AUTH DEBUG] Starting token exchange', {
      tokenLength: idToken?.length || 0,
      timestamp: new Date().toISOString(),
    })

    logAuthToSentry('Token Exchange Started', {
      tokenLength: idToken?.length || 0,
    })

    const timestamp = new Date().toISOString()
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login/sso?id_token=${idToken}`

    console.log('[AUTH DEBUG] Request URL details', {
      urlLength: url.length,
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      truncatedUrl: url.substring(0, 100) + '...',
    })

    logAuthToSentry('API Request Details', {
      urlLength: url.length,
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    })

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Timestamp': timestamp,
      },
    })

    console.log('[AUTH DEBUG] Response received', {
      status: res.status,
      statusText: res.statusText,
      ok: res.ok,
      hasAccessToken: !!res.headers.get('access-token'),
      hasClientPrivateKey: !!res.headers.get('client-private-key'),
    })

    logAuthToSentry(
      'API Response Received',
      {
        status: res.status,
        statusText: res.statusText,
        ok: res.ok,
        hasAccessToken: !!res.headers.get('access-token'),
        hasClientPrivateKey: !!res.headers.get('client-private-key'),
      },
      res.ok ? 'info' : 'error'
    )

    if (!res.ok) {
      // Enhanced error extraction from backend response
      let errorMessage = `HTTP ${res.status}`

      try {
        const errorData = await res.json()
        console.log('[AUTH DEBUG] Error response body:', errorData)
        logAuthToSentry('Error Response Body', errorData, 'error')

        errorMessage =
          errorData.message ||
          errorData.error ||
          errorData.error_description ||
          errorData.details ||
          errorMessage
      } catch (error) {
        console.log('[AUTH DEBUG] Failed to parse error response:', error)
        logAuthErrorToSentry(error, 'Parse Error Response')
        // If we can't parse the error response, use status text
        errorMessage = res.statusText || errorMessage
      }

      console.log('[AUTH DEBUG] Token exchange failed', { errorMessage })
      logAuthToSentry('Token Exchange Failed', { errorMessage, status: res.status }, 'error')

      // Use a consistent error format for backend errors
      return {
        error: errorMessage,
        status: res.status,
        backendError: true,
      }
    }

    const clientPrivateKey = res.headers.get('client-private-key')
    const accessTokenExpiresAt = res.headers.get('access-token-expires-at')

    // Check if the key is empty
    if (!clientPrivateKey) {
      console.error('[AUTH DEBUG] Missing client-private-key in API response')
      logAuthToSentry('Missing Client Private Key', {}, 'error')
      return { error: 'Missing client-private-key in API response' }
    }

    // Parse the expiration timestamp to ensure it's valid
    let expiresAtTimestamp = parseAccessTokenExpiresAt(accessTokenExpiresAt)
    console.log('[AUTH DEBUG] Parsed token expiration', {
      originalValue: accessTokenExpiresAt,
      parsed: expiresAtTimestamp,
    })

    logAuthToSentry('Token Expiration Parsed', {
      originalValue: accessTokenExpiresAt,
      parsed: expiresAtTimestamp,
    })

    const userData = await res.json()
    console.log('[AUTH DEBUG] User data received', {
      hasData: !!userData?.data,
      userId: userData?.data?.id,
    })

    logAuthToSentry('User Data Received', {
      hasData: !!userData?.data,
      userId: userData?.data?.id,
    })

    return {
      accessToken: res.headers.get('access-token') || '',
      accessTokenExpiresAt: expiresAtTimestamp,
      clientPrivateKey: clientPrivateKey || '',
      userData: userData.data,
    }
  } catch (error) {
    console.error('[AUTH DEBUG] Exception in getAccessToken', error)
    logAuthErrorToSentry(error, 'GetAccessToken Exception')
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return {
      error: `Network error: ${errorMessage}`,
      networkError: true,
    }
  }
}

// Helper function to check if token is expired
function isTokenExpired(expiresAt: string): boolean {
  if (!expiresAt) return false

  try {
    const expirationTime = new Date(expiresAt)
    const currentTime = new Date()

    // buffer time to account for clock skew
    const bufferTime = 5 * 60 * 1000 // 5 minutes in milliseconds
    const effectiveExpirationTime = new Date(expirationTime.getTime() - bufferTime)

    return currentTime >= effectiveExpirationTime
  } catch (error) {
    console.error('Error checking token expiration:', error)
    logAuthErrorToSentry(error, 'Token Expiration Check Error')
    return false
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    AzureADProvider({
      id: 'azure-ad',
      clientId: process.env.AZURE_CLIENT_ID as string,
      clientSecret: process.env.AZURE_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_TENANT_ID,
      authorization: {
        params: {
          prompt: 'select_account',
          scope: 'openid profile email',
        },
      },
    }),
    CredentialsProvider({
      id: 'manual-login',
      name: 'Manual Login',
      credentials: {
        accessToken: { label: 'Access Token', type: 'text' },
        accessTokenExpiresAt: { label: 'Access Token Expires At', type: 'text' },
        clientPrivateKey: { label: 'Client Private Key', type: 'text' },
        userData: { label: 'User Data', type: 'text' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.accessToken || !credentials?.clientPrivateKey) {
            console.error('Missing credentials:', {
              hasAccessToken: !!credentials?.accessToken,
              hasClientPrivateKey: !!credentials?.clientPrivateKey,
            })
            logAuthToSentry(
              'Missing Manual Login Credentials',
              {
                hasAccessToken: !!credentials?.accessToken,
                hasClientPrivateKey: !!credentials?.clientPrivateKey,
              },
              'error'
            )
            return null
          }

          // Parse userData if it exists
          let userData = {}
          if (credentials.userData) {
            try {
              userData = JSON.parse(credentials.userData)
            } catch (e) {
              console.error('Failed to parse userData:', e)
              logAuthErrorToSentry(e, 'Parse Manual Login UserData')
            }
          }

          // Parse and convert accessTokenExpiresAt to ISO format
          let parsedExpiresAt = parseAccessTokenExpiresAt(credentials.accessTokenExpiresAt)

          // Return user object with the tokens and user data
          return {
            id: '1', // Required by NextAuth
            accessToken: credentials.accessToken,
            accessTokenExpiresAt: parsedExpiresAt,
            clientPrivateKey: credentials.clientPrivateKey,
            userData,
          } as CustomUser
        } catch (error) {
          console.error('Error in authorize callback:', error)
          logAuthErrorToSentry(error, 'Manual Login Authorize Error')
          return null
        }
      },
    }),
    CredentialsProvider({
      id: 'passkey-login',
      name: 'Passkey Login',
      credentials: {
        accessToken: { label: 'Access Token', type: 'text' },
        accessTokenExpiresAt: { label: 'Access Token Expires At', type: 'text' },
        clientPrivateKey: { label: 'Client Private Key', type: 'text' },
        userData: { label: 'User Data', type: 'text' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.accessToken || !credentials?.clientPrivateKey) {
            console.error('Missing passkey credentials:', {
              hasAccessToken: !!credentials?.accessToken,
              hasClientPrivateKey: !!credentials?.clientPrivateKey,
            })
            logAuthToSentry(
              'Missing Passkey Credentials',
              {
                hasAccessToken: !!credentials?.accessToken,
                hasClientPrivateKey: !!credentials?.clientPrivateKey,
              },
              'error'
            )
            return null
          }

          // Parse userData if it exists
          let userData = {}
          if (credentials.userData) {
            try {
              userData = JSON.parse(credentials.userData)
            } catch (e) {
              console.error('Failed to parse passkey userData:', e)
              logAuthErrorToSentry(e, 'Parse Passkey UserData')
            }
          }

          // Parse and convert accessTokenExpiresAt to ISO format
          let parsedExpiresAt = parseAccessTokenExpiresAt(credentials.accessTokenExpiresAt)

          // Return user object with the tokens and user data
          return {
            id: '1', // Required by NextAuth
            accessToken: credentials.accessToken,
            accessTokenExpiresAt: parsedExpiresAt,
            clientPrivateKey: credentials.clientPrivateKey,
            userData,
          } as CustomUser
        } catch (error) {
          console.error('Error in passkey authorize callback:', error)
          logAuthErrorToSentry(error, 'Passkey Authorize Error')
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async redirect({ baseUrl, url }) {
      console.log('[AUTH DEBUG] Processing redirect', {
        baseUrl,
        url,
        hasBackendError: !!lastBackendError,
      })

      logAuthToSentry('Processing Redirect', {
        baseUrl,
        url,
        hasBackendError: !!lastBackendError,
      })

      // If we have a backend error, always redirect to login with it
      if (lastBackendError) {
        console.log('[AUTH DEBUG] Redirecting with backend error', {
          error: lastBackendError,
        })

        logAuthToSentry(
          'Redirecting with Backend Error',
          {
            error: lastBackendError,
          },
          'error'
        )

        const loginUrl = new URL('/auth/login', baseUrl)

        // Parse the original URL to preserve callbackUrl if available
        try {
          const parsedUrl = new URL(url.startsWith('http') ? url : `${baseUrl}${url}`)
          const callbackUrl = parsedUrl.searchParams.get('callbackUrl')
          if (callbackUrl) {
            loginUrl.searchParams.set('callbackUrl', callbackUrl)
            console.log('[AUTH DEBUG] Preserving callbackUrl', { callbackUrl })
            logAuthToSentry('Preserving CallbackUrl', { callbackUrl })
          }
        } catch (e) {
          console.error('[AUTH DEBUG] Failed to parse URL', { url, error: e })
          logAuthErrorToSentry(e, 'Parse Redirect URL Error', { url })
        }

        // Add the error information - only encode once
        loginUrl.searchParams.set('error', 'BackendApiError')
        loginUrl.searchParams.set('backend_error', encodeURIComponent(lastBackendError))

        console.log('[AUTH DEBUG] Final redirect URL with error', {
          url: loginUrl.toString(),
          error: 'BackendApiError',
          backend_error: lastBackendError,
        })

        logAuthToSentry(
          'Final Redirect URL with Error',
          {
            url: loginUrl.toString(),
            error: 'BackendApiError',
            backend_error: lastBackendError,
          },
          'error'
        )

        // Clear the backend error if we're already on the login page
        // This prevents infinite redirect loops
        if (url.includes('/auth/login')) {
          console.log('[AUTH DEBUG] Clearing backend error to prevent redirect loop')
          logAuthToSentry('Clearing Backend Error', {}, 'warning')
          lastBackendError = null
        }

        return loginUrl.toString()
      }

      // Check if this is an error redirect from auth/error
      if (url.includes('/api/auth/error')) {
        console.log('[AUTH DEBUG] Handling redirect from /api/auth/error')
        logAuthToSentry('Handling Error Redirect', { url })

        const parsedUrl = new URL(url, baseUrl)
        const error = parsedUrl.searchParams.get('error')

        if (error) {
          console.log('[AUTH DEBUG] Error in redirect', { error })
          logAuthToSentry('Error in Redirect', { error }, 'error')
        }

        // Build login URL with error
        const loginUrl = new URL('/auth/login', baseUrl)

        // Add callbackUrl if available
        const callbackUrl = parsedUrl.searchParams.get('callbackUrl')
        if (callbackUrl) {
          loginUrl.searchParams.set('callbackUrl', callbackUrl)
          console.log('[AUTH DEBUG] Preserving callbackUrl in error redirect', { callbackUrl })
          logAuthToSentry('Preserving CallbackUrl in Error Redirect', { callbackUrl })
        }

        if (error) {
          loginUrl.searchParams.set('error', error)
        }

        console.log('[AUTH DEBUG] Redirecting to login with error', {
          url: loginUrl.toString(),
          error,
        })

        logAuthToSentry(
          'Redirecting to Login with Error',
          {
            url: loginUrl.toString(),
            error,
          },
          'error'
        )

        return loginUrl.toString()
      }

      // If URL contains callbackUrl parameter, use that
      if (url.includes('callbackUrl=')) {
        const callbackUrl = new URL(url, baseUrl).searchParams.get('callbackUrl')
        if (callbackUrl) {
          console.log('[AUTH DEBUG] Using callbackUrl from URL params', { callbackUrl })
          logAuthToSentry('Using CallbackUrl from URL Params', { callbackUrl })
          return callbackUrl
        }
      }

      // Default redirect to dashboard
      console.log('[AUTH DEBUG] Default redirect to dashboard')
      logAuthToSentry('Default Redirect to Dashboard', {})
      return `${baseUrl}/dashboard`
    },
    async jwt({ token, account, user }) {
      // Check if existing token is expired before processing
      if (token.accessTokenExpiresAt && isTokenExpired(token.accessTokenExpiresAt)) {
        console.log('[AUTH DEBUG] Token expired', { expiresAt: token.accessTokenExpiresAt })
        logAuthToSentry('Token Expired', { expiresAt: token.accessTokenExpiresAt }, 'warning')
        // Clear the token and throw error to force sign out
        token.error = 'token_expired'
        return token
      }

      // This block handles initial sign-in via Azure AD
      if (account && account.provider === 'azure-ad') {
        console.log('[AUTH DEBUG] Processing Azure AD sign-in', {
          idTokenLength: account.id_token ? (account.id_token as string).length : 0,
          provider: account.provider,
          timestamp: new Date().toISOString(),
        })

        logAuthToSentry('Azure AD Sign-in Started', {
          idTokenLength: account.id_token ? (account.id_token as string).length : 0,
          provider: account.provider,
        })

        try {
          // Exchange the Microsoft ID token for backend access token
          console.log('[AUTH DEBUG] Starting token exchange')
          const resp = await getAccessToken(account.id_token as string)
          console.log('[AUTH DEBUG] Token exchange result', {
            success: !('error' in resp),
            hasError: 'error' in resp,
          })

          if (resp && !('error' in resp)) {
            // Store the tokens and user data in the JWT
            console.log('[AUTH DEBUG] Successfully stored tokens in JWT')
            logAuthToSentry('Tokens Stored in JWT', { success: true })
            token.accessToken = resp.accessToken
            token.accessTokenExpiresAt = resp.accessTokenExpiresAt
            token.clientPrivateKey = resp.clientPrivateKey
            token.provider = 'azure-ad'
            token.userData = resp.userData
          } else {
            // Handle the case where token exchange failed
            const errorMessage = resp?.error || 'Token exchange failed'
            console.error('[AUTH DEBUG] Token exchange failed:', errorMessage, resp?.status)
            logAuthToSentry(
              'JWT Token Exchange Failed',
              {
                errorMessage,
                status: resp?.status,
              },
              'error'
            )

            // Store backend error in global variable for later use in redirect
            lastBackendError = errorMessage
            console.log('[AUTH DEBUG] Stored backend error for redirect:', errorMessage)

            // Throw error to completely halt the authentication flow
            // This will force a redirect to the error page
            const error = new Error(errorMessage)
            error.name = 'BackendApiError'
            throw error
          }
        } catch (error) {
          console.error(
            '[AUTH DEBUG] Exception during Azure AD auth:',
            error instanceof Error ? error.message : String(error)
          )

          logAuthErrorToSentry(error, 'Azure AD Authentication Exception', {
            provider: account.provider,
            idTokenPresent: !!account.id_token,
          })

          let errorMessage = 'Authentication failed'

          if (error instanceof Error) {
            // If this is already our BackendApiError, just re-throw it
            if (error.name === 'BackendApiError') {
              console.log('[AUTH DEBUG] Re-throwing BackendApiError')
              throw error
            }
            errorMessage = error.message
          } else if (typeof error === 'string') {
            errorMessage = error
          }

          // Store error in global variable for later use in redirect
          lastBackendError = errorMessage
          console.log('[AUTH DEBUG] Stored backend error for redirect:', errorMessage)

          const newError = new Error(errorMessage)
          newError.name = 'BackendApiError'
          throw newError
        }
      }

      // This block handles manual/credentials login
      // The provider ID should be 'manual-login' from CredentialsProvider
      if (user && account?.provider === 'manual-login') {
        const customUser = user as unknown as CustomUser

        if (customUser.accessToken && customUser.clientPrivateKey) {
          token.accessToken = customUser.accessToken
          token.accessTokenExpiresAt = customUser.accessTokenExpiresAt
          token.clientPrivateKey = customUser.clientPrivateKey
          token.provider = 'credentials'

          // Handle userData, which might be an object or stringified JSON
          if (customUser.userData) {
            token.userData = customUser.userData
          }
        } else {
          console.error('Invalid credentials in manual login')
          token.error = 'invalid_credentials'
        }
      }

      // This block handles passkey login
      if (user && account?.provider === 'passkey-login') {
        const customUser = user as unknown as CustomUser

        if (customUser.accessToken && customUser.clientPrivateKey) {
          token.accessToken = customUser.accessToken
          token.accessTokenExpiresAt = customUser.accessTokenExpiresAt
          token.clientPrivateKey = customUser.clientPrivateKey
          token.provider = 'passkey'

          // Handle userData - extract the user object from the nested structure
          if (customUser.userData) {
            // customUser.userData contains both user object and metadata
            // Extract just the user object for token.userData
            token.userData = (customUser.userData as any).user || customUser.userData
          }
        } else {
          console.error('Invalid credentials in passkey login')
          token.error = 'invalid_credentials'
        }
      }

      // Ensure token always has required base properties to prevent serialization issues
      if (!token.accessToken) token.accessToken = ''
      if (!token.accessTokenExpiresAt) token.accessTokenExpiresAt = ''
      if (!token.clientPrivateKey) token.clientPrivateKey = ''
      if (!token.provider) token.provider = ''

      return token
    },
    async session({ session, token }) {
      // Check for token errors (including expiration)
      if (token.error === 'token_expired') {
        console.log('Session token expired, forcing sign out')
        // Throw error to trigger sign out instead of returning null
        throw new Error('TokenExpiredError')
      }

      if (token.error) {
        console.error('Session error:', token.error)
        // Throw error to trigger sign out instead of returning null
        throw new Error(`SessionError: ${token.error}`)
      }

      // Ensure session has the required properties from token with fallbacks
      session.accessToken = token.accessToken || ''
      session.accessTokenExpiresAt = token.accessTokenExpiresAt || ''
      session.clientPrivateKey = token.clientPrivateKey || ''
      session.provider = token.provider || ''

      // Add user data to the session
      if (token.userData) {
        // Construct name from firstname and lastname
        const firstName = token.userData.firstname || ''
        const lastName = token.userData.lastname || ''

        let fullName = ''
        if (firstName || lastName) {
          fullName = `${firstName} ${lastName}`.trim()
        }

        // If no name could be constructed, try fallbacks
        if (!fullName) {
          fullName = session.user?.name || ''
        }

        // If we have userData from token, use it as the primary source
        session.user = {
          id: token.userData.id,
          name: fullName,
          email: token.userData.email || session.user?.email || '',
          roles: token.userData.roles || [],
          personId: token.userData.personId,
          lastLogin: token.userData.lastLogin,
        }
      } else if (session.user) {
        // If no userData from token but we have session.user (e.g., from provider)
        // Preserve all existing fields and add required fields with defaults
        session.user = {
          ...session.user,
          id: session.user.id || 0,
          // Use session.user.name which should be available from OAuth provider
          name: session.user.name || '',
          email: session.user.email || '',
          // Add default arrays for roles to avoid type errors
          roles: [],
          personId: 0,
          lastLogin: new Date().toISOString(),
        }
      }

      return session
    },
  },
}
