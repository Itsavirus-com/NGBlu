'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useEnterpriseRootContact } from '@/services/swr/use-enterprise-root-contact'
import { safeRender } from '@/utils/safeRender'

export default function EnterpriseRootContactDetails({
  params,
}: {
  params: { id: number; contactId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.contacts')

  const { data, isLoading } = useEnterpriseRootContact(params.id, params.contactId)

  const contactFields = [
    { label: t('contactInfo'), value: safeRender(data, 'contactInfo.contactInfo') },
    { label: t('contactType'), value: safeRender(data, 'contactInfo.contactType.contactType') },
    { label: t('responsibility'), value: safeRender(data, 'responsibility.responsibility') },
    { label: t('person'), value: safeRender(data, 'personId') },
    { label: t('enterpriseRoot'), value: safeRender(data, 'enterpriseRootId') },
    { label: t('organisationUnit'), value: safeRender(data, 'ouUnitId') },
  ]

  const tabs = [
    {
      eventKey: 'contactInfo',
      title: t('contactInfo'),
      content: (
        <FieldTextView
          fields={contactFields}
          isLoading={isLoading}
          translation="dataManagement.enterpriseRoots.contacts"
          title={t('contactInfo')}
        />
      ),
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
