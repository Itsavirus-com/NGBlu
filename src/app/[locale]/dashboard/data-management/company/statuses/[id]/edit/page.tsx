'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useCompanyStatusForm from '../../components/company-status-form.hook'

export default function UpdateCompanyStatus({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.companyStatuses')

  const { methods, onSubmit } = useCompanyStatusForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateCompanyStatus')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('status')}
                name="status"
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
