'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/FieldTextView'
import { useBusinessPartnerAddress } from '@/services/swr/use-business-partner-address'
import { safeRender } from '@/utils/safeRender'

export default function BusinessPartnerAddressDetails({
  params,
}: {
  params: { id: number; addressId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.addresses')

  const { data, isLoading } = useBusinessPartnerAddress(params.id, params.addressId)

  const addressInfoFields = [
    { label: t('addressName'), value: safeRender(data, 'address.addressName') },
    { label: t('streetName'), value: safeRender(data, 'address.streetname') },
    { label: t('houseNumberSuffix'), value: safeRender(data, 'address.housenumberSuffix') },
    { label: t('houseNumber'), value: safeRender(data, 'address.housenumber') },
    { label: t('apartmentNumber'), value: safeRender(data, 'address.appartmentNumber') },
    { label: t('area'), value: safeRender(data, 'address.area') },
    { label: t('county'), value: safeRender(data, 'address.county') },
    { label: t('city'), value: safeRender(data, 'address.city') },
    { label: t('country'), value: safeRender(data, 'address.country.name') },
    { label: t('postalCode'), value: safeRender(data, 'address.postalcode') },
  ]

  const tabs = [
    {
      eventKey: 'addressInfo',
      title: t('info'),
      content: (
        <FieldTextView
          fields={addressInfoFields}
          isLoading={isLoading}
          translation="dataManagement.businessPartners.addresses"
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
