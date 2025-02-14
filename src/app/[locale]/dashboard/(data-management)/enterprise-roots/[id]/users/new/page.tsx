'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { EnterpriseRootUserForm } from '../../_components/EnterpriseRootUserForm'
import useEnterpriseRootUserForm from '../../_hooks/enterprise-root-user-form.hook'

export default function NewEnterpriseRootUser({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.enterpriseRoots.users')

  const { methods, onSubmit } = useEnterpriseRootUserForm()

  return (
    <>
      <PageTitle title={t('newUser')} />
      <EnterpriseRootUserForm enterpriseRootId={params.id} methods={methods} onSubmit={onSubmit} />
    </>
  )
}
