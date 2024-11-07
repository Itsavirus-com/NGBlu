'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { TextView } from '@/components/view/text-view/text-view'
import { EnterpriseRootAddress } from '@/services/swr/models/enterprise-root-address.type'
import { useEnterpriseRoot } from '@/services/swr/use-enterprise-root'

import { EnterpriseRootAddressFilter } from './components/enterprise-root-address-filter'

export default function EnterpriseRootDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.enterpriseRoots')

  const { data, isLoading } = useEnterpriseRoot(params.id)

  const columns: TableColumn<EnterpriseRootAddress>[] = [
    {
      id: 'id',
      title: t('addresses.id'),
      render: row => row.id,
    },
    {
      id: 'address',
      title: t('addresses.addressName'),
      render: row => `${row.addressId} | ${row.address.addressName}`,
    },
    {
      id: 'addressType',
      title: t('addresses.addressType'),
      render: row => row.addressType.addressType,
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
            label={t('addressesCount')}
            value={data?.addressesCount}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('contactsCount')}
            value={data?.contactsCount}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('usersCount')}
            value={data?.usersCount}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('projectsCount')}
            value={data?.projectsCount}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('customersCount')}
            value={data?.customersCount}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('businessPartnersCount')}
            value={data?.businessPartnersCount}
          />
        </Row>
      </Page>

      <Table<EnterpriseRootAddress>
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
        filters={<EnterpriseRootAddressFilter />}
        columns={columns}
        apiPath={`enterprise-roots/${params.id}/addresses`}
        actionBasePath={`${params.id}/addresses`}
        actions={['view', 'edit', 'delete']}
      />
    </>
  )
}
