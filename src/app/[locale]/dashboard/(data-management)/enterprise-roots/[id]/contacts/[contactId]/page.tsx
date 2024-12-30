'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useEnterpriseRootContact } from '@/services/swr/use-enterprise-root-contact'

import { ContactInfo } from './components/contact-info'

export default function EnterpriseRootContactDetails({
  params,
}: {
  params: { id: number; contactId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.contacts')

  const { data, isLoading } = useEnterpriseRootContact(params.id, params.contactId)

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
