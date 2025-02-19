'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { Address } from '@/services/swr/models/address.type'

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
            <ControlledSelect<Address>
              label={t('address')}
              name="addressId"
              containerClass="mb-3"
              apiPath={'addresses'}
              option={{ label: row => row.addressName, value: row => row.id }}
              isRequired
            />
            <ControlledSwitch label={t('primaryAddress')} name="isPrimaryLocation" />

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
