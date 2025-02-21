'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'

interface PackageTypeFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export default function PackageTypeForm({ methods, onSubmit, isSubmitting }: PackageTypeFormProps) {
  const t = useTranslations('dataManagement.packages.types')

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

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
