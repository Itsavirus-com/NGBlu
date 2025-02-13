'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ProjectInfoForm from '../_components/ProjectInfoForm'
import useProjectInfoForm from '../_hooks/project-info-form.hook'

export default function NewProjectInfo() {
  const t = useTranslations('dataManagement.projects.infos')
  const { methods, onSubmit } = useProjectInfoForm()

  return (
    <>
      <PageTitle title={t('newProjectInfo')} />
      <ProjectInfoForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
