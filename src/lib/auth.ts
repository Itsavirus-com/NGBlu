import { createHmac } from 'crypto'
import sodium from 'libsodium-wrappers'
import { NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'

// Define custom user type for credentials provider
interface CustomUser {
  id: string
  accessToken: string
  sharedSecret: string
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
    error?: string
    userData?: UserData
  }
}

export async function generateSecret(clientPrivateKey: string) {
  await sodium.ready

  const serverPublicKey = process.env.NEXT_PUBLIC_SERVER_PUBLIC_KEY as string

  const sharedSecret = sodium.crypto_scalarmult(
    sodium.from_base64(clientPrivateKey, sodium.base64_variants.ORIGINAL),
    sodium.from_base64(serverPublicKey, sodium.base64_variants.ORIGINAL)
  )

  return sharedSecret
}

async function getAccessToken(idToken: string) {
  try {
    const timestamp = new Date().toISOString()
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login/sso?id_token=${idToken}`
    const method = 'GET'
    const message = `${timestamp}${method}${url}`

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

    const sharedSecret = await generateSecret(clientPrivateKey)

    // Generate signature after getting the shared secret
    const signature = await createHmac('sha256', sharedSecret).update(message).digest('hex')

    // Parse the response body to get user data
    const userData = await res.json()

    return {
      accessToken: res.headers.get('access-token') || '',
      sharedSecret: Buffer.from(sharedSecret).toString('base64'),
      signature,
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
        sharedSecret: { label: 'Shared Secret', type: 'text' },
        userData: { label: 'User Data', type: 'text' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.accessToken || !credentials?.sharedSecret) {
            console.error('Missing credentials:', {
              hasAccessToken: !!credentials?.accessToken,
              hasSharedSecret: !!credentials?.sharedSecret,
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
            sharedSecret: credentials.sharedSecret,
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
        return `${baseUrl}/auth/login${url.split('?')[1] ? `?${url.split('?')[1]}` : ''}`
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
      // Initialize token properties if they don't exist
      token.accessToken = token.accessToken || ''
      token.sharedSecret = token.sharedSecret || ''
      token.provider = token.provider || ''

      // This runs during initial sign-in
      if (account) {
        if (account.provider === 'azure-ad') {
          try {
            // Exchange the Microsoft ID token for backend access token
            const resp = await getAccessToken(account.id_token as string)

            if (resp) {
              // Store the access token and shared secret in the JWT
              token.accessToken = resp.accessToken
              token.sharedSecret = resp.sharedSecret
              token.provider = 'azure-ad'
              token.userData = resp.userData
            } else {
              // Handle the case where token exchange failed
              console.error('Token exchange failed')
              token.error = 'auth_error'
              throw new Error('auth_error')
            }
          } catch (error) {
            console.error('Auth error', error)
            token.error = 'auth_error'
            throw new Error('auth_error')
          }
        }
      }

      // For credentials provider, the user object already contains the tokens
      if (user) {
        const customUser = user as CustomUser
        token.accessToken = customUser.accessToken
        token.sharedSecret = customUser.sharedSecret
        token.provider = 'credentials'
        token.userData = customUser.userData
      }

      return token
    },
    async session({ session, token }) {
      // Ensure session has the required properties
      session.accessToken = token.accessToken
      session.sharedSecret = token.sharedSecret
      session.provider = token.provider

      // Add user data to the session
      if (token.userData) {
        session.user = {
          id: token.userData.id,
          name: token.userData.displayName,
          email: token.userData.email,
          roles: token.userData.roles,
          personId: token.userData.personId,
          lastLogin: token.userData.lastLogin,
        }
      }

      return session
    },
  },
}
