'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider/FormProvider'
import Loading from '@/components/loading/Loading'
import { Page } from '@/components/page/page'
import { useRouter } from '@/navigation'
import { passwordVerificationUtils } from '@/utils/password-verification'

import { usePasswordVerification } from './_hooks/password-verification.hook'

export default function VerifyPassword() {
  const t = useTranslations('account')
  const router = useRouter()
  const { methods, onSubmit, isSubmitting, isLoading, userProfile, isVerified } =
    usePasswordVerification()

  // Redirect to account settings if already verified
  useEffect(() => {
    if (isVerified) {
      router.push('/dashboard/account-profile-settings')
    }
  }, [isVerified, router])

  // Redirect Microsoft users since they don't have passwords
  useEffect(() => {
    if (userProfile && !passwordVerificationUtils.needsVerification(userProfile)) {
      router.push('/dashboard/account-profile-settings')
    }
  }, [userProfile, router])

  if (isLoading) {
    return (
      <Page title={t('verifyPassword')}>
        <Loading />
      </Page>
    )
  }

  return (
    <Page title={t('verifyPassword')} description={t('verifyPasswordDescription')}>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <div className="card">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">{t('verifyPassword')}</span>
                  <span className="text-muted mt-1 fw-semibold fs-7">
                    {t('enterCurrentPasswordToContinue')}
                  </span>
                </h3>
              </div>
              <div className="card-body">
                <div className="mb-6">
                  <ControlledInput
                    name="password"
                    label={t('currentPassword')}
                    type="password"
                    containerClass="mb-4"
                    isRequired
                    autoFocus
                  />
                </div>
                <FormButtons
                  isSubmitting={isSubmitting}
                  submitText={t('verifyPassword')}
                  withCancel={false}
                />
              </div>
            </div>
          </FormProvider>
        </div>
      </div>
    </Page>
  )
}
