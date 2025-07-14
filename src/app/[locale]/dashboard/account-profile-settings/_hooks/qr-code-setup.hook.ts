import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useTotpManagement } from './totp-management.hook'
import { type QrCodeSetupFormData, qrCodeSetupSchema } from '../_schemas/qr-code-setup.schema'

interface UseQrCodeSetupProps {
  onComplete: (backupCodes: string[]) => void
  onHide: () => void
}

export function useQrCodeSetup({ onComplete, onHide }: UseQrCodeSetupProps) {
  const { onSubmitSetup, isSettingUp } = useTotpManagement()
  const [step, setStep] = useState<'scan' | 'verify'>('scan')

  const methods = useForm<QrCodeSetupFormData>({
    resolver: yupResolver(qrCodeSetupSchema),
    defaultValues: {
      verificationCode: '',
    },
  })

  const handleNextStep = () => {
    setStep('verify')
  }

  const handleBackStep = () => {
    setStep('scan')
  }

  const handleSubmit = async (data: QrCodeSetupFormData) => {
    const backupCodes = await onSubmitSetup(data)
    if (backupCodes) {
      onComplete(backupCodes)
      onHide()
      setStep('scan') // Reset for next time
    }
  }

  const handleClose = () => {
    onHide()
    setStep('scan') // Reset step when closing
    methods.reset() // Reset form
  }

  const handleManualEntry = (qrCodeUrl: string) => {
    try {
      const url = new URL(qrCodeUrl)
      const secret = url.searchParams.get('secret')
      if (secret) {
        navigator.clipboard.writeText(secret)
        // Could return success indicator for toast
        return true
      }
    } catch (error) {
      console.error('Failed to extract secret from QR code URL:', error)
    }
    return false
  }

  return {
    methods,
    step,
    isSettingUp,
    handleNextStep,
    handleBackStep,
    handleSubmit,
    handleClose,
    handleManualEntry,
  }
}
