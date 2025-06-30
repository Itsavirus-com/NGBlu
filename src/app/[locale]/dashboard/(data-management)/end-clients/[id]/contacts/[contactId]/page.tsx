'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/FieldTextView'
import { useEndClientContact } from '@/services/swr/use-end-client-contact'
import { safeRender } from '@/utils/safeRender'

export default function EndClientContactDetails({
  params,
}: {
  params: { id: number; contactId: number }
}) {
  const t = useTranslations('dataManagement.endClients.contacts')

  const { data, isLoading } = useEndClientContact(params.id, params.contactId)

  const contactFields = [
    { label: 'Contact Info', value: safeRender(data, 'contactInfo.contactInfo') },
    { label: 'Contact Type', value: safeRender(data, 'contactInfo.contactType.contactType') },
    { label: 'Responsibility', value: safeRender(data, 'responsibility.responsibility') },
    { label: 'Person', value: safeRender(data, 'personId') },
    { label: 'Enterprise Root', value: safeRender(data, 'enterpriseRootId') },
  ]

  const tabs = [
    {
      eventKey: 'contactInfo',
      title: t('info'),
      content: (
        <FieldTextView
          fields={contactFields}
          isLoading={isLoading}
          translation="dataManagement.endClients.contacts"
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={`${t('contactInfo')}: ${safeRender(data, 'contactInfo.contactInfo')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="contactInfo" />
    </>
  )
}
