'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useEndClientContact } from '@/services/swr/use-end-client-contact'

import { ContactInfo } from './components/contact-info'

export default function EndClientContactDetails({
  params,
}: {
  params: { id: number; contactId: number }
}) {
  const t = useTranslations('dataManagement.endClients.contacts')

  const { data, isLoading } = useEndClientContact(params.id, params.contactId)

  const tabs = [
    {
      eventKey: 'contactInfo',
      title: t('contactInfo'),
      content: <ContactInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={t('title')} />
      <DynamicTabs tabs={tabs} defaultActiveKey="contactInfo" />
    </>
  )
}
