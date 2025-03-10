import { createHmac } from 'crypto'
import sodium from 'libsodium-wrappers'
import { NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'

async function generateSecret(clientPrivateKey: string) {
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

    return {
      accessToken: res.headers.get('access-token'),
      sharedSecret,
      signature,
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
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async redirect({ baseUrl, url }) {
      if (url.includes('error=')) {
        return `${baseUrl}/auth/login${url.split('?')[1] ? `?${url.split('?')[1]}` : ''}`
      }
      return baseUrl
    },
    async jwt({ token, account }) {
      if (account) {
        // This block only runs during initial sign-in
        try {
          // Exchange the Microsoft ID token for backend access token
          const resp = await getAccessToken(account.id_token as string)

          if (resp) {
            // Store the access token and shared secret in the JWT
            token.accessToken = resp.accessToken
            token.sharedSecret = resp.sharedSecret
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

      return token
    },
    async session({ session, token }) {
      if (session) {
        session.accessToken = token.accessToken as string
        session.sharedSecret = token.sharedSecret as string
      }

      return session
    },
  },
}
