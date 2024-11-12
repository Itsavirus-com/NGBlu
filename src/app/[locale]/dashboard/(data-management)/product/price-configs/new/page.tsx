'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { PricePlan } from '@/services/swr/models/price-plan.type'
import { Product } from '@/services/swr/models/product.type'

import useProductPriceConfigForm from '../components/product-price-configs-form.hook'

export default function NewProductPriceConfig() {
  const t = useTranslations('dataManagement.products.priceConfig')

  const { methods, onSubmit } = useProductPriceConfigForm()

  return (
    <>
      <PageTitle title={t('newPriceConfig')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('activeFrom')}
                name="activeFrom"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('activeTo')}
                name="activeTo"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledSelect<Product>
                label={t('product')}
                name="productId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="products"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect<PricePlan>
                label={t('pricePlan')}
                name="priceplanId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="prices/plans"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect
                label={t('businessPartner')}
                name="businesspartnerId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="business-partners"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect
                label={t('enterpriseRoot')}
                name="enterpriseRootId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="enterprise-roots"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect<OrganizationUnit>
                label={t('orgUnit')}
                name="orgUnitId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="organisational-units"
                option={{ label: row => row.name, value: row => row.id }}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
