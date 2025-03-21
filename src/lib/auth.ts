import { NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'

// Define custom user type for credentials provider
interface CustomUser {
  id: string
  accessToken: string
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

    if (!res.ok) return null

    const clientPrivateKey = res.headers.get('client-private-key')

    // Check if the key is empty
    if (!clientPrivateKey) {
      console.error('Missing client-private-key in API response')
      return null
    }

    const userData = await res.json()

    return {
      accessToken: res.headers.get('access-token') || '',
      clientPrivateKey: clientPrivateKey || '',
      userData: userData.data,
    }
  } catch (error) {
    console.log('error in getAccessToken', error)
    return null
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
        clientPrivateKey: { label: 'Client Private Key', type: 'text' },
        userData: { label: 'User Data', type: 'text' },
      },
      async authorize(credentials) {
        console.log('credentials', credentials)
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

          // Return user object with the tokens and user data
          return {
            id: '1', // Required by NextAuth
            accessToken: credentials.accessToken,
            clientPrivateKey: credentials.clientPrivateKey,
            userData,
          } as CustomUser
        } catch (error) {
          console.error('Error in authorize callback:', error)
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
        // Parse the URL to extract and clean up query parameters
        const parsedUrl = new URL(url, baseUrl)
        const callbackUrl = parsedUrl.searchParams.get('callbackUrl')

        // Create a clean URL without the error parameter
        if (callbackUrl) {
          return `${baseUrl}/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
        }

        // If no callbackUrl, just return to login without parameters
        return `${baseUrl}/auth/login`
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
      // This block handles initial sign-in via Azure AD
      if (account && account.provider === 'azure-ad') {
        try {
          // Exchange the Microsoft ID token for backend access token
          const resp = await getAccessToken(account.id_token as string)

          if (resp) {
            // Store the tokens and user data in the JWT
            token.accessToken = resp.accessToken
            token.clientPrivateKey = resp.clientPrivateKey
            token.provider = 'azure-ad'
            token.userData = resp.userData
          } else {
            // Handle the case where token exchange failed
            console.error('Token exchange failed')
            token.error = 'auth_error'
            throw new Error('auth_error')
          }
        } catch (error) {
          console.error('Auth error:', error)
          token.error = 'auth_error'
          throw new Error('auth_error')
        }
      }

      // This block handles manual/credentials login
      // The provider ID should be 'manual-login' from CredentialsProvider
      if (user && account?.provider === 'manual-login') {
        const customUser = user as unknown as CustomUser

        if (customUser.accessToken && customUser.clientPrivateKey) {
          token.accessToken = customUser.accessToken
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

      return token
    },
    async session({ session, token }) {
      // Ensure session has the required properties from token
      session.accessToken = token.accessToken
      session.clientPrivateKey = token.clientPrivateKey
      session.provider = token.provider

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
