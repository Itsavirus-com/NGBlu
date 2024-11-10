'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { TextView } from '@/components/view/text-view/text-view'
import { BusinessPartnerAddress } from '@/services/swr/models/business-partner-address.type'
import { BusinessPartnerContact } from '@/services/swr/models/business-partner-contact.type'
import { BusinessPartnerCustomer } from '@/services/swr/models/business-partner-customer.type'
import { useBusinessPartner } from '@/services/swr/use-business-partner'

import { BusinessPartnerAddressFilter } from './components/business-partner-address-filter'
import { BusinessPartnerContactFilter } from './components/business-partner-contact-filter'
import { BusinessPartnerCustomerFilter } from './components/business-partner-customer-filter'

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

  const contactColumns: TableColumn<BusinessPartnerContact>[] = [
    {
      id: 'id',
      title: t('contacts.id'),
      render: row => row.id,
    },
    {
      id: 'person',
      title: t('contacts.person'),
      render: row => `${row.person.firstname} ${row.person.lastname}`,
    },
  ]

  const customerColumns: TableColumn<BusinessPartnerCustomer>[] = [
    {
      id: 'id',
      title: t('contacts.id'),
      render: row => row.id,
    },
    {
      id: 'endClient',
      title: t('customers.endClient'),
      render: row => `${row.endclientId} | ${row.endclient.name}`,
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

      <Table<BusinessPartnerContact>
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
        filters={<BusinessPartnerContactFilter />}
        columns={contactColumns}
        apiPath={`business-partners/${params.id}/contacts`}
        actionBasePath={`${params.id}/contacts`}
        actions={['view', 'edit', 'delete']}
      />

      <Table<BusinessPartnerCustomer>
        className="mt-4"
        title={t('customers.title')}
        toolbars={[
          {
            icon: 'plus',
            label: t('customers.newCustomer'),
            colorClass: 'light-primary',
            href: `${params.id}/customers/new`,
          },
        ]}
        filters={<BusinessPartnerCustomerFilter />}
        columns={customerColumns}
        apiPath={`business-partners/${params.id}/customers`}
        actionBasePath={`${params.id}/customers`}
        actions={['view', 'edit', 'delete']}
      />
    </>
  )
}
