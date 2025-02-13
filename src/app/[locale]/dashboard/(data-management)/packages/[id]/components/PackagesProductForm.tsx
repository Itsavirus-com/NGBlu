'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { Package } from '@/services/swr/models/package.type'
import { Product, ProductPriceConfig } from '@/services/swr/models/product.type'

interface PackageProductFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export function PackageProductForm({ methods, onSubmit }: PackageProductFormProps) {
  const t = useTranslations('dataManagement.packages')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<Package>
              label={t('package')}
              name="packageId"
              filterName="id"
              containerClass="mb-3"
              apiPath="packages"
              option={{ label: row => row.name, value: row => row.id }}
              disabled
              isRequired
            />
            <ControlledSelect<Product>
              label={t('product')}
              name="productId"
              filterName="id"
              containerClass="mb-3"
              apiPath="products"
              option={{ label: row => row.name, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<ProductPriceConfig>
              label={t('productPricingConfig')}
              name="productPricingConfigId"
              filterName="id"
              containerClass="mb-3"
              apiPath="products/price-configs"
              option={{ label: row => row.pricePlan.name, value: row => row.id }}
              isRequired
            />
            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
