'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { BusinessPartnerForm } from '../_components/BusinessPartnerForm'
import useBusinessPartnerForm from '../_hooks/business-partner-form.hook'

export default function NewBusinessPartner() {
  const t = useTranslations('dataManagement.businessPartners')
  const { methods, onSubmit, enterpriseRootIdValue, isSubmitting } = useBusinessPartnerForm()

  return (
    <>
      <PageTitle title={t('newBusinessPartner')} />
      <BusinessPartnerForm
        methods={methods}
        onSubmit={onSubmit}
        enterpriseRootIdValue={enterpriseRootIdValue}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
