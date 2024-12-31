'use client'

import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { dateTimeFormats } from '@/components/view/date-time-view/date-time-view.type'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useBusinessPartnerUser } from '@/services/swr/use-business-partner-user'
import { safeRender } from '@/utils/safeRender'

export default function BusinessPartnerUserDetails({
  params,
}: {
  params: { id: number; userId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.users')

  const { data, isLoading } = useBusinessPartnerUser(params.id, params.userId)

  const userFields = [
    { label: t('displayName'), value: safeRender(data, 'user.displayName') },
    { label: t('email'), value: safeRender(data, 'user.email') },
    {
      label: t('lastLogin'),
      value: data?.user.lastLogin
        ? dayjs(data.user.lastLogin).format(dateTimeFormats.default)
        : '-',
    },
    { label: t('blocked'), value: safeRender(data, 'user.blockedAt') ? t('yes') : t('no') },
  ]

  const tabs = [
    {
      eventKey: 'userInfo',
      title: t('userInfo'),
      content: (
        <FieldTextView
          fields={userFields}
          isLoading={isLoading}
          translation="dataManagement.businessPartners.users"
          title={t('userInfo')}
        />
      ),
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
