'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useEnterpriseRootAddress } from '@/services/swr/use-enterprise-root-address'

export default function EnterpriseRootAddressDetails({
  params,
}: {
  params: { id: number; addressId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.addresses')

  const { data, isLoading } = useEnterpriseRootAddress(params.id, params.addressId)

  return (
    <>
      <PageTitle title={data?.address.addressName || ''} />

      <Page title={t('address')}>
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
            label={t('addressType')}
            value={data?.addressType.addressType}
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
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('latitude')}
            value={data?.address.lat}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('longitude')}
            value={data?.address.lng}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('googleAddressId')}
            value={data?.address.googleAddressId}
          />
        </Row>
      </Page>
    </>
  )
}
