'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useEndClientAddress } from '@/services/swr/use-end-client-address'

import { AddressInfo } from './components/end-client-info'

export default function EndClientAddressDetails({
  params,
}: {
  params: { id: number; addressId: number }
}) {
  const t = useTranslations('dataManagement.endClients.addresses')

  const { data, isLoading } = useEndClientAddress(params.id, params.addressId)

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
      <PageTitle title={t('title')} />
      <DynamicTabs tabs={tabs} defaultActiveKey="addressInfo" />
    </>
  )
}
