'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'
import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { ControlledSwitch } from '@/components/forms/controlled-switch/ControlledSwitch'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'
import { Address } from '@/services/swr/models/address.type'
import { BusinessPartner } from '@/services/swr/models/business-partner.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { EnterpriseRoot } from '@/services/swr/models/enterprise-root.type'

interface OrganizationUnitFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  handleChange: (value: 'endclientId' | 'businesspartnerId' | 'enterpriseRootId') => void
  errorMessageInputType?: string
  isSubmitting: boolean
}

export default function OrganizationUnitForm({
  methods,
  onSubmit,
  handleChange,
  errorMessageInputType,
  isSubmitting,
}: OrganizationUnitFormProps) {
  const t = useTranslations('dataManagement.organizationUnits')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledInput
              label={t('name')}
              name="name"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />
            <ControlledSelect<Address>
              label={t('primaryAddress')}
              name="primaryAddressId"
              containerClass="mb-3"
              apiPath="addresses"
              option={{ label: row => row.addressName, value: row => row.id }}
            />
            <div className="d-flex gap-3">
              <ControlledSwitch
                type="radio"
                label={t('endClient')}
                name="inputType"
                containerClass="mb-3"
                value={'endclientId'}
                onChange={() => handleChange('endclientId')}
              />
              <ControlledSwitch
                type="radio"
                label={t('businessPartner')}
                name="inputType"
                containerClass="mb-3"
                value={'businesspartnerId'}
                onChange={() => handleChange('businesspartnerId')}
              />
              <ControlledSwitch
                type="radio"
                label={t('enterpriseRoot')}
                name="inputType"
                containerClass="mb-3"
                value={'enterpriseRootId'}
                onChange={() => handleChange('enterpriseRootId')}
              />
            </div>
            {errorMessageInputType && (
              <div className="invalid-feedback d-block mt-0">{errorMessageInputType}</div>
            )}

            {methods.watch('inputType') === 'endclientId' && (
              <ControlledSelect<EndClient>
                label={t('endClient')}
                name="endclientId"
                containerClass="mb-3"
                apiPath="end-clients"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
            )}
            {methods.watch('inputType') === 'businesspartnerId' && (
              <ControlledSelect<BusinessPartner>
                label={t('businessPartner')}
                name="businesspartnerId"
                containerClass="mb-3"
                apiPath="business-partners"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
            )}
            {(methods.watch('inputType') === 'enterpriseRootId' ||
              methods.watch('inputType') === 'endclientId') && (
              <ControlledSelect<EnterpriseRoot>
                label={t('enterpriseRoot')}
                name="enterpriseRootId"
                containerClass="mb-3"
                apiPath="enterprise-roots"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
            )}
            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
