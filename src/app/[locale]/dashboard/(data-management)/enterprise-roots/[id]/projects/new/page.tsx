'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { EnterpriseRootProjectForm } from '../../_components/EnterpriseRootProjectForm'
import useEnterpriseRootProjectForm from '../../_hooks/enterprise-root-project-form.hook'

export default function NewEnterpriseRootProject({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.enterpriseRoots.projects')

  const { methods, onSubmit, isSubmitting } = useEnterpriseRootProjectForm()

  return (
    <>
      <PageTitle title={t('newProject')} />

      <EnterpriseRootProjectForm
        enterpriseRootId={params.id}
        methods={methods}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
