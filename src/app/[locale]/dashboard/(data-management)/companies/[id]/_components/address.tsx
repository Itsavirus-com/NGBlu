import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { TextView } from '@/components/view/text-view/TextView'

import { AddressProps } from './address.type'

export const Address = (props: AddressProps) => {
  const { title, address, isLoading } = props

  const t = useTranslations('dataManagement.companies')

  return (
    <Page className="mt-6" title={title}>
      <Row>
        <TextView
          className="my-3"
          isLoading={isLoading}
          label={t('addressName')}
          value={address?.addressName}
        />
        <TextView
          className="my-3"
          isLoading={isLoading}
          label={t('streetName')}
          value={address?.streetname}
        />
        <TextView
          className="my-3"
          isLoading={isLoading}
          label={t('houseNumberSuffix')}
          value={address?.housenumberSuffix}
        />
        <TextView
          className="my-3"
          isLoading={isLoading}
          label={t('houseNumber')}
          value={address?.housenumber}
        />
        <TextView
          className="my-3"
          isLoading={isLoading}
          label={t('apartmentNumber')}
          value={address?.appartmentNumber}
        />
        <TextView className="my-3" isLoading={isLoading} label={t('area')} value={address?.area} />
        <TextView
          className="my-3"
          isLoading={isLoading}
          label={t('county')}
          value={address?.county}
        />
        <TextView className="my-3" isLoading={isLoading} label={t('city')} value={address?.city} />
        <TextView
          className="my-3"
          isLoading={isLoading}
          label={t('country')}
          value={address?.country?.name}
        />
        <TextView
          className="my-3"
          isLoading={isLoading}
          label={t('postalCode')}
          value={address?.postalcode}
        />
        <TextView
          className="my-3"
          isLoading={isLoading}
          label={t('latitude')}
          value={address?.lat}
        />
        <TextView
          className="my-3"
          isLoading={isLoading}
          label={t('longitude')}
          value={address?.lng}
        />
        <TextView
          className="my-3"
          isLoading={isLoading}
          label={t('googleAddressId')}
          value={address?.googleAddressId}
        />
      </Row>
    </Page>
  )
}
