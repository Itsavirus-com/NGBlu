'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { Button } from '@/components/button/button'
import { KTIcon } from '@/components/kt-icon/KtIcon'

interface TotpVerificationStepProps {
  email: string
  isLoading: boolean
  onBackToPassword: () => void
  onUseBackupCode: () => void
  useBackupCode?: boolean
  handleCodeChange: (value: string, onChange: (value: string) => void) => void
}

export function TotpVerificationStep({
  email,
  isLoading,
  onBackToPassword,
  onUseBackupCode,
  useBackupCode = false,
  handleCodeChange,
}: TotpVerificationStepProps) {
  const t = useTranslations('auth.login')
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="text-center">
      <div className="mb-10">
        <div className="d-flex justify-content-center mb-4">
          <div className="symbol symbol-100px">
            <div className="symbol-label bg-light-primary">
              <KTIcon iconName="shield-tick" className="fs-2x text-primary" />
            </div>
          </div>
        </div>
        <h1 className="text-gray-800 fs-2x fw-bolder mb-3">
          {useBackupCode ? t('enterBackupCode') : t('twoFactorVerification')}
        </h1>
        <div className="text-gray-500 fw-semibold fs-6 mb-2">
          {useBackupCode ? t('enterBackupCodeDescription') : t('enterTwoFactorCode')}
        </div>
        <div className="text-gray-600 fw-semibold fs-7">{email}</div>
      </div>

      <div className="mb-8">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <div className="fv-row">
              <input
                {...field}
                type="text"
                className={`form-control form-control-lg text-center fs-2x fw-bold ${
                  errors.code ? 'is-invalid' : ''
                }`}
                placeholder="000000"
                maxLength={6}
                value={field.value || ''}
                onChange={e => {
                  handleCodeChange(e.target.value, field.onChange)
                }}
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="[0-9]*"
                style={{ letterSpacing: '0.5rem' }}
              />
              {errors.code && (
                <div className="invalid-feedback">{errors.code.message as string}</div>
              )}
            </div>
          )}
        />
      </div>

      <div className="d-flex flex-column gap-4">
        <Button
          type="submit"
          colorClass="primary"
          label={t('verify')}
          loading={isLoading}
          className="w-100"
        />

        {!useBackupCode && (
          <Button
            type="button"
            colorClass="light"
            label={t('useBackupCode')}
            onClick={onUseBackupCode}
            className="w-100"
            icon="key"
          />
        )}

        <Button
          type="button"
          onClick={onBackToPassword}
          icon="arrow-left"
          label={t('backToPassword')}
          colorClass="light"
          iconClassName="text-primary"
          className="btn-sm text-primary border-0 bg-transparent shadow-none"
        />
      </div>

      <div className="text-center mt-8">
        <div className="text-gray-500 fw-semibold fs-7">
          {useBackupCode ? t('backupCodeHelp') : t('twoFactorHelp')}
        </div>
      </div>
    </div>
  )
}
