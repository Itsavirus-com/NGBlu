'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import usePackageTypeForm from '../../components/package-type-form.hook'

export default function UpdateCompanyStatus() {
  const { typeId } = useParams()
  const t = useTranslations('dataManagement.packages.types')

  const { methods, onSubmit } = usePackageTypeForm(Number(typeId))

  return (
    <>
      <PageTitle title={t('updatePackageType')} />

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
