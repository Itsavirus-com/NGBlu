'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useAddress } from '@/services/swr/use-address'
import { safeRender } from '@/utils/safeRender'

export default function AddressDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.addresses')

  const { data, isLoading } = useAddress(params.id)

  const addressInfoFields = [
    { label: t('addressName'), value: safeRender(data, 'addressName') },
    { label: t('streetName'), value: safeRender(data, 'streetname') },
    { label: t('houseNumberSuffix'), value: safeRender(data, 'housenumberSuffix') },
    { label: t('houseNumber'), value: safeRender(data, 'housenumber') },
    { label: t('apartmentNumber'), value: safeRender(data, 'appartmentNumber') },
    { label: t('area'), value: safeRender(data, 'area') },
    { label: t('county'), value: safeRender(data, 'county') },
    { label: t('city'), value: safeRender(data, 'city') },
    { label: t('country'), value: safeRender(data, 'country.name') },
    { label: t('postalCode'), value: safeRender(data, 'postalcode') },
    { label: t('latitude'), value: safeRender(data, 'lat') },
    { label: t('longitude'), value: safeRender(data, 'lng') },
    { label: t('googleAddressId'), value: safeRender(data, 'googleAddressId') },
  ]

  const tabs = [
    {
      eventKey: 'addressInfo',
      title: t('addressInfo'),
      content: (
        <FieldTextView
          fields={addressInfoFields}
          isLoading={isLoading}
          translation="dataManagement.addresses"
          title={t('addressInfo')}
        />
      ),
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
