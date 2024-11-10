'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { TextView } from '@/components/view/text-view/text-view'
import { BusinessPartnerAddress } from '@/services/swr/models/business-partner-address.type'
import { useBusinessPartner } from '@/services/swr/use-business-partner'

import { BusinessPartnerAddressFilter } from './components/business-partner-address-filter'

export default function BusinessPartnerDetails({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners')

  const { data, isLoading } = useBusinessPartner(Number(params.id))

  const addressColumns: TableColumn<BusinessPartnerAddress>[] = [
    {
      id: 'id',
      title: t('addresses.id'),
      render: row => row.id,
    },
    {
      id: 'address',
      title: t('addresses.addressName'),
      render: row => `${row.address.id} | ${row.address.addressName}`,
    },
    {
      id: 'addressTyoe',
      title: t('addresses.addressType'),
      render: row => `${row.addressType?.id} | ${row.addressType?.addressType}`,
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
            label={t('company')}
            value={data?.companyInfo.companyname}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('type')}
            value={data?.businessPartnerType.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('addressCount')}
            value={data?.businessPartnerAddressesCount || 0}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('contactCount')}
            value={data?.businessPartnerContactsCount || 0}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('customerCount')}
            value={data?.businessPartnerCustomersCount || 0}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('projectCount')}
            value={data?.businessPartnerProjectsCount || 0}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('userCount')}
            value={data?.businessPartnerUsersCount || 0}
          />
        </Row>
      </Page>

      <Table<BusinessPartnerAddress>
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
        filters={<BusinessPartnerAddressFilter />}
        columns={addressColumns}
        apiPath={`business-partners/${params.id}/addresses`}
        actionBasePath={`${params.id}/addresses`}
        actions={['view', 'edit', 'delete']}
      />
    </>
  )
}
