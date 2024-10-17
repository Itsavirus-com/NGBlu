'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Package } from '@/services/swr/models/package.type'
import { Product, ProductPriceConfig } from '@/services/swr/models/product.type'

import usePackageProductForm from '../../component/package-product-form.hook'

export default function UpdatePackageProduct() {
  const { productId } = useParams()

  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit } = usePackageProductForm(Number(productId))

  return (
    <>
      <PageTitle title={t('newPackageProduct')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledSelect<Package>
                label={t('package')}
                name="packageId"
                filterName="id"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="packages"
                option={{ label: row => row.name, value: row => row.id }}
                disabled
              />
              <ControlledSelect<Product>
                label={t('product')}
                name="productId"
                filterName="id"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="products"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect<ProductPriceConfig>
                label={t('productPricingConfig')}
                name="productPricingConfigId"
                filterName="id"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="products/price-configs"
                option={{ label: row => row.pricePlan.name, value: row => row.id }}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
