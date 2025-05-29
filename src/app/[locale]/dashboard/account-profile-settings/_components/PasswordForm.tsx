'use client'

import { useTranslations } from 'next-intl'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider/form-provider'
import { ControlledInput } from '@/components/forms/input'

import { PasswordFormType } from '../_schemas/password.schema'

interface PasswordFormProps {
  isSubmitting: boolean
  onSubmit: (data: PasswordFormType) => Promise<void>
  methods: UseFormReturn<PasswordFormType>
}

export const PasswordForm = ({ isSubmitting, onSubmit, methods }: PasswordFormProps) => {
  const t = useTranslations('account')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="card mb-6">
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">{t('passwordUpdate')}</span>
            <span className="text-muted mt-1 fw-semibold fs-7">{t('changeYourPassword')}</span>
          </h3>
        </div>
        <div className="card-body">
          <div className="row mb-6">
            <div className="col-md-12">
              <ControlledInput
                name="currentPassword"
                label={t('currentPassword')}
                type="password"
                containerClass="mb-4"
                isRequired
              />
              <ControlledInput
                name="password"
                label={t('newPassword')}
                type="password"
                containerClass="mb-4"
                isRequired
              />
              <ControlledInput
                name="passwordConfirmation"
                label={t('confirmPassword')}
                type="password"
                containerClass="mb-4"
                isRequired
              />
              <div className="text-muted fs-7">{t('passwordRequirements')}</div>
            </div>
          </div>
        </div>
      </div>

      <FormButtons isSubmitting={isSubmitting} submitText={t('updatePassword')} />
    </FormProvider>
  )
}
