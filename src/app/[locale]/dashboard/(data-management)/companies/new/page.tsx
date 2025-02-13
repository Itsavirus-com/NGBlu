'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import CompanyForm from '../_components/CompanyForm'
import useCompanyForm from '../_hooks/company-form.hook'

export default function NewCompany() {
  const t = useTranslations('dataManagement.companies')
  const { methods, onSubmit } = useCompanyForm()

  return (
    <>
      <PageTitle title={t('newCompany')} />
      <CompanyForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
