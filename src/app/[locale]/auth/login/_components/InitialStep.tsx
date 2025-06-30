import Image from 'next/image'
import { useTranslations } from 'next-intl'

import microsoftIcon from '@/assets/images/brand-logos/microsoft-5.svg'
import { Button } from '@/components/button/button'
import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

interface InitialStepProps {
  emailValue: string
  isCheckingPasskey: boolean
  onMicrosoftSignIn: () => void
  onEmailContinue: () => void
}

export function InitialStep({
  emailValue,
  isCheckingPasskey,
  onMicrosoftSignIn,
  onEmailContinue,
}: InitialStepProps) {
  const t = useTranslations('auth.login')

  return (
    <>
      {/* Microsoft Sign In Button */}
      <div
        onClick={onMicrosoftSignIn}
        className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100 mb-6"
      >
        <Image alt="Logo" src={microsoftIcon} width={15} height={15} className="h-15px me-3" />
        {t('signInButton')}
      </div>

      <div className="d-flex align-items-center my-6">
        <hr className="flex-grow-1 border-2" />
        <span className="text-gray-500 text-nowrap px-3">{t('orContinueWith')}</span>
        <hr className="flex-grow-1 border-2" />
      </div>

      {/* Email Input */}
      <ControlledInput
        label={t('email')}
        name="email"
        type="email"
        placeholder="mail@example.com"
        containerClass="mb-6 text-start"
        isRequired
        autoComplete="username webauthn"
      />

      {/* Continue Button */}
      <Button
        type="button"
        onClick={onEmailContinue}
        label={t('continue')}
        colorClass="primary"
        className="w-100 flex-center"
        disabled={!emailValue || !emailValue.includes('@') || isCheckingPasskey}
        loading={isCheckingPasskey}
      />
    </>
  )
}
