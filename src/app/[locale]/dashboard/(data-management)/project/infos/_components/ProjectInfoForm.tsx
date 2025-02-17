'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'

interface ProjectInfoFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function ProjectInfoForm({ methods, onSubmit }: ProjectInfoFormProps) {
  const t = useTranslations('dataManagement.projects.infos')

  return (
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
  )
}
