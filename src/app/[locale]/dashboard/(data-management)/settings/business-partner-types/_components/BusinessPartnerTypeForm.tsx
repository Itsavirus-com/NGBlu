'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'

interface BusinessPartnerTypeFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export default function BusinessPartnerTypeForm({
  methods,
  onSubmit,
  isSubmitting,
}: BusinessPartnerTypeFormProps) {
  const t = useTranslations('dataManagement.businessPartnerTypes')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledInput
              label={t('type')}
              name="name"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
