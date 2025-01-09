'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import useResponsibilityForm from '../../_hooks/responsibility-form.hook'

export default function UpdatePersonResponsibility({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.personResponsibilities')

  const { methods, onSubmit, isLoading } = useResponsibilityForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePersonResponsibility')} />
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </>
  )
}
