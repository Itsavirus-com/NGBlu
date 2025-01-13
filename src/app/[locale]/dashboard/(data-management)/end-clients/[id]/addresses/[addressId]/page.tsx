'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useEndClientAddress } from '@/services/swr/use-end-client-address'
import { safeRender } from '@/utils/safeRender'

export default function EndClientAddressDetails({
  params,
}: {
  params: { id: number; addressId: number }
}) {
  const t = useTranslations('dataManagement.endClients.addresses')

  const { data, isLoading } = useEndClientAddress(params.id, params.addressId)

  const addressInfoFields = [
    { label: 'Address Name', value: safeRender(data, 'address.addressName') },
    { label: 'Street Name', value: safeRender(data, 'address.streetname') },
    { label: 'House Number Suffix', value: safeRender(data, 'address.housenumberSuffix') },
    { label: 'House Number', value: safeRender(data, 'address.housenumber') },
    { label: 'Apartment Number', value: safeRender(data, 'address.appartmentNumber') },
    { label: 'Area', value: safeRender(data, 'address.area') },
    { label: 'County', value: safeRender(data, 'address.county') },
    { label: 'City', value: safeRender(data, 'address.city') },
    { label: 'Country', value: safeRender(data, 'address.country.name') },
    { label: 'Postal Code', value: safeRender(data, 'address.postalcode') },
  ]

  const tabs = [
    {
      eventKey: 'addressInfo',
      title: t('info'),
      content: (
        <FieldTextView
          fields={addressInfoFields}
          isLoading={isLoading}
          translation="dataManagement.businessPartners.users"
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={`${t('addressInfo')}: ${safeRender(data, 'address.addressName')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="addressInfo" />
    </>
  )
}
