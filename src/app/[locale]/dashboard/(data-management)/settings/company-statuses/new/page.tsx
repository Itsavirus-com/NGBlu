'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import CompanyStatusForm from '../_components/CompanyStatusForm'
import useCompanyStatusForm from '../_hooks/company-status-form.hook'

export default function NewCompanyStatus() {
  const t = useTranslations('dataManagement.companyStatuses')
  const { methods, onSubmit, isSubmitting } = useCompanyStatusForm()

  return (
    <>
      <PageTitle title={t('newCompanyStatus')} />
      <CompanyStatusForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
