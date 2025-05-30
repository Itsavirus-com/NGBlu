'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'

interface PaymentTypeFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export default function PaymentTypeForm({ methods, onSubmit, isSubmitting }: PaymentTypeFormProps) {
  const t = useTranslations('dataManagement.paymentTypes')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledInput
              label={t('name')}
              name="paymentType"
              containerClass="mb-3"
              className="form-control-solid"
            />

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
