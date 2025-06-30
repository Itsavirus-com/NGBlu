'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'
import { Address } from '@/services/swr/models/address.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

interface BusinessPartnerCustomerFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  id: number
  isSubmitting: boolean
}

export default function BusinessPartnerCustomerForm({
  methods,
  onSubmit,
  id,
  isSubmitting,
}: BusinessPartnerCustomerFormProps) {
  const t = useTranslations('dataManagement.businessPartners.customers')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<EndClient>
              label={t('endClient')}
              name="endclientId"
              containerClass="mb-3"
              apiPath={'end-clients'}
              option={{ label: row => row.name, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<Address>
              label={t('businessPartnerAddress')}
              name="businesspartnersAddressesId"
              containerClass="mb-3"
              apiPath={`addresses`}
              option={{ label: row => row.addressName, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<OrganizationUnit>
              label={t('organisationalUnit')}
              name="ouUnitId"
              containerClass="mb-3"
              apiPath={'organisational-units'}
              option={{ label: row => row.name, value: row => row.id }}
              filter={{
                businesspartnerId: id,
              }}
            />

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
