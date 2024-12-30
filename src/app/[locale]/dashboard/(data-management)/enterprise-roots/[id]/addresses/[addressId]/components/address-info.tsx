import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

export const AddressInfo = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const t = useTranslations('dataManagement.enterpriseRoots.addresses')

  const fields = [
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

  return (
    <Page title={t('addressInfo')} className="pt-5">
      <Row>
        {fields.map((field, index) => (
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
