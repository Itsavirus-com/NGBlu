'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, Form } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { PriceConfig } from '@/services/swr/models/price-config.type'
import { Product } from '@/services/swr/models/product.type'
import { Service } from '@/services/swr/models/service.type'

import usePricePlanForm from '../../_hooks/price-plan-form.hook'

export default function NewPriceConfig({ params }: { params: { planId: number } }) {
  const t = useTranslations('dataManagement.prices.plans')

  const { methods, inputType, handleChange, onSubmit } = usePricePlanForm(Number(params?.planId))

  return (
    <>
      <PageTitle title={t('updatePricePlan')} />

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
              {inputType === 'productId' && (
                <ControlledSelect<Product>
                  label={t('product')}
                  name="productId"
                  containerClass="mb-3"
                  className="form-select"
                  apiPath="products"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
              )}
              {inputType === 'serviceId' && (
                <ControlledSelect<Service>
                  label={t('service')}
                  name="serviceId"
                  containerClass="mb-3"
                  className="form-select"
                  apiPath="services"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
              )}
              <ControlledSelect<PriceConfig>
                label={t('priceConfig')}
                name="priceConfigId"
                containerClass="mb-3"
                className="form-select"
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
                className="form-select"
                apiPath="prices/configs"
                option={{
                  label: row => `${row.priceCurrency.currency} ${row.priceValue}`,
                  value: row => row.id,
                }}
              />

              <ControlledSwitch label={t('default')} name="isDefault" containerClass="mb-3" />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
