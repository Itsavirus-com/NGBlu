'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import usePriceIntervalForm from '../../components/price-interval-form.hook'

export default function UpdatePriceInterval({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.prices.intervals')

  const { methods, onSubmit } = usePriceIntervalForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePriceInterval')} />

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

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
