import { useState } from 'react'

const useResetPassword = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Here we would integrate with our auth provider to send the reset email
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      setIsSubmitted(true)
    } catch (err) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { email, isSubmitting, isSubmitted, error, handleSubmit, setEmail }
}

export default useResetPassword
