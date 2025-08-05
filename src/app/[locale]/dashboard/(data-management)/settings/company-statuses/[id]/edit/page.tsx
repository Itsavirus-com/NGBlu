'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import CompanyStatusForm from '../../_components/CompanyStatusForm'
import useCompanyStatusForm from '../../_hooks/company-status-form.hook'

export default function UpdateCompanyStatus({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.companyStatuses')
  const { methods, onSubmit, isSubmitting } = useCompanyStatusForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateCompanyStatus')} />
      <CompanyStatusForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
