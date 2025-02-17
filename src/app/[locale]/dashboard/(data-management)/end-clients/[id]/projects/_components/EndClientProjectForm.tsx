'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { Project } from '@/services/swr/models/project.type'

interface EndClientProjectFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
}

export default function EndClientProjectForm({ methods, onSubmit }: EndClientProjectFormProps) {
  const t = useTranslations('dataManagement.endClients.projects')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<Project>
              label={t('project')}
              name="projectId"
              containerClass="mb-3"
              apiPath="projects"
              option={{ label: row => row.projectName, value: row => row.id }}
              isRequired
            />

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
