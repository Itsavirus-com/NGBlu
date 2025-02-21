'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ProjectForm from '../_components/ProjectForm'
import useProjectForm from '../_hooks/project-form.hook'

export default function NewProjectType() {
  const t = useTranslations('dataManagement.projects')
  const {
    methods,
    handleChange,
    onSubmit,
    errorMessageInputType,
    handleFilterOrganizationUnit,
    isSubmitting,
  } = useProjectForm()

  return (
    <>
      <PageTitle title={t('newProject')} />
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
