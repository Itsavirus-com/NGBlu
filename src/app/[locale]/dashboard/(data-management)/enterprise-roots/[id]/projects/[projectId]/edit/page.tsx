'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { EnterpriseRootProjectForm } from '../../../_components/EnterpriseRootProjectForm'
import useEnterpriseRootProjectForm from '../../../_hooks/enterprise-root-project-form.hook'

export default function UpdateEnterpriseRootProject({
  params,
}: {
  params: { id: number; projectId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.projects')

  const { methods, onSubmit } = useEnterpriseRootProjectForm(params.projectId)

  return (
    <>
      <PageTitle title={t('updateProject')} />
      <EnterpriseRootProjectForm
        enterpriseRootId={params.id}
        methods={methods}
        onSubmit={onSubmit}
      />
    </>
  )
}
