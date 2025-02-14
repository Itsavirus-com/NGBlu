'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import BusinessPartnerContactForm from '../../../_components/BusinessPartnerContactForm'
import { useBusinessPartnerContactForm } from '../../../_hooks/business-partner-contact-form.hook'

export default function UpdateBusinessPartnerContact({
  params,
}: {
  params: { id: string; contactId: string }
}) {
  const t = useTranslations('dataManagement.businessPartners.contacts')

  const { methods, onSubmit, isLoading } = useBusinessPartnerContactForm(
    Number(params.id),
    Number(params.contactId)
  )

  return (
    <>
      <PageTitle title={t('updateContact')} />
      {isLoading ? (
        <Loading />
      ) : (
        <BusinessPartnerContactForm methods={methods} onSubmit={onSubmit} />
      )}
    </>
  )
}
