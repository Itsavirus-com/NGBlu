'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useResponsibilityForm from '../_hooks/responsibility-form.hook'

export default function NewPersonResponsibility() {
  const t = useTranslations('dataManagement.personResponsibilities')

  const { methods, onSubmit } = useResponsibilityForm()

  return (
    <>
      <PageTitle title={t('newPersonResponsibility')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('responsibility')}
                name="responsibility"
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
