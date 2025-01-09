'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useCreditCardBrandForm from '../components/credit-card-brand-form.hook'

export default function NewCreditCardBrand() {
  const t = useTranslations('dataManagement.creditCardBrands')

  const { methods, onSubmit } = useCreditCardBrandForm()

  return (
    <>
      <PageTitle title={t('newCreditCardBrand')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('brand')}
                name="brandname"
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
