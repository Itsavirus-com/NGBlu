import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/set-password.schema'

export default function useSetPasswordForm() {
  const router = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading, withLoading } = useLoading()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const getPasswordStrength = (password: string) => {
    if (!password) return 0

    let strength = 0
    // Length check
    if (password.length >= 8) strength += 25
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25
    // Contains number or special char
    if (/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength += 25

    return strength
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 50) return 'danger'
    if (strength < 75) return 'warning'
    return 'success'
  }

  const getStrengthText = (strength: number) => {
    if (strength < 50) return 'Weak'
    if (strength < 75) return 'Good'
    return 'Strong'
  }

  const onSubmit = async (data: any) => {
    try {
      // Validate password strength
      const passwordStrength = getPasswordStrength(data.newPassword)
      if (passwordStrength < 50) {
        showToast({
          variant: 'danger',
          // displayTitle: 'Password too weak',
          body: 'Please choose a stronger password.',
        })
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      showToast({
        variant: 'success',
        // displayTitle: 'Account activated',
        body: 'Your password has been set successfully. Welcome to the platform!',
      })

      // Redirect to dashboard after successful setup
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (error) {
      showUnexpectedToast()
    }
  }

  return {
    methods,
    onSubmit,
    isLoading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    getPasswordStrength,
    getStrengthColor,
    getStrengthText,
  }
}
