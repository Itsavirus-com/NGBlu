'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { ProductType } from '@/services/swr/models/product-type.type'

import useProductForm from '../../components/product-form.hook'

export default function UpdateProduct({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.products')

  const { methods, onSubmit } = useProductForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateProduct')} />

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
              <ControlledInput
                label={t('description')}
                name="description"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledSelect<ProductType>
                label={t('type')}
                name="productTypeId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="products/types"
                option={{ label: row => row.productType, value: row => row.id }}
              />
              <ControlledSwitch label={t('corporateProductOnly')} name="corporateProductOnly" />
              <ControlledSwitch label={t('consumerProductOnly')} name="consumerProductOnly" />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
