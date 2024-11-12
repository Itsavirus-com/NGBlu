'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useEndClientAddress } from '@/services/swr/use-end-client-address'

export default function EndClientAddressDetails({
  params,
}: {
  params: { id: number; addressId: number }
}) {
  const t = useTranslations('dataManagement.endClients.addresses')

  const { data, isLoading } = useEndClientAddress(params.id, params.addressId)

  return (
    <>
      <PageTitle title={t('title')} />

      <Page>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressName')}
            value={data?.address.addressName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('streetName')}
            value={data?.address.streetname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumberSuffix')}
            value={data?.address.housenumberSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumber')}
            value={data?.address.housenumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('apartmentNumber')}
            value={data?.address.appartmentNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('area')}
            value={data?.address.area}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('county')}
            value={data?.address.county}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('city')}
            value={data?.address.city}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('country')}
            value={data?.address.country?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('postalCode')}
            value={data?.address.postalcode}
          />
        </Row>
      </Page>
    </>
  )
}
