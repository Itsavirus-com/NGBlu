'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { TextView } from '@/components/view/text-view/text-view'
import { EndClientAddress } from '@/services/swr/models/end-client-address.type'
import { EndClientContact } from '@/services/swr/models/end-client-contact.type'
import { EndClientPaymentDetail } from '@/services/swr/models/end-client-payment-detail.type'
import { useEndClient } from '@/services/swr/use-end-client'

import { EndClientAddressFilter } from './components/end-client-address-filter'
import { EndClientContactFilter } from './components/end-client-contact-filter'
import { EndClientPaymentDetailFilter } from './components/end-client-payment-detail-filter'

export default function EndClientDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.endClients')

  const { data, isLoading } = useEndClient(params.id)

  const addressColumns: TableColumn<EndClientAddress>[] = [
    {
      id: 'id',
      title: t('addresses.id'),
      render: row => row.id,
    },
    {
      id: 'address',
      title: t('addresses.address'),
      render: row => `${row.addressId} | ${row.address.addressName}`,
    },
    {
      id: 'isPrimaryAddress',
      title: t('addresses.primaryAddress'),
      render: row => (row.isPrimaryAddress ? t('addresses.yes') : t('addresses.no')),
    },
  ]

  const contactColumns: TableColumn<EndClientContact>[] = [
    {
      id: 'id',
      title: t('contacts.id'),
      render: row => row.id,
    },
    {
      id: 'contact',
      title: t('contacts.contactInfo'),
      render: row => `${row.contactInfoId} | ${row.contactInfo.contactInfo}`,
    },
    {
      id: 'responsibility',
      title: t('contacts.responsibility'),
      render: row => `${row.responsibilityId} | ${row.responsibility.responsibility}`,
    },
  ]

  const paymentDetailColumns: TableColumn<EndClientPaymentDetail>[] = [
    {
      id: 'id',
      title: t('paymentDetails.id'),
      render: row => row.id,
    },
    {
      id: 'person',
      title: t('paymentDetails.paymentInfo'),
      render: row => `${row.paymentInfoId} | ${row.paymentInfo.paymentType?.paymentType}`,
    },
  ]

  return (
    <>
      <PageTitle title={data?.name || ''} />

      <Page>
        <Row>
          <TextView className="my-3" isLoading={isLoading} label={t('name')} value={data?.name} />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('type')}
            value={data?.type?.type}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('status')}
            value={data?.status?.status}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('accountNumber')}
            value={data?.accountNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('referenceId')}
            value={data?.referenceId}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('afasId')}
            value={data?.afasId}
          />
        </Row>

        <Row className="mt-6">
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressName')}
            value={data?.locationAddress?.addressName}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('streetName')}
            value={data?.locationAddress?.streetname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumberSuffix')}
            value={data?.locationAddress?.housenumberSuffix}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('houseNumber')}
            value={data?.locationAddress?.housenumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('apartmentNumber')}
            value={data?.locationAddress?.appartmentNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('area')}
            value={data?.locationAddress?.area}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('county')}
            value={data?.locationAddress?.county}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('city')}
            value={data?.locationAddress?.city}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('country')}
            value={data?.locationAddress?.country?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('postalCode')}
            value={data?.locationAddress?.postalcode}
          />
        </Row>
      </Page>

      <Table<EndClientAddress>
        className="mt-4"
        title={t('addresses.title')}
        toolbars={[
          {
            icon: 'plus',
            label: t('addresses.newAddress'),
            colorClass: 'light-primary',
            href: `${params.id}/addresses/new`,
          },
        ]}
        filters={<EndClientAddressFilter />}
        columns={addressColumns}
        apiPath={`end-clients/${params.id}/addresses`}
        actionBasePath={`${params.id}/addresses`}
        actions={['view', 'edit', 'delete']}
      />

      <Table<EndClientContact>
        className="mt-4"
        title={t('contacts.title')}
        toolbars={[
          {
            icon: 'plus',
            label: t('contacts.newContact'),
            colorClass: 'light-primary',
            href: `${params.id}/contacts/new`,
          },
        ]}
        filters={<EndClientContactFilter />}
        columns={contactColumns}
        apiPath={`end-clients/${params.id}/contacts`}
        actionBasePath={`${params.id}/contacts`}
        actions={['view', 'edit', 'delete']}
      />

      <Table<EndClientPaymentDetail>
        className="mt-4"
        title={t('paymentDetails.title')}
        toolbars={[
          {
            icon: 'plus',
            label: t('paymentDetails.newPaymentDetail'),
            colorClass: 'light-primary',
            href: `${params.id}/payment-detail/new`,
          },
        ]}
        filters={<EndClientPaymentDetailFilter />}
        columns={paymentDetailColumns}
        apiPath={`end-clients/${params.id}/payment-details`}
        actionBasePath={`${params.id}/payment-detail`}
        actions={['view', 'edit', 'delete']}
      />
    </>
  )
}
