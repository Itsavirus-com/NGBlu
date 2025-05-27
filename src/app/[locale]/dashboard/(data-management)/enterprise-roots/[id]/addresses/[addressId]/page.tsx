'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useEnterpriseRootAddress } from '@/services/swr/use-enterprise-root-address'
import { safeRender } from '@/utils/safeRender'

export default function EnterpriseRootAddressDetails({
  params,
}: {
  params: { id: number; addressId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.addresses')

  const { data, isLoading } = useEnterpriseRootAddress(params.id, params.addressId)

  const addressInfoFields = [
    { label: t('addressName'), value: safeRender(data, 'address.addressName') },
    { label: t('addressType'), value: safeRender(data, 'addressType.addressType') },
    { label: t('streetName'), value: safeRender(data, 'address.streetname') },
    { label: t('houseNumberSuffix'), value: safeRender(data, 'address.housenumberSuffix') },
    { label: t('houseNumber'), value: safeRender(data, 'address.housenumber') },
    { label: t('apartmentNumber'), value: safeRender(data, 'address.appartmentNumber') },
    { label: t('area'), value: safeRender(data, 'address.area') },
    { label: t('county'), value: safeRender(data, 'address.county') },
    { label: t('city'), value: safeRender(data, 'address.city') },
    { label: t('country'), value: safeRender(data, 'address.country.name') },
    { label: t('postalCode'), value: safeRender(data, 'address.postalcode') },
    { label: t('latitude'), value: safeRender(data, 'address.lat') },
    { label: t('longitude'), value: safeRender(data, 'address.lng') },
    { label: t('googleAddressId'), value: safeRender(data, 'address.googleAddressId') },
  ]

  const tabs = [
    {
      eventKey: 'addressInfo',
      title: t('info'),
      content: (
        <FieldTextView
          fields={addressInfoFields}
          isLoading={isLoading}
          translation="dataManagement.enterpriseRoots.addresses"
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={`${t('address')}: ${safeRender(data, 'address.addressName')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="addressInfo" />
    </>
  )
}
