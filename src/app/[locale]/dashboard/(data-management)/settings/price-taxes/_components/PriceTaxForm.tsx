'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'
import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'
import { Country } from '@/services/swr/models/country.type'
import { PriceUnit } from '@/services/swr/models/price-unit.type'

interface PriceTaxFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export default function PriceTaxForm({ methods, onSubmit, isSubmitting }: PriceTaxFormProps) {
  const t = useTranslations('dataManagement.prices.taxes')

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
              label={t('tax')}
              name="taxValue"
              containerClass="mb-3"
              className="form-control-solid"
              type="number"
              step={0.0001}
              isRequired
            />
            <ControlledSelect<PriceUnit>
              label={t('priceType')}
              name="priceTypeId"
              containerClass="mb-3"
              apiPath="prices/types"
              option={{ label: row => row.type, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<Country>
              label={t('country')}
              name="countryId"
              containerClass="mb-3"
              apiPath="countries"
              option={{ label: row => row.name, value: row => row.id }}
              isRequired
            />

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
