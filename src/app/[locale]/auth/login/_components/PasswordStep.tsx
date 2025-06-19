import { useTranslations } from 'next-intl'

import { Button } from '@/components/button/button'
import { ControlledInput } from '@/components/forms/input'
import { Link } from '@/navigation'

interface PasswordStepProps {
  emailValue: string
  isLoading: boolean
}

export function PasswordStep({ emailValue, isLoading }: PasswordStepProps) {
  const t = useTranslations('auth.login')

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-gray-800 fs-2x fw-bolder mb-3">{t('enterPasswordFor')}</h1>
        <div className="text-gray-500 fw-semibold fs-6 text-break">{emailValue}</div>
      </div>

      {/* Password Input */}
      <div className="mb-8">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <label className="form-label fw-semibold text-muted fs-6">
            {t('password')} <span className="text-danger">*</span>
          </label>
          <Link href="/auth/request-password-reset" className="link-primary fs-6 fw-bold">
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
        className="w-100 flex-center py-4"
        loading={isLoading}
        disabled={isLoading}
        size="lg"
      />
    </>
  )
}
