'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useProjectInfoForm from '../components/project-info-form.hook'

export default function NewProjectInfo() {
  const t = useTranslations('dataManagement.projects.infos')

  const { methods, onSubmit } = useProjectInfoForm()

  return (
    <>
      <PageTitle title={t('newProjectInfo')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('projectInfo')}
                name="projectInfo"
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
