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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login?id_token=${idToken}`,
      {
        method: 'GET',
      }
    )

    if (!res.ok) return null

    const sharedSecret = await generateSecret(res.headers.get('client-private-key') as string)

    return {
      accessToken: res.headers.get('access-token'),
      sharedSecret,
    }
  } catch (error) {
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
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async jwt({ token, account }) {
      if (account) {
        const resp = await getAccessToken(account.id_token as string)

        token.accessToken = resp?.accessToken
        token.sharedSecret = resp?.sharedSecret
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
