'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useAddress } from '@/services/swr/use-address'

export default function AddressDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.addresses')

  const { data, isLoading } = useAddress(params.id)

  return (
    <>
      <PageTitle title={data?.addressName || ''} />

      <Page>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressName')}
            value={data?.addressName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('streetName')}
            value={data?.streetname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumberSuffix')}
            value={data?.housenumberSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumber')}
            value={data?.housenumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('apartmentNumber')}
            value={data?.appartmentNumber}
          />
          <TextView className="my-3" isLoading={isLoading} label={t('area')} value={data?.area} />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('county')}
            value={data?.county}
          />
          <TextView className="my-3" isLoading={isLoading} label={t('city')} value={data?.city} />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('country')}
            value={data?.country?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('postalCode')}
            value={data?.postalcode}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('latitude')}
            value={data?.lat}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('longitude')}
            value={data?.lng}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('googleAddressId')}
            value={data?.googleAddressId}
          />
        </Row>
      </Page>
    </>
  )
}
