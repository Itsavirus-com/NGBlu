'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { AddressType } from '@/services/swr/models/address-type.type'
import { Address } from '@/services/swr/models/address.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

interface BusinessPartnerAddressFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  id: number
}

export default function BusinessPartnerAddressForm({
  methods,
  onSubmit,
  id,
}: BusinessPartnerAddressFormProps) {
  const t = useTranslations('dataManagement.businessPartners.addresses')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<Address>
              label={t('address')}
              name="addressId"
              containerClass="mb-3"
              apiPath={'addresses'}
              option={{ label: row => row.addressName, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<AddressType>
              label={t('addressType')}
              name="addressTypeId"
              containerClass="mb-3"
              apiPath={'addresses/types'}
              option={{ label: row => row.addressType, value: row => row.id }}
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
