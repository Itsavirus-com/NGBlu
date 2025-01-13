'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useBusinessPartnerContact } from '@/services/swr/use-business-partner-contact'
import { safeRender } from '@/utils/safeRender'

export default function BusinessPartnerContactDetails({
  params,
}: {
  params: { id: number; contactId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.contacts')

  const { data, isLoading } = useBusinessPartnerContact(params.id, params.contactId)

  const contactFields = [
    { label: t('salutation'), value: safeRender(data, 'person.salutation') },
    { label: t('firstName'), value: safeRender(data, 'person.firstname') },
    { label: t('lastName'), value: safeRender(data, 'person.lastname') },
    { label: t('nameSuffix'), value: safeRender(data, 'person.nameSuffix') },
    { label: t('pronounce'), value: safeRender(data, 'person.pronounce') },
    { label: t('gender'), value: safeRender(data, 'person.gender.gender') },
    { label: t('personType'), value: safeRender(data, 'person.personType.type') },
    { label: t('titles'), value: safeRender(data, 'person.titles') },
    { label: t('department'), value: safeRender(data, 'person.department') },
    { label: t('role'), value: safeRender(data, 'person.role') },
    { label: t('enterpriseRoot'), value: safeRender(data, 'enterpriseRootId') },
  ]

  const tabs = [
    {
      eventKey: 'contactsInfo',
      title: t('info'),
      content: (
        <FieldTextView
          fields={contactFields}
          isLoading={isLoading}
          translation="dataManagement.businessPartners.contacts"
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle
        title={`${t('contactInfo')}: ${safeRender(data, 'person.firstname')} ${safeRender(data, 'person.lastname')}`}
      />
      <DynamicTabs tabs={tabs} defaultActiveKey="contactsInfo" />
    </>
  )
}
