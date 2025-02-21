'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import { EnterpriseRootUserForm } from '../../../_components/EnterpriseRootUserForm'
import useEnterpriseRootUserForm from '../../../_hooks/enterprise-root-user-form.hook'

export default function UpdateEnterpriseRootUser({
  params,
}: {
  params: { id: number; userId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.users')

  const { methods, onSubmit, isLoading, isSubmitting } = useEnterpriseRootUserForm(params.userId)

  return (
    <>
      <PageTitle title={t('updateUser')} />
      {isLoading ? (
        <Loading />
      ) : (
        <EnterpriseRootUserForm
          enterpriseRootId={params.id}
          methods={methods}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
