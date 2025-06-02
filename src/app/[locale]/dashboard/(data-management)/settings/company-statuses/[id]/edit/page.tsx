'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import CompanyStatusForm from '../../_components/CompanyStatusForm'
import useCompanyStatusForm from '../../_hooks/company-status-form.hook'

export default function UpdateCompanyStatus({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.companyStatuses')
  const { methods, onSubmit, isSubmitting, isLoading } = useCompanyStatusForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateCompanyStatus')} />
      {isLoading ? (
        <Loading />
      ) : (
        <CompanyStatusForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
