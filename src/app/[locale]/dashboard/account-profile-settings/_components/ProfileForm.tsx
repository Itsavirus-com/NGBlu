'use client'

import { useTranslations } from 'next-intl'
import { UseFormReturn } from 'react-hook-form'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider/FormProvider'

import { ProfileFormType } from '../_schemas/profile.schema'

interface ProfileFormProps {
  isSubmitting: boolean
  onSubmit: (data: ProfileFormType) => Promise<void>
  methods: UseFormReturn<ProfileFormType>
}

export const ProfileForm = ({ isSubmitting, onSubmit, methods }: ProfileFormProps) => {
  const t = useTranslations('account')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="card mb-6">
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">{t('personalInformation')}</span>
            <span className="text-muted mt-1 fw-semibold fs-7">{t('updatePersonalDetails')}</span>
          </h3>
        </div>
        <div className="card-body">
          <div className="row mb-6">
            <div className="col-md-6">
              <ControlledInput
                name="firstname"
                label={t('firstName')}
                isRequired
                containerClass="mb-4"
              />
            </div>
            <div className="col-md-6">
              <ControlledInput
                name="lastname"
                label={t('lastName')}
                isRequired
                containerClass="mb-4"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ControlledInput
                name="phoneNumber"
                label={t('phoneNumber')}
                type="tel"
                containerClass="mb-4"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">{t('accountInformation')}</span>
            <span className="text-muted mt-1 fw-semibold fs-7">{t('accountDetailsAndRole')}</span>
          </h3>
        </div>
        <div className="card-body">
          <div className="row mb-6">
            <div className="col-md-12">
              <ControlledInput
                name="email"
                label={t('emailAddress')}
                type="email"
                containerClass="mb-4"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ControlledInput name="roles" label={t('role')} disabled containerClass="mb-4" />
              <div className="text-muted fs-7">{t('rolePermissionsInfo')}</div>
            </div>
          </div>
        </div>
      </div>

      <FormButtons isSubmitting={isSubmitting} submitText={t('updateProfile')} />
    </FormProvider>
  )
}
