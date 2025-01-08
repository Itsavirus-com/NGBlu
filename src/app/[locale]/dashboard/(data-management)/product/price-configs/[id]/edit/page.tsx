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

import useProductPriceConfigForm from '../../_hooks/product-price-configs-form.hook'

export default function UpdateProductPriceConfig({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.products.priceConfig')

  const {
    methods,
    formDateValue,
    inputType,
    enterpriseRootId,
    businessPartnerId,
    handleChange,
    setFormDateValue,
    onSubmit,
  } = useProductPriceConfigForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePriceConfig')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledDatetime
                label={t('activeFrom')}
                name="activeFrom"
                containerClass="mb-3"
                className="form-control-solid"
                onChange={([date]: any) => setFormDateValue(date)}
              />
              <ControlledDatetime
                label={t('activeTo')}
                name="activeTo"
                containerClass="mb-3"
                className="form-control-solid"
                disabled={formDateValue === null}
                options={{
                  minDate: formDateValue,
                }}
              />
              <ControlledSelect<Product>
                label={t('product')}
                name="productId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="products"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
              <ControlledSelect<PricePlan>
                label={t('pricePlan')}
                name="priceplanId"
                containerClass="mb-3"
                className="form-control-solid"
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
              {inputType === 'businesspartnerId' && (
                <ControlledSelect
                  label={t('businessPartner')}
                  name="businesspartnerId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="business-partners"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
              )}
              {inputType === 'enterpriseRootId' && (
                <ControlledSelect
                  label={t('enterpriseRoot')}
                  name="enterpriseRootId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="enterprise-roots"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
              )}
              {!!inputType && (
                <ControlledSelect<OrganizationUnit>
                  label={t('orgUnit')}
                  name="orgUnitId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="organisational-units"
                  option={{ label: row => row.name, value: row => row.id }}
                  filter={
                    inputType && enterpriseRootId
                      ? {
                          [inputType]: enterpriseRootId,
                        }
                      : { [inputType]: businessPartnerId }
                  }
                  isHidden
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
