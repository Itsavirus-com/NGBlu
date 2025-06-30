'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
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
    isLoading,
    errorMessageInputType,
    isSubmitting,
  } = useProjectForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateProject')} />
      {isLoading ? (
        <Loading />
      ) : (
        <ProjectForm
          methods={methods}
          onSubmit={onSubmit}
          handleChange={handleChange}
          handleFilterOrganizationUnit={handleFilterOrganizationUnit}
          errorMessageInputType={errorMessageInputType}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
