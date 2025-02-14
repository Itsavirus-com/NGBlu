'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EnterpriseRootForm from '../_components/EnterpriseRootForm'
import useEnterpriseRootForm from '../_hooks/enterprise-root-form.hook'

export default function NewEnterpriseRoot() {
  const t = useTranslations('dataManagement.enterpriseRoots')
  const { methods, onSubmit } = useEnterpriseRootForm()

  return (
    <>
      <PageTitle title={t('newEnterpriseRoot')} />
      <EnterpriseRootForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
