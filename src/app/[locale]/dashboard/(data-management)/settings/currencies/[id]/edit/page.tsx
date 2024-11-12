'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useCurrencyForm from '../../components/currency-form.hook'

export default function UpdateCurrency({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.prices.currencies')

  const { methods, onSubmit } = useCurrencyForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateCurrency')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('currency')}
                name="currency"
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
