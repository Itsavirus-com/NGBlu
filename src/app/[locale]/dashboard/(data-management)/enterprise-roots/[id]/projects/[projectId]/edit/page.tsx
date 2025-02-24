'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import { EnterpriseRootProjectForm } from '../../../_components/EnterpriseRootProjectForm'
import useEnterpriseRootProjectForm from '../../../_hooks/enterprise-root-project-form.hook'

export default function UpdateEnterpriseRootProject({
  params,
}: {
  params: { id: number; projectId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.projects')

  const { methods, onSubmit, isLoading, isSubmitting } = useEnterpriseRootProjectForm(
    params.projectId
  )

  return (
    <>
      <PageTitle title={t('updateProject')} />
      {isLoading ? (
        <Loading />
      ) : (
        <EnterpriseRootProjectForm
          enterpriseRootId={params.id}
          methods={methods}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
