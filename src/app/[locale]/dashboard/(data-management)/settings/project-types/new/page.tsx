'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ProjectTypeForm from '../_components/ProjectTypeForm'
import useProjectTypeForm from '../_hooks/project-type-form.hook'

export default function NewProjectType() {
  const t = useTranslations('dataManagement.projects.types')
  const { methods, onSubmit, isSubmitting } = useProjectTypeForm()

  return (
    <>
      <PageTitle title={t('newProjectType')} />
      <ProjectTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
