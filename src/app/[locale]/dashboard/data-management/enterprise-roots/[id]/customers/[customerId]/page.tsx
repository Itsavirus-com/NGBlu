'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useEnterpriseRootCustomer } from '@/services/swr/use-enterprise-root-customer'

export default function EnterpriseRootCustomerDetails({
  params,
}: {
  params: { id: number; customerId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.customers')

  const { data, isLoading } = useEnterpriseRootCustomer(params.id, params.customerId)

  return (
    <>
      <PageTitle title={data?.endclient.name || ''} />

      <Page title={t('endClient')}>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('name')}
            value={data?.endclient.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('type')}
            value={data?.endclient.type?.type}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('status')}
            value={data?.endclient.status?.status}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('accountNumber')}
            value={data?.endclient.accountNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('referenceId')}
            value={data?.endclient.referenceId}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('afasId')}
            value={data?.endclient.afasId}
          />
        </Row>
      </Page>

      <Page title={t('address')} className="mt-4">
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressName')}
            value={data?.enterpriseRootAddresses.address.addressName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('streetName')}
            value={data?.enterpriseRootAddresses.address.streetname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumberSuffix')}
            value={data?.enterpriseRootAddresses.address.housenumberSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumber')}
            value={data?.enterpriseRootAddresses.address.housenumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('apartmentNumber')}
            value={data?.enterpriseRootAddresses.address.appartmentNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('area')}
            value={data?.enterpriseRootAddresses.address.area}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('county')}
            value={data?.enterpriseRootAddresses.address.county}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('city')}
            value={data?.enterpriseRootAddresses.address.city}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('country')}
            value={data?.enterpriseRootAddresses.address.country?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('postalCode')}
            value={data?.enterpriseRootAddresses.address.postalcode}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('latitude')}
            value={data?.enterpriseRootAddresses.address.lat}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('longitude')}
            value={data?.enterpriseRootAddresses.address.lng}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('googleAddressId')}
            value={data?.enterpriseRootAddresses.address.googleAddressId}
          />
        </Row>
      </Page>
    </>
  )
}
