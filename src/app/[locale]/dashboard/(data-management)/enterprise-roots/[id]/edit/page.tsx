'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import EnterpriseRootForm from '../../_components/EnterpriseRootForm'
import useEnterpriseRootForm from '../../_hooks/enterprise-root-form.hook'

export default function UpdateEnterpriseRoot({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.enterpriseRoots')

  const { methods, onSubmit, isLoading, isSubmitting } = useEnterpriseRootForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateEnterpriseRoot')} />
      {isLoading ? (
        <Loading />
      ) : (
        <EnterpriseRootForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
