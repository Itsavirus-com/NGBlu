'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useBusinessPartnerTypeForm from '../../components/business-partner-type-form.hook'

export default function UpdateBusinessPartnerType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.businessPartnerTypes')

  const { methods, onSubmit } = useBusinessPartnerTypeForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateBusinessPartnerType')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('type')}
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
