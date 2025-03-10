import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InferType } from 'yup'

import { schema } from '../_schemas/account-profile-settings.schema'

export type UserProfileType = InferType<typeof schema>

const useAccountProfileSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // This would be populated from API
  const defaultValues = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    role: 'User',
  }

  const methods = useForm<UserProfileType>({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const onSubmit = async (data: UserProfileType) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Profile updated successfully', data)
    } catch (error) {
      console.error('Error updating profile', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return {
    isSubmitting,
    methods,
    onSubmit,
  }
}

export default useAccountProfileSettings
