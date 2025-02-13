'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useProjectTypeForm from '../../components/project-type-form.hook'
import ProjectTypeForm from '../../components/ProjectTypeForm'

export default function UpdateProjectType({ params }: { params: { typeId: string } }) {
  const t = useTranslations('dataManagement.projects.types')
  const { methods, onSubmit } = useProjectTypeForm(Number(params.typeId))

  return (
    <>
      <PageTitle title={t('updateProjectType')} />
      <ProjectTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
