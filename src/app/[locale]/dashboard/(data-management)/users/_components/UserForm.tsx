'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, FormLabel } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'

interface UserFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  blockUser?: (checked: boolean) => void
  isEdit?: boolean
  isSubmitting: boolean
  errorMessageInputType?: string
}

export default function UserForm({
  methods,
  onSubmit,
  blockUser,
  isEdit,
  isSubmitting,
  errorMessageInputType,
}: UserFormProps) {
  const t = useTranslations('dataManagement.users')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledInput
              label={t('firstName')}
              name="firstname"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />
            <ControlledInput
              label={t('lastName')}
              name="lastname"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />
            <ControlledInput
              label={t('phoneNumber')}
              name="phoneNumber"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />
            <ControlledInput
              label={t('email')}
              name="email"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />
            <ControlledSelect
              label={t('roles')}
              name="roles"
              containerClass="mb-3"
              apiPath="users/roles"
              option={{ label: role => role, value: role => role }}
              isRequired
              haveDetailOptions={false}
              isMulti
            />

            <FormLabel className="fw-bold">
              {t('invitationMethod')} <span className="text-danger">*</span>
            </FormLabel>
            <div className="d-flex gap-3">
              <ControlledSwitch
                type="radio"
                label={t('manual')}
                name="invitationMethod"
                containerClass="mb-3"
                value={'manual'}
              />
              <ControlledSwitch
                type="radio"
                label={t('entra')}
                name="invitationMethod"
                containerClass="mb-3"
                value={'entra'}
              />
            </div>
            {errorMessageInputType && (
              <div className="invalid-feedback d-block mt-0">{errorMessageInputType}</div>
            )}
            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
