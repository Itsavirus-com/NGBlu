'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useProductTypeForm from '../components/product-type-form.hook'

export default function NewProductType() {
  const t = useTranslations('dataManagement.products.types')

  const { methods, onSubmit } = useProductTypeForm()

  return (
    <>
      <PageTitle title={t('newProductType')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('type')}
                name="productType"
                containerClass="mb-3"
                className="form-control-solid"
                isRequired
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
