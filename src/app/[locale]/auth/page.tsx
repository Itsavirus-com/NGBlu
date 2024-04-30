import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { redirect } from '@/navigation'

export default async function Auth() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
    return
  }

  redirect('/auth/login')
}
