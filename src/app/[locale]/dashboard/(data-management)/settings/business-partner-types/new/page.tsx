'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useBusinessPartnerTypeForm from '../components/business-partner-type-form.hook'
import BusinessPartnerTypeForm from '../components/BusinessPartnerTypeForm'

export default function NewBusinessPartnerType() {
  const t = useTranslations('dataManagement.businessPartnerTypes')
  const { methods, onSubmit } = useBusinessPartnerTypeForm()

  return (
    <>
      <PageTitle title={t('newBusinessPartnerType')} />
      <BusinessPartnerTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
