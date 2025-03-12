'use client'

import { useTranslations } from 'next-intl'

import SetPasswordForm from './_components/SetPasswordForm'
import useSetPasswordForm from './_hooks/set-password.hook'

export default function SetPasswordFirstTime() {
  const t = useTranslations('auth.setPassword')
  const useDefaultSetPasswordHook = () => useSetPasswordForm()

  return (
    <SetPasswordForm useCustomHook={useDefaultSetPasswordHook} buttonLabel={t('activateAccount')} />
  )
}
