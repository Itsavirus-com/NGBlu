'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useResponsibilityForm from '../../components/responsibility-form.hook'

export default function UpdatePersonResponsibility() {
  const { id } = useParams()
  const t = useTranslations('dataManagement.personResponsibilities')

  const { methods, onSubmit } = useResponsibilityForm(Number(id))

  return (
    <>
      <PageTitle title={t('updatePersonResponsibility')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('responsibility')}
                name="responsibility"
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
