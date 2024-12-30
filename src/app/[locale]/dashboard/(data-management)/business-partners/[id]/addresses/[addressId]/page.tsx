'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useBusinessPartnerAddress } from '@/services/swr/use-business-partner-address'

import { AddressInfo } from './components/address-info'

export default function BusinessPartnerAddressDetails({
  params,
}: {
  params: { id: number; addressId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.addresses')

  const { data, isLoading } = useBusinessPartnerAddress(params.id, params.addressId)

  const tabs = [
    {
      eventKey: 'addressInfo',
      title: t('addressInfo'),
      content: <AddressInfo data={data?.address} isLoading={isLoading} />,
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
