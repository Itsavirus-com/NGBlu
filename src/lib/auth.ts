import { NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'

async function getAccessToken(idToken: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login?id_token=${idToken}`,
      {
        method: 'GET',
      }
    )

    if (!res.ok) return null

    return res.headers.get('access-token')
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
        const accessToken = await getAccessToken(account.id_token as string)

        token.accessToken = accessToken
      }

      return token
    },
    async session({ session, token }) {
      if (session) {
        session.accessToken = token.accessToken as string
      }

      return session
    },
  },
}
