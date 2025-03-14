import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { verifyEmailApi } from '@/services/api/verify-email-api'

const useVerifyEmail = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>()

  const validateToken = useCallback(async () => {
    try {
      setStatus('loading')
      const response = await verifyEmailApi.verifyEmail({
        token,
      })

      if (token === null) {
        setStatus('error')
        return
      }

      if (response.ok) {
        setStatus('success')
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      }
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }, [token])

  useEffect(() => {
    validateToken()
  }, [validateToken])

  return { status }
}

export default useVerifyEmail
