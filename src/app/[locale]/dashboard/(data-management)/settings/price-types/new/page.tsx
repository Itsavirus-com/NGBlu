'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import usePriceTypeForm from '../components/price-type-form.hook'

export default function NewPriceType() {
  const t = useTranslations('dataManagement.prices.types')

  const { methods, onSubmit } = usePriceTypeForm()

  return (
    <>
      <PageTitle title={t('newPriceType')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('type')}
                name="type"
                containerClass="mb-3"
                className="form-control-solid"
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
