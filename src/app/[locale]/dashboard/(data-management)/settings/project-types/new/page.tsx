'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useProjectTypeForm from '../components/project-type-form.hook'
import ProjectTypeForm from '../components/ProjectTypeForm'

export default function NewProjectType() {
  const t = useTranslations('dataManagement.projects.types')
  const { methods, onSubmit } = useProjectTypeForm()

  return (
    <>
      <PageTitle title={t('newProjectType')} />
      <ProjectTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
