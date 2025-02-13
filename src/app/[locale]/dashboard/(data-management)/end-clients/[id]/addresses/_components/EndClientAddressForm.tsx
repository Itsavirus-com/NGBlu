'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { AddressType } from '@/services/swr/models/address-type.type'

interface EndClientAddressFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function EndClientAddressForm({ methods, onSubmit }: EndClientAddressFormProps) {
  const t = useTranslations('dataManagement.endClients.addresses')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<AddressType>
              label={t('addressType')}
              name="addressTypeId"
              containerClass="mb-3"
              apiPath="addresses/types"
              option={{ label: row => row.addressType, value: row => row.id }}
              isRequired
            />
            <ControlledInput label={t('street')} name="street" containerClass="mb-3" isRequired />
            <ControlledInput
              label={t('houseNumber')}
              name="houseNumber"
              containerClass="mb-3"
              isRequired
            />
            <ControlledInput label={t('city')} name="city" containerClass="mb-3" isRequired />
            <ControlledInput
              label={t('postalCode')}
              name="postalCode"
              containerClass="mb-3"
              isRequired
            />
            <ControlledInput label={t('country')} name="country" containerClass="mb-3" isRequired />

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
