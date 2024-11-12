'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { PriceConfig } from '@/services/swr/models/price-config.type'
import { Product } from '@/services/swr/models/product.type'
import { Service } from '@/services/swr/models/service.type'

import usePricePlanForm from '../components/price-plan-form.hook'

export default function NewPriceConfig() {
  const t = useTranslations('dataManagement.prices.plans')

  const { methods, onSubmit } = usePricePlanForm()

  return (
    <>
      <PageTitle title={t('newPricePlan')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('name')}
                name="name"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledSelect<Product>
                label={t('product')}
                name="productId"
                containerClass="mb-3"
                className="form-select"
                apiPath="products"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect<Service>
                label={t('service')}
                name="serviceId"
                containerClass="mb-3"
                className="form-select"
                apiPath="services"
                option={{ label: row => row.name, value: row => row.id }}
              />
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
