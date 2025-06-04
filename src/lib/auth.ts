import { NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'

import { parseAccessTokenExpiresAt } from '@/utils/dateTime'

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
  displayName: string
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
    const timestamp = new Date().toISOString()
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login/sso?id_token=${idToken}`

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Timestamp': timestamp,
      },
    })

    if (!res.ok) {
      // Try to get error details from the response
      let errorMessage = `HTTP ${res.status}`
      try {
        const errorData = await res.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch {
        // If we can't parse the error response, use status text
        errorMessage = res.statusText || errorMessage
      }
      return { error: errorMessage }
    }

    const clientPrivateKey = res.headers.get('client-private-key')
    const accessTokenExpiresAt = res.headers.get('access-token-expires-at')

    // Check if the key is empty
    if (!clientPrivateKey) {
      console.error('Missing client-private-key in API response')
      return { error: 'Missing client-private-key in API response' }
    }

    // Parse the expiration timestamp to ensure it's valid
    let expiresAtTimestamp = parseAccessTokenExpiresAt(accessTokenExpiresAt)

    const userData = await res.json()

    return {
      accessToken: res.headers.get('access-token') || '',
      accessTokenExpiresAt: expiresAtTimestamp,
      clientPrivateKey: clientPrivateKey || '',
      userData: userData.data,
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error occurred' }
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
            return null
          }

          // Parse userData if it exists
          let userData = {}
          if (credentials.userData) {
            try {
              userData = JSON.parse(credentials.userData)
            } catch (e) {
              console.error('Failed to parse userData:', e)
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
            return null
          }

          // Parse userData if it exists
          let userData = {}
          if (credentials.userData) {
            try {
              userData = JSON.parse(credentials.userData)
            } catch (e) {
              console.error('Failed to parse passkey userData:', e)
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
      // Handle error redirects
      if (url.includes('error=')) {
        // Parse the URL to extract query parameters
        const parsedUrl = new URL(url, baseUrl)
        const callbackUrl = parsedUrl.searchParams.get('callbackUrl')
        const error = parsedUrl.searchParams.get('error')
        const errorDescription = parsedUrl.searchParams.get('error_description')

        // Build login URL with preserved error information
        const loginUrl = new URL('/auth/login', baseUrl)

        if (callbackUrl) {
          loginUrl.searchParams.set('callbackUrl', callbackUrl)
        }

        if (error) {
          loginUrl.searchParams.set('error', error)
        }

        if (errorDescription) {
          loginUrl.searchParams.set('error_description', errorDescription)
        }

        return loginUrl.toString()
      }

      // If URL contains callbackUrl parameter, use that
      if (url.includes('callbackUrl=')) {
        const callbackUrl = new URL(url, baseUrl).searchParams.get('callbackUrl')
        if (callbackUrl) return callbackUrl
      }

      // Default redirect to dashboard
      return `${baseUrl}/dashboard`
    },
    async jwt({ token, account, user }) {
      // Check if existing token is expired before processing
      if (token.accessTokenExpiresAt && isTokenExpired(token.accessTokenExpiresAt)) {
        // Clear the token and throw error to force sign out
        token.error = 'token_expired'
        return token
      }

      // This block handles initial sign-in via Azure AD
      if (account && account.provider === 'azure-ad') {
        try {
          // Exchange the Microsoft ID token for backend access token
          const resp = await getAccessToken(account.id_token as string)

          if (resp && !('error' in resp)) {
            // Store the tokens and user data in the JWT
            token.accessToken = resp.accessToken
            token.accessTokenExpiresAt = resp.accessTokenExpiresAt
            token.clientPrivateKey = resp.clientPrivateKey
            token.provider = 'azure-ad'
            token.userData = resp.userData
          } else {
            // Handle the case where token exchange failed
            const errorMessage = resp?.error || 'Token exchange failed'
            token.error = errorMessage
            throw new Error(errorMessage)
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Authentication failed'
          console.error('Auth error:', errorMessage)
          token.error = errorMessage
          throw new Error(errorMessage)
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
        // If we have userData from token, use it as the primary source
        session.user = {
          id: token.userData.id,
          name: token.userData.displayName || session.user?.name || '',
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
