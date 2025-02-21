'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import BusinessPartnerTypeForm from '../_components/BusinessPartnerTypeForm'
import useBusinessPartnerTypeForm from '../_hooks/business-partner-type-form.hook'

export default function NewBusinessPartnerType() {
  const t = useTranslations('dataManagement.businessPartnerTypes')
  const { methods, onSubmit, isSubmitting } = useBusinessPartnerTypeForm()

  return (
    <>
      <PageTitle title={t('newBusinessPartnerType')} />
      <BusinessPartnerTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
