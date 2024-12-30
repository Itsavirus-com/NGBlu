'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useAddress } from '@/services/swr/use-address'

import { AddressInfo } from './components/address-info'

export default function AddressDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.addresses')

  const { data, isLoading } = useAddress(params.id)

  const tabs = [
    {
      eventKey: 'addressInfo',
      title: t('addressInfo'),
      content: <AddressInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={data?.addressName || ''} />
      <DynamicTabs tabs={tabs} defaultActiveKey="addressInfo" />
    </>
  )
}
