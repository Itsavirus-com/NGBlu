'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import useProjectInfoForm from '../../_hooks/project-info-form.hook'

export default function UpdateProjectInfo({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.projects.infos')

  const { methods, onSubmit, isLoading } = useProjectInfoForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateProjectInfo')} />
      {isLoading ? (
        <Loading />
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="app-container container-fluid">
            <Card>
              <CardBody>
                <ControlledInput
                  label={t('projectInfo')}
                  name="projectInfo"
                  containerClass="mb-3"
                  className="form-control-solid"
                  isRequired
                  inputType="textarea"
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
