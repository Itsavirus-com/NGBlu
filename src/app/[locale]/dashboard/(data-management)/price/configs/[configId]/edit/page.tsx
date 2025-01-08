'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'
import { PriceCurrency } from '@/services/swr/models/price-currency.type'
import { PriceInterval } from '@/services/swr/models/price-interval.type'
import { PriceTax } from '@/services/swr/models/price-tax.type'
import { PriceType } from '@/services/swr/models/price-type.type'
import { PriceUnit } from '@/services/swr/models/price-unit.type'

import usePriceConfigForm from '../../_hooks/price-config-form.hook'

export default function UpdatePriceConfig({ params }: { params: { configId: number } }) {
  const t = useTranslations('dataManagement.prices.configs')

  const { methods, onSubmit, isLoading } = usePriceConfigForm(Number(params.configId))

  return (
    <>
      <PageTitle title={t('updatePriceConfig')} />
      {isLoading ? (
        <Loading />
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="app-container container-fluid">
            <Card>
              <CardBody>
                <ControlledInput
                  label={t('price')}
                  name="priceValue"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                />
                <ControlledSelect<PriceUnit>
                  label={t('unit')}
                  name="priceUnitId"
                  containerClass="mb-3"
                  className="form-select"
                  apiPath="prices/units"
                  option={{ label: row => row.unit, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<PriceCurrency>
                  label={t('currency')}
                  name="priceCurrencyId"
                  containerClass="mb-3"
                  className="form-select"
                  apiPath="prices/currencies"
                  option={{ label: row => row.currency, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<PriceType>
                  label={t('type')}
                  name="priceTypeId"
                  containerClass="mb-3"
                  className="form-select"
                  apiPath="prices/types"
                  option={{ label: row => row.type, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<PriceInterval>
                  label={t('interval')}
                  name="priceIntervalId"
                  containerClass="mb-3"
                  className="form-select"
                  apiPath="prices/intervals"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<PriceTax>
                  label={t('tax')}
                  name="priceTaxId"
                  containerClass="mb-3"
                  className="form-select"
                  apiPath="prices/taxes"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />

                <FormButtons />
              </CardBody>
            </Card>
          </div>
        </FormProvider>
      )}
    </>
  )
}
