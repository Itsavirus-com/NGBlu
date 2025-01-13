'use client'

import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { dateTimeFormats } from '@/components/view/date-time-view/date-time-view.type'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useEnterpriseRootUser } from '@/services/swr/use-enterprise-root-user'
import { safeRender } from '@/utils/safeRender'

export default function EnterpriseRootUserDetails({
  params,
}: {
  params: { id: number; userId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.users')

  const { data, isLoading } = useEnterpriseRootUser(params.id, params.userId)

  const userInfoFields = [
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
  ]

  const tabs = [
    {
      eventKey: 'userInfo',
      title: t('info'),
      content: (
        <FieldTextView
          fields={userInfoFields}
          isLoading={isLoading}
          translation="dataManagement.enterpriseRoots.users"
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'contact',
      title: t('personInfo'),
      content: (
        <FieldTextView
          fields={contactFields}
          isLoading={isLoading}
          translation="dataManagement.enterpriseRoots.users"
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={`${t('user')}: ${safeRender(data, 'user.displayName')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="userInfo" />
    </>
  )
}
