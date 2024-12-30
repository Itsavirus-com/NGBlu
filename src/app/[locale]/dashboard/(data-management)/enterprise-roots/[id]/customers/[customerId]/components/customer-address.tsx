import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

export const CustomerAddress = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const t = useTranslations('dataManagement.enterpriseRoots.customers')

  const addressFields = [
    { label: t('addressName'), value: safeRender(data, 'enterpriseRootAddresses.addressName') },
    { label: t('streetName'), value: safeRender(data, 'enterpriseRootAddresses.streetname') },
    {
      label: t('houseNumberSuffix'),
      value: safeRender(data, 'enterpriseRootAddresses.housenumberSuffix'),
    },
    { label: t('houseNumber'), value: safeRender(data, 'enterpriseRootAddresses.housenumber') },
    {
      label: t('apartmentNumber'),
      value: safeRender(data, 'enterpriseRootAddresses.appartmentNumber'),
    },
    { label: t('area'), value: safeRender(data, 'enterpriseRootAddresses.area') },
    { label: t('county'), value: safeRender(data, 'enterpriseRootAddresses.county') },
    { label: t('city'), value: safeRender(data, 'enterpriseRootAddresses.city') },
    { label: t('country'), value: safeRender(data, 'enterpriseRootAddresses.country.name') },
    { label: t('postalCode'), value: safeRender(data, 'enterpriseRootAddresses.postalcode') },
    { label: t('latitude'), value: safeRender(data, 'enterpriseRootAddresses.lat') },
    { label: t('longitude'), value: safeRender(data, 'enterpriseRootAddresses.lng') },
    {
      label: t('googleAddressId'),
      value: safeRender(data, 'enterpriseRootAddresses.googleAddressId'),
    },
  ]

  return (
    <Page title={t('address')} className="pt-5">
      <Row>
        {addressFields.map((field, index) => (
          <TextView
            key={index}
            className="my-3"
            isLoading={isLoading}
            label={field.label}
            value={field.value}
          />
        ))}
      </Row>
    </Page>
  )
}
