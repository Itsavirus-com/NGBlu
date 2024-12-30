'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useBusinessPartnerContact } from '@/services/swr/use-business-partner-contact'

import { ContactsInfo } from './components/contacts-info'

export default function BusinessPartnerContactDetails({
  params,
}: {
  params: { id: number; contactId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.contacts')

  const { data, isLoading } = useBusinessPartnerContact(params.id, params.contactId)

  const tabs = [
    {
      eventKey: 'contactsInfo',
      title: t('contactInfo'),
      content: <ContactsInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={t('title')} />
      <DynamicTabs tabs={tabs} defaultActiveKey="contactsInfo" />
    </>
  )
}
