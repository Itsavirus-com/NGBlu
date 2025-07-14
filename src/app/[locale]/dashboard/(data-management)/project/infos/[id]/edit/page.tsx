'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ProjectInfoForm from '../../_components/ProjectInfoForm'
import useProjectInfoForm from '../../_hooks/project-info-form.hook'

export default function UpdateProjectInfo({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.projects.infos')
  const { methods, onSubmit, isSubmitting } = useProjectInfoForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateProjectInfo')} />
      <ProjectInfoForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
