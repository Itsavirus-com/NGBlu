'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useCompanyStatusForm from '../../components/company-status-form.hook'
import CompanyStatusForm from '../../components/CompanyStatusForm'

export default function UpdateCompanyStatus({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.companyStatuses')
  const { methods, onSubmit } = useCompanyStatusForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateCompanyStatus')} />
      <CompanyStatusForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
