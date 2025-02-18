'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { Address } from '@/services/swr/models/address.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

interface BusinessPartnerCustomerFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  id: number
}

export default function BusinessPartnerCustomerForm({
  methods,
  onSubmit,
  id,
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

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
