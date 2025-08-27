'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { EnterpriseRootUserForm } from '../../../_components/EnterpriseRootUserForm'
import useEnterpriseRootUserForm from '../../../_hooks/enterprise-root-user-form.hook'

export default function UpdateEnterpriseRootUser({
  params,
}: {
  params: { id: number; userId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.users')

  const { methods, onSubmit, isSubmitting } = useEnterpriseRootUserForm(params.userId)

  return (
    <>
      <PageTitle title={t('updateUser')} />
      <EnterpriseRootUserForm
        enterpriseRootId={params.id}
        methods={methods}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
