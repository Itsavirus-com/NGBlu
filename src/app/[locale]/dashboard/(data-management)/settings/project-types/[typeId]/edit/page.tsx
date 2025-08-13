'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ProjectTypeForm from '../../_components/ProjectTypeForm'
import useProjectTypeForm from '../../_hooks/project-type-form.hook'

export default function UpdateProjectType({ params }: { params: { typeId: string } }) {
  const t = useTranslations('dataManagement.projects.types')
  const { methods, onSubmit, isSubmitting } = useProjectTypeForm(Number(params.typeId))

  return (
    <>
      <PageTitle title={t('updateProjectType')} />
      <ProjectTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
