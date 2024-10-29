'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useServiceTypeForm from '../../components/service-type-form.hook'

export default function UpdateServiceType({ params }: { params: { typeId: string } }) {
  const t = useTranslations('dataManagement.services.types')

  const { methods, onSubmit } = useServiceTypeForm(Number(params.typeId))

  return (
    <>
      <PageTitle title={t('updateServiceType')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('type')}
                name="serviceType"
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
