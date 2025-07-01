'use client'

import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { GoogleMap } from '@/components/google-map/GoogleMap'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/FieldTextView'
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
      title: t('info'),
      condition: Boolean(data),
      content: (
        <FieldTextView
          fields={addressInfoFields}
          isLoading={isLoading}
          translation="dataManagement.addresses"
        >
          <label className="fw-bold form-label my-3">Google Map</label>
          <GoogleMap
            lat={parseFloat(data?.lat ?? '0')}
            lng={parseFloat(data?.lng ?? '0')}
            address={`${safeRender(data, 'streetname')} ${safeRender(data, 'housenumber')}, ${safeRender(data, 'city')}, ${safeRender(data, 'country.name')}`}
          />
        </FieldTextView>
      ),
    },
  ]

  return (
    <>
      <PageTitle title={`${t('addressInfo')}: ${safeRender(data, 'addressName')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="addressInfo" />
    </>
  )
}
