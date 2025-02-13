'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { Country } from '@/services/swr/models/country.type'
import { PriceUnit } from '@/services/swr/models/price-unit.type'

interface PriceTaxFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function PriceTaxForm({ methods, onSubmit }: PriceTaxFormProps) {
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
              label={t('priceUnit')}
              name="priceUnitId"
              containerClass="mb-3"
              apiPath="prices/units"
              option={{ label: row => row.unit, value: row => row.id }}
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

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
