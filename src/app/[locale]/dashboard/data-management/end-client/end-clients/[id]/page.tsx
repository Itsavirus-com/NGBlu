'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { TextView } from '@/components/view/text-view/text-view'
import { EndClientAddress } from '@/services/swr/models/end-client-address.type'
import { useEndClient } from '@/services/swr/use-end-client'

import { EndClientAddressFilter } from './components/end-client-address-filter'

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
    </>
  )
}
