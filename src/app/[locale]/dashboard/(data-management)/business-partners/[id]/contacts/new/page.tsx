'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import BusinessPartnerContactForm from '../../_components/BusinessPartnerContactForm'
import { useBusinessPartnerContactForm } from '../../_hooks/business-partner-contact-form.hook'

export default function NewBusinessPartnerContact({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners.contacts')

  const { methods, onSubmit } = useBusinessPartnerContactForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newContact')} />
      <BusinessPartnerContactForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
