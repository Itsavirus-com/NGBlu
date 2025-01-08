'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useCreditCardTypeForm from '../../components/credit-card-type-form.hook'

export default function UpdateCreditCardType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.creditCardTypes')

  const { methods, onSubmit } = useCreditCardTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateCreditCardType')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('type')}
                name="creditcardType"
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
