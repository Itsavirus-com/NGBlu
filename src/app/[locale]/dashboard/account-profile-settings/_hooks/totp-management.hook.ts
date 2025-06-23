import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { totpApi } from '@/services/api/totp-api'
import { useUserProfile } from '@/services/swr/use-user-profile'

import { type TotpSetupFormData, totpSetupSchema } from '../_schemas/totp.schema'

export function useTotpManagement() {
  const t = useTranslations('common.error')
  const { showToast } = useToast()
  const { data: userProfile, mutate: mutateProfile } = useUserProfile()

  // State management
  const [is2faEnabled, setIs2faEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSettingUp, setIsSettingUp] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [backupCodes, setBackupCodes] = useState<string[]>([])

  // Form setup
  const methods = useForm<TotpSetupFormData>({
    resolver: yupResolver(totpSetupSchema),
    defaultValues: {
      verificationCode: '',
    },
  })

  // Initialize 2FA status from user profile
  useEffect(() => {
    if (userProfile) {
      // Use the is2faEnabled field from the user profile API response
      const is2faEnabled = (userProfile as any).is2FaEnabled || false
      setIs2faEnabled(is2faEnabled)
    }
  }, [userProfile])

  const handleGenerateQrCode = async () => {
    setIsSettingUp(true)
    try {
      const response = await totpApi.generateQrCode()

      if (response.ok && response.data?.success) {
        setQrCodeUrl(response.data.data.qrCodeUrl)
      } else {
        showToast({
          variant: 'danger',
          title: t('error'),
          body: response.data?.message || t('genericError'),
        })
      }
    } catch (error: any) {
      showToast({
        variant: 'danger',
        title: t('error'),
        body: error.message || t('genericError'),
      })
    } finally {
      setIsSettingUp(false)
    }
  }

  const handleEnable2fa = async (verificationCode: string) => {
    setIsSettingUp(true)
    try {
      const response = await totpApi.enable2fa({ code: verificationCode })

      if (response.ok && response.data?.success) {
        setIs2faEnabled(true)
        setBackupCodes(response.data.data.backupCodes || [])
        setQrCodeUrl(null)

        // Refresh user profile
        await mutateProfile()

        showToast({
          variant: 'success',
          title: 'Success',
          body: '2FA has been enabled successfully',
        })

        return response.data.data.backupCodes || []
      } else {
        showToast({
          variant: 'danger',
          title: t('error'),
          body: response.data?.message || t('genericError'),
        })
        return null
      }
    } catch (error: any) {
      showToast({
        variant: 'danger',
        title: t('error'),
        body: error.message || t('genericError'),
      })
      return null
    } finally {
      setIsSettingUp(false)
    }
  }

  const handleDisable2fa = async () => {
    setIsLoading(true)
    try {
      const response = await totpApi.disable2fa()

      if (response.ok && response.data?.success) {
        setIs2faEnabled(false)
        setBackupCodes([])
        setQrCodeUrl(null)

        // Refresh user profile
        await mutateProfile()

        showToast({
          variant: 'success',
          title: 'Success',
          body: '2FA has been disabled successfully',
        })
      } else {
        showToast({
          variant: 'danger',
          title: t('error'),
          body: response.data?.message || t('genericError'),
        })
      }
    } catch (error: any) {
      showToast({
        variant: 'danger',
        title: t('error'),
        body: error.message || t('genericError'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitSetup = async (data: TotpSetupFormData) => {
    const backupCodes = await handleEnable2fa(data.verificationCode)
    if (backupCodes) {
      // Reset form after successful setup
      methods.reset()
    }
    return backupCodes
  }

  return {
    // State
    is2faEnabled,
    isLoading,
    isSettingUp,
    qrCodeUrl,
    backupCodes,

    // Methods
    methods,
    handleGenerateQrCode,
    handleEnable2fa,
    handleDisable2fa,
    onSubmitSetup,
  }
}
