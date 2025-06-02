'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { ControlledSwitch } from '@/components/forms/controlled-switch/ControlledSwitch'
import { FormButtons } from '@/components/forms/form-buttons/FormButtons'
import { FormProvider } from '@/components/forms/form-provider'
import { ProductType } from '@/services/swr/models/product-type.type'

interface ProductFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  handleChange: (value: 'corporateProductOnly' | 'consumerProductOnly') => void
  errorMessageInputType?: string
  isSubmitting: boolean
}

export default function ProductForm({
  methods,
  onSubmit,
  handleChange,
  errorMessageInputType,
  isSubmitting,
}: ProductFormProps) {
  const t = useTranslations('dataManagement.products')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledInput
              label={t('name')}
              name="name"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />
            <ControlledInput
              label={t('description')}
              name="description"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />
            <ControlledSelect<ProductType>
              label={t('type')}
              name="productTypeId"
              containerClass="mb-3"
              apiPath="products/types"
              option={{ label: row => row.productType, value: row => row.id }}
              isRequired
            />
            <div className="d-flex gap-3">
              <ControlledSwitch
                type="radio"
                label={t('corporateProductOnly')}
                name="inputType"
                containerClass="mb-3"
                value={'corporateProductOnly'}
                onChange={() => handleChange('corporateProductOnly')}
              />
              <ControlledSwitch
                type="radio"
                label={t('consumerProductOnly')}
                name="inputType"
                containerClass="mb-3"
                value={'consumerProductOnly'}
                onChange={() => handleChange('consumerProductOnly')}
              />
            </div>
            {errorMessageInputType && (
              <div className="invalid-feedback d-block mt-0">{errorMessageInputType}</div>
            )}

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
