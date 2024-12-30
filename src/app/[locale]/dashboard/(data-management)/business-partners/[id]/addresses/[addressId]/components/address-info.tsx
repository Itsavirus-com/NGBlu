import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

interface AddressInfoProps {
  data: any
  isLoading: boolean
}

export const AddressInfo = ({ data, isLoading }: AddressInfoProps) => {
  const t = useTranslations('dataManagement.businessPartners.addresses')

  const fields = [
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
  ]

  return (
    <Page className="pt-5">
      <Row>
        {fields.map(({ label, value }, index) => (
          <TextView
            key={index}
            className="my-3"
            isLoading={isLoading}
            label={label}
            value={value}
          />
        ))}
      </Row>
    </Page>
  )
}
