'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { ControlledSwitch } from '@/components/forms/controlled-switch/ControlledSwitch'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'
import { AddressType } from '@/services/swr/models/address-type.type'
import { Address } from '@/services/swr/models/address.type'

interface EndClientAddressFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export default function EndClientAddressForm({
  methods,
  onSubmit,
  isSubmitting,
}: EndClientAddressFormProps) {
  const t = useTranslations('dataManagement.endClients.addresses')

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
              apiPath="addresses/types"
              option={{ label: row => row.addressType, value: row => row.id }}
              isRequired
            />
            <ControlledSwitch label={t('primaryAddress')} name="isPrimaryLocation" />

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
