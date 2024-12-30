'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useEnterpriseRootAddress } from '@/services/swr/use-enterprise-root-address'

import { AddressInfo } from './components/address-info'

export default function EnterpriseRootAddressDetails({
  params,
}: {
  params: { id: number; addressId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.addresses')

  const { data, isLoading } = useEnterpriseRootAddress(params.id, params.addressId)

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
      <PageTitle title={data?.address?.addressName || ''} />
      <DynamicTabs tabs={tabs} defaultActiveKey="addressInfo" />
    </>
  )
}
