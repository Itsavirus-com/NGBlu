'use client'

import { useTranslations } from 'next-intl'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { Page } from '@/components/page/page'

import useAccountProfileSettings from './_hooks/account-profile-settings.hook'

export default function AccountSettings() {
  const t = useTranslations('account')
  const { methods, onSubmit, isSubmitting } = useAccountProfileSettings()

  return (
    <Page title={t('accountSettings')} description={t('manageYourAccount')}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="row mb-6">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">{t('personalInformation')}</span>
                  <span className="text-muted mt-1 fw-semibold fs-7">
                    {t('updatePersonalDetails')}
                  </span>
                </h3>
              </div>
              <div className="card-body">
                <div className="row mb-6">
                  <div className="col-md-6">
                    <ControlledInput
                      name="firstName"
                      label={t('firstName')}
                      isRequired
                      containerClass="mb-4"
                    />
                  </div>
                  <div className="col-md-6">
                    <ControlledInput
                      name="lastName"
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
          </div>
        </div>

        <div className="row mb-6">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">{t('accountInformation')}</span>
                  <span className="text-muted mt-1 fw-semibold fs-7">
                    {t('accountDetailsAndRole')}
                  </span>
                </h3>
              </div>
              <div className="card-body">
                <div className="row mb-6">
                  <div className="col-md-12">
                    <ControlledInput
                      name="email"
                      label={t('emailAddress')}
                      type="email"
                      disabled
                      containerClass="mb-4"
                    />
                    <div className="text-muted fs-7 mb-6">{t('contactSupportToChangeEmail')}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <ControlledInput name="role" label={t('role')} disabled containerClass="mb-4" />
                    <div className="text-muted fs-7">{t('rolePermissionsInfo')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FormButtons isSubmitting={isSubmitting} />
      </FormProvider>
    </Page>
  )
}
