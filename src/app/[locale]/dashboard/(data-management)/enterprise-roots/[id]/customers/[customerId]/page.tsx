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
            value={data?.enterpriseRootAddresses.addressName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('streetName')}
            value={data?.enterpriseRootAddresses.streetname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumberSuffix')}
            value={data?.enterpriseRootAddresses.housenumberSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumber')}
            value={data?.enterpriseRootAddresses.housenumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('apartmentNumber')}
            value={data?.enterpriseRootAddresses.appartmentNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('area')}
            value={data?.enterpriseRootAddresses.area}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('county')}
            value={data?.enterpriseRootAddresses.county}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('city')}
            value={data?.enterpriseRootAddresses.city}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('country')}
            value={data?.enterpriseRootAddresses.country?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('postalCode')}
            value={data?.enterpriseRootAddresses.postalcode}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('latitude')}
            value={data?.enterpriseRootAddresses.lat}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('longitude')}
            value={data?.enterpriseRootAddresses.lng}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('googleAddressId')}
            value={data?.enterpriseRootAddresses.googleAddressId}
          />
        </Row>
      </Page>
    </>
  )
}
