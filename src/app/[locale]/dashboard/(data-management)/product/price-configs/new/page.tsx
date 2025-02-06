'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { ControlledDatetime } from '@/components/forms/datetime'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { PricePlan } from '@/services/swr/models/price-plan.type'
import { Product } from '@/services/swr/models/product.type'

import useProductPriceConfigForm from '../_hooks/product-price-configs-form.hook'

export default function NewProductPriceConfig() {
  const t = useTranslations('dataManagement.products.priceConfig')
  const {
    methods,
    formDateValue,
    handleChange,
    setFormDateValue,
    onSubmit,
    errorMessageInputType,
  } = useProductPriceConfigForm()

  return (
    <>
      <PageTitle title={t('newPriceConfig')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <div className="d-flex gap-3 mb-3">
                <ControlledDatetime
                  name="activeFromDate"
                  label={t('activeFromDate')}
                  enableTime={false}
                  onChange={([date]: any) => setFormDateValue(date)}
                  className="form-control-solid"
                />
                <ControlledDatetime
                  name="activeFromTime"
                  label={t('activeFromTime')}
                  options={{
                    noCalendar: true,
                    enableTime: true,
                    dateFormat: 'H:i',
                    time_24hr: true,
                  }}
                  className="form-control-solid"
                />
              </div>

              <div className="d-flex gap-3 mb-3">
                <ControlledDatetime
                  name="activeToDate"
                  label={t('activeToDate')}
                  enableTime={false}
                  options={{
                    minDate: formDateValue,
                  }}
                  className="form-control-solid"
                />
                <ControlledDatetime
                  name="activeToTime"
                  label={t('activeToTime')}
                  options={{
                    noCalendar: true,
                    enableTime: true,
                    dateFormat: 'H:i',
                    time_24hr: true,
                  }}
                  className="form-control-solid"
                />
              </div>

              <ControlledSelect<Product>
                label={t('product')}
                name="productId"
                containerClass="mb-3"
                apiPath="products"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
              <ControlledSelect<PricePlan>
                label={t('pricePlan')}
                name="priceplanId"
                containerClass="mb-3"
                apiPath="prices/plans"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
              <div className="d-flex gap-3">
                <ControlledSwitch
                  type="radio"
                  label={t('businessPartner')}
                  name="inputType"
                  containerClass="mb-3"
                  value={'businesspartnerId'}
                  onChange={() => handleChange('businesspartnerId')}
                />
                <ControlledSwitch
                  type="radio"
                  label={t('enterpriseRoot')}
                  name="inputType"
                  containerClass="mb-3"
                  value={'enterpriseRootId'}
                  onChange={() => handleChange('enterpriseRootId')}
                />
              </div>
              {methods.watch('inputType') === 'businesspartnerId' && (
                <ControlledSelect
                  label={t('businessPartner')}
                  name="businesspartnerId"
                  containerClass="mb-3"
                  apiPath="business-partners"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                  onChange={() => {
                    methods.setValue('orgUnitId', 0)
                  }}
                />
              )}
              {errorMessageInputType && (
                <div className="invalid-feedback d-block mt-0">{errorMessageInputType}</div>
              )}

              {methods.watch('inputType') === 'enterpriseRootId' && (
                <ControlledSelect
                  label={t('enterpriseRoot')}
                  name="enterpriseRootId"
                  containerClass="mb-3"
                  apiPath="enterprise-roots"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                  onChange={() => {
                    methods.setValue('orgUnitId', 0)
                  }}
                />
              )}
              {!!methods.watch('inputType') && (
                <ControlledSelect<OrganizationUnit>
                  label={t('orgUnit')}
                  name="orgUnitId"
                  containerClass="mb-3"
                  apiPath="organisational-units"
                  option={{ label: row => row.name, value: row => row.id }}
                  filter={
                    methods.watch('inputType') === 'enterpriseRootId'
                      ? {
                          [methods.watch('inputType')]: methods.watch('enterpriseRootId'),
                        }
                      : { [methods.watch('inputType')]: methods.watch('businesspartnerId') }
                  }
                  isHidden
                  disabled={
                    methods.watch('inputType') === 'enterpriseRootId'
                      ? !methods.watch('enterpriseRootId')
                      : !methods.watch('businesspartnerId')
                  }
                />
              )}
              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
