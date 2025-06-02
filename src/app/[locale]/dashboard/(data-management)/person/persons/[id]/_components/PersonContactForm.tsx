'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { ControlledSwitch } from '@/components/forms/controlled-switch/ControlledSwitch'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'
import { ContactType } from '@/services/swr/models/contact-type.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

interface PersonContactFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  handleChange: (value: 'endclientId' | 'businesspartnerId' | 'enterpriseRootId') => void
  isSubmitting: boolean
  handleFilterOrganizationUnit: () => Record<string, any> | undefined
}

export function PersonContactForm({
  methods,
  onSubmit,
  handleChange,
  isSubmitting,
  handleFilterOrganizationUnit,
}: PersonContactFormProps) {
  const t = useTranslations('dataManagement.persons.contacts')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledInput
              label={t('contact')}
              name="contactInfo"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />
            <ControlledSelect<ContactType>
              label={t('contactType')}
              name="contactTypeId"
              containerClass="mb-3"
              apiPath="contacts/types"
              option={{ label: row => row.contactType, value: row => row.id }}
              isRequired
            />

            <div className="d-flex gap-3">
              <ControlledSwitch
                type="radio"
                label={t('enterpriseRoot')}
                name="inputType"
                containerClass="mb-3"
                value="enterpriseRootId"
                onChange={() => handleChange('enterpriseRootId')}
              />
              <ControlledSwitch
                type="radio"
                label={t('businesspartner')}
                name="inputType"
                containerClass="mb-3"
                value="businesspartnerId"
                onChange={() => handleChange('businesspartnerId')}
              />
              <ControlledSwitch
                type="radio"
                label={t('endclient')}
                name="inputType"
                containerClass="mb-3"
                value="endclientId"
                onChange={() => handleChange('endclientId')}
              />
            </div>

            {methods.watch('inputType') === 'businesspartnerId' && (
              <ControlledSelect
                label={t('businesspartner')}
                name="businesspartnerId"
                containerClass="mb-3"
                apiPath="business-partners"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
            )}
            {methods.watch('inputType') === 'endclientId' && (
              <ControlledSelect
                label={t('endclient')}
                name="endclientId"
                containerClass="mb-3"
                apiPath="end-clients"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
            )}
            {!!methods.watch('inputType') && (
              <ControlledSelect
                label={t('enterpriseRoot')}
                name="enterpriseRootId"
                containerClass="mb-3"
                apiPath="enterprise-roots"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
            )}
            {!!methods.watch('inputType') && (
              <ControlledSelect<OrganizationUnit>
                label={t('organizationUnit')}
                name="ouUnitId"
                containerClass="mb-3"
                apiPath="organisational-units"
                filter={handleFilterOrganizationUnit()}
                option={{ label: row => row.name, value: row => row.id }}
                disabled={!handleFilterOrganizationUnit()}
                isHidden
              />
            )}
            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
