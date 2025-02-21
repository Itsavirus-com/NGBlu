'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import CompanyForm from '../../_components/CompanyForm'
import useCompanyForm from '../../_hooks/company-form.hook'

export default function UpdateCompany({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.companies')

  const { methods, onSubmit, isLoading, isSubmitting } = useCompanyForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateCompany')} />
      {isLoading ? (
        <Loading />
      ) : (
        <CompanyForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
