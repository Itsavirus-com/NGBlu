import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

export const ProjectAddress = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const t = useTranslations('dataManagement.endClients.projects')

  const addressFields = [
    { label: t('addressName'), value: safeRender(data, 'endclientAddress.addressName') },
    { label: t('streetName'), value: safeRender(data, 'endclientAddress.streetname') },
    {
      label: t('houseNumberSuffix'),
      value: safeRender(data, 'endclientAddress.housenumberSuffix'),
    },
    { label: t('houseNumber'), value: safeRender(data, 'endclientAddress.housenumber') },
    { label: t('apartmentNumber'), value: safeRender(data, 'endclientAddress.appartmentNumber') },
    { label: t('area'), value: safeRender(data, 'endclientAddress.area') },
    { label: t('county'), value: safeRender(data, 'endclientAddress.county') },
    { label: t('city'), value: safeRender(data, 'endclientAddress.city') },
    { label: t('country'), value: safeRender(data, 'endclientAddress.country.name') },
    { label: t('postalCode'), value: safeRender(data, 'endclientAddress.postalcode') },
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
