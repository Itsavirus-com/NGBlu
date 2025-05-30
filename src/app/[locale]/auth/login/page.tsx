'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import microsoftIcon from '@/assets/images/brand-logos/microsoft-5.svg'
import { Button } from '@/components/button/Button'
import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'
import { FormProvider } from '@/components/forms/form-provider'
import { Link } from '@/navigation'

import { useLogin } from './_hooks/login.hook'

export default function Login() {
  const t = useTranslations('auth.login')
  const tPasskey = useTranslations('auth.passkey')
  const {
    methods,
    onSubmit,
    isLoading,
    handleMicrosoftSignIn,
    handlePasskeySignIn,
    isPasskeySupported,
    isPasskeyAuthenticating,
  } = useLogin()

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('signIn')}</h1>
          <div className="text-gray-600">{t('signInToInfraOrders')}</div>
        </div>

        {/* Passkey Sign In Button - Show if supported */}
        {isPasskeySupported && (
          <Button
            type="button"
            onClick={handlePasskeySignIn}
            label={tPasskey('signInWithPasskey')}
            icon="fingerprint-scanning"
            className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100 mb-4"
            loading={isPasskeyAuthenticating}
            disabled={isPasskeyAuthenticating}
            size="lg"
          />
        )}

        {/* Microsoft Sign In Button */}
        <div
          onClick={handleMicrosoftSignIn}
          className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
        >
          <Image alt="Logo" src={microsoftIcon} width={15} height={15} className="h-15px me-3" />
          {t('signInButton')}
        </div>

        <div className="d-flex align-items-center my-8">
          <hr className="flex-grow-1 border-2" />
          <span className="text-gray-500 text-nowrap px-3">{t('orContinueWith')}</span>
          <hr className="flex-grow-1 border-2" />
        </div>

        {/* Email Input with conditional UI support */}
        <ControlledInput
          label={t('email')}
          name="email"
          type="email"
          placeholder="mail@example.com"
          containerClass="mb-6"
          isRequired
          autoComplete="username webauthn"
        />

        {/* Password Input */}
        <div className="mb-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="form-label fw-bold">
              {t('password')} <span className="text-danger">*</span>
            </label>
            <Link href="/auth/request-password-reset" className="text-primary">
              {t('forgotPassword')}
            </Link>
          </div>
          <ControlledInput
            name="password"
            type="password"
            isRequired
            autoComplete="current-password"
          />
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          label={t('signIn')}
          colorClass="primary"
          className="w-100 flex-center"
          loading={isLoading}
          disabled={isLoading}
        />

        {/* Passkey info for unsupported browsers */}
        {!isPasskeySupported && (
          <div className="mt-4 p-3 bg-light rounded">
            <div className="text-muted text-center">
              <i className="bi bi-info-circle me-2"></i>
              {tPasskey('notSupportedInfo')}
            </div>
          </div>
        )}
      </div>
    </FormProvider>
  )
}
