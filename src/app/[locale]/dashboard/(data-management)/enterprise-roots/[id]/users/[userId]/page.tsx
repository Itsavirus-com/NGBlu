'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useEnterpriseRootUser } from '@/services/swr/use-enterprise-root-user'

import { UserContact } from './components/user-contact'
import { UserInfo } from './components/user-info'

export default function EnterpriseRootUserDetails({
  params,
}: {
  params: { id: number; userId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.users')

  const { data, isLoading } = useEnterpriseRootUser(params.id, params.userId)

  const tabs = [
    {
      eventKey: 'userInfo',
      title: t('userInfo'),
      content: <UserInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
    {
      eventKey: 'contact',
      title: t('personInfo'),
      content: <UserContact data={data} isLoading={isLoading} />,
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
