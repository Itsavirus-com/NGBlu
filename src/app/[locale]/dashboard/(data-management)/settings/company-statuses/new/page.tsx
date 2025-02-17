'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useCompanyStatusForm from '../components/company-status-form.hook'
import CompanyStatusForm from '../components/CompanyStatusForm'

export default function NewCompanyStatus() {
  const t = useTranslations('dataManagement.companyStatuses')
  const { methods, onSubmit } = useCompanyStatusForm()

  return (
    <>
      <PageTitle title={t('newCompanyStatus')} />
      <CompanyStatusForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
