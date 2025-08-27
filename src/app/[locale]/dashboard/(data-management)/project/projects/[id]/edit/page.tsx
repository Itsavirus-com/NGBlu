'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ProjectForm from '../../_components/ProjectForm'
import useProjectForm from '../../_hooks/project-form.hook'

export default function UpdateProjectType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.projects')
  const {
    methods,
    handleChange,
    onSubmit,
    handleFilterOrganizationUnit,
    errorMessageInputType,
    isSubmitting,
  } = useProjectForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateProject')} />
      <ProjectForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        handleFilterOrganizationUnit={handleFilterOrganizationUnit}
        errorMessageInputType={errorMessageInputType}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
