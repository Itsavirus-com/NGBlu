'use client'

import { useTranslations } from 'next-intl'

import { PasswordApiType } from '@/constants/password-api.types'
import { TokenType } from '@/constants/token.types'

import SetPasswordForm from '../set-password/_components/SetPasswordForm'
import useSetPasswordForm from '../set-password/_hooks/set-password.hook'

export default function PasswordReset() {
  const t = useTranslations('auth.resetPassword')

  const usePasswordResetHook = () => {
    return useSetPasswordForm({
      apiType: PasswordApiType.PASSWORD_RESET,
      tokenType: TokenType.PASSWORD_RESET,
      successMessage: t('successReset'),
    })
  }

  return (
    <SetPasswordForm
      useCustomHook={usePasswordResetHook}
      buttonLabel={t('resetPassword')}
      title={t('title')}
      subtitle={t('subtitle')}
    />
  )
}
