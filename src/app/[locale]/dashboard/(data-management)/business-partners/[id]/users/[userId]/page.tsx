'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useBusinessPartnerUser } from '@/services/swr/use-business-partner-user'

import { UserInfo } from './components/user-info'

export default function BusinessPartnerUserDetails({
  params,
}: {
  params: { id: number; userId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.users')

  const { data, isLoading } = useBusinessPartnerUser(params.id, params.userId)

  const tabs = [
    {
      eventKey: 'userInfo',
      title: t('userInfo'),
      content: <UserInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={t('title')} />
      <DynamicTabs tabs={tabs} defaultActiveKey="userInfo" />
    </>
  )
}
