'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'

interface CountryFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function CountryForm({ methods, onSubmit }: CountryFormProps) {
  const t = useTranslations('dataManagement.countries')

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
            <ControlledInput
              label={t('currency')}
              name="currency"
              containerClass="mb-3"
              className="form-control-solid"
            />
            <ControlledInput
              label={t('locale')}
              name="locale"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />
            <ControlledInput
              label={t('decimalSymbol')}
              name="decimalSymbol"
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
