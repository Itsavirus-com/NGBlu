'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'

interface AddressTypeFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function AddressTypeForm({ methods, onSubmit }: AddressTypeFormProps) {
  const t = useTranslations('dataManagement.addressTypes')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledInput
              label={t('addressType')}
              name="addressType"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
