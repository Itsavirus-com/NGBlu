'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, Form } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { ControlledSwitch } from '@/components/forms/controlled-switch/ControlledSwitch'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'
import { PriceConfig } from '@/services/swr/models/price-config.type'
import { Product } from '@/services/swr/models/product.type'
import { Service } from '@/services/swr/models/service.type'

interface PricePlanFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  handleChange: (value: 'productId' | 'serviceId') => void
  isSubmitting: boolean
}

export default function PricePlanForm({
  methods,
  onSubmit,
  handleChange,
  isSubmitting,
}: PricePlanFormProps) {
  const t = useTranslations('dataManagement.prices.plans')

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
            <Form.Label className="fw-bold">Choose Product or Service</Form.Label>
            <div className="d-flex gap-3">
              <ControlledSwitch
                type="radio"
                label={t('product')}
                name="inputType"
                containerClass="mb-3"
                value="productId"
                onChange={() => handleChange('productId')}
              />
              <ControlledSwitch
                type="radio"
                label={t('service')}
                name="inputType"
                containerClass="mb-3"
                value="serviceId"
                onChange={() => handleChange('serviceId')}
              />
            </div>
            {methods.watch('inputType') === 'productId' && (
              <ControlledSelect<Product>
                label={t('product')}
                name="productId"
                containerClass="mb-3"
                apiPath="products"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
            )}
            {methods.watch('inputType') === 'serviceId' && (
              <ControlledSelect<Service>
                label={t('service')}
                name="serviceId"
                containerClass="mb-3"
                apiPath="services"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
            )}
            <ControlledSelect<PriceConfig>
              label={t('priceConfig')}
              name="priceConfigId"
              containerClass="mb-3"
              apiPath="prices/configs"
              option={{
                label: row => `${row.priceCurrency.currency} ${row.priceValue}`,
                value: row => row.id,
              }}
              isRequired
            />
            <ControlledSelect<PriceConfig>
              label={t('fallbackPriceConfig')}
              name="fallbackPriceConfigId"
              containerClass="mb-3"
              apiPath="prices/configs"
              option={{
                label: row => `${row.priceCurrency.currency} ${row.priceValue}`,
                value: row => row.id,
              }}
            />

            <ControlledSwitch label={t('default')} name="isDefault" containerClass="mb-3" />

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
