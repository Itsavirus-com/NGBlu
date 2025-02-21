'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PriceCurrency } from '@/services/swr/models/price-currency.type'
import { PriceInterval } from '@/services/swr/models/price-interval.type'
import { PriceTax } from '@/services/swr/models/price-tax.type'
import { PriceType } from '@/services/swr/models/price-type.type'
import { PriceUnit } from '@/services/swr/models/price-unit.type'

interface PriceConfigFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export default function PriceConfigForm({ methods, onSubmit, isSubmitting }: PriceConfigFormProps) {
  const t = useTranslations('dataManagement.prices.configs')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <Row>
              <Col>
                <ControlledInput
                  label={t('decimalValue')}
                  name="priceValue"
                  containerClass="mb-3"
                  className="form-control-solid"
                  type="number"
                  step={0.0001}
                  isRequired
                />
                <ControlledSelect<PriceInterval>
                  label={t('interval')}
                  name="priceIntervalId"
                  containerClass="mb-3"
                  apiPath="prices/intervals"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
              </Col>
              <Col>
                <ControlledSelect<PriceCurrency>
                  label={t('currency')}
                  name="priceCurrencyId"
                  containerClass="mb-3"
                  apiPath="prices/currencies"
                  option={{ label: row => row.currency, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<PriceTax>
                  label={t('tax')}
                  name="priceTaxId"
                  containerClass="mb-3"
                  apiPath="prices/taxes"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
              </Col>
              <Col>
                <ControlledSelect<PriceType>
                  label={t('type')}
                  name="priceTypeId"
                  containerClass="mb-3"
                  apiPath="prices/types"
                  option={{ label: row => row.type, value: row => row.id }}
                  isRequired
                />
                <ControlledSelect<PriceUnit>
                  label={t('unit')}
                  name="priceUnitId"
                  containerClass="mb-3"
                  apiPath="prices/units"
                  option={{ label: row => row.unit, value: row => row.id }}
                  isRequired
                />
              </Col>
            </Row>

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
