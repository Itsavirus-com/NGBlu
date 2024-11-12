'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useCountryForm from '../../components/country-form.hook'

export default function UpdateCountry({ params }: { params: { countryId: number } }) {
  const t = useTranslations('dataManagement.countries')

  const { methods, onSubmit } = useCountryForm(Number(params.countryId))

  return (
    <>
      <PageTitle title={t('updateCountry')} />

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
                label={t('currency')}
                name="currency"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('locale')}
                name="locale"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('decimalSymbol')}
                name="decimalSymbol"
                containerClass="mb-3"
                className="form-control-solid"
              />
              <ControlledInput
                label={t('iso')}
                name="iso"
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
