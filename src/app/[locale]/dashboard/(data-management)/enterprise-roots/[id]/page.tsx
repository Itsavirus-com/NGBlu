'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { TextView } from '@/components/view/text-view/text-view'
import { EnterpriseRootAddress } from '@/services/swr/models/enterprise-root-address.type'
import { EnterpriseRootContact } from '@/services/swr/models/enterprise-root-contact.type'
import { EnterpriseRootCustomer } from '@/services/swr/models/enterprise-root-customer.type'
import { EnterpriseRootProject } from '@/services/swr/models/enterprise-root-project.type'
import { EnterpriseRootUser } from '@/services/swr/models/enterprise-root-user.type'
import { useEnterpriseRoot } from '@/services/swr/use-enterprise-root'
import { safeRender } from '@/utils/safeRender'

import { EnterpriseRootAddressFilter } from './components/enterprise-root-address-filter'
import { EnterpriseRootContactFilter } from './components/enterprise-root-contact-filter'
import { EnterpriseRootCustomerFilter } from './components/enterprise-root-customer-filter'
import { EnterpriseRootProjectFilter } from './components/enterprise-root-project-filter'
import { EnterpriseRootUserFilter } from './components/enterprise-root-user-filter'

export default function EnterpriseRootDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.enterpriseRoots')

  const { data, isLoading } = useEnterpriseRoot(params.id)

  const addressColumns: TableColumn<EnterpriseRootAddress>[] = [
    {
      id: 'id',
      title: t('addresses.id'),
      render: row => row.id,
    },
    {
      id: 'address',
      title: t('addresses.addressName'),
      render: row => `${safeRender(row, 'addressId')} | ${safeRender(row, 'address.addressName')}`,
    },
    {
      id: 'addressType',
      title: t('addresses.addressType'),
      render: row => safeRender(row, 'addressType?.addressType'),
    },
  ]

  const contactColumns: TableColumn<EnterpriseRootContact>[] = [
    {
      id: 'id',
      title: t('addresses.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'contact',
      title: t('contacts.contactInfo'),
      render: row =>
        `${safeRender(row, 'contactInfoId')} | ${safeRender(row, 'contactInfo?.contactInfo')}`,
    },
    {
      id: 'responsibility',
      title: t('contacts.responsibility'),
      render: row =>
        `${safeRender(row, 'responsibilityId')} | ${safeRender(row, 'responsibility?.responsibility')}`,
    },
  ]

  const projectColumns: TableColumn<EnterpriseRootProject>[] = [
    {
      id: 'id',
      title: t('projects.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'project',
      title: t('projects.project'),
      render: row => `${safeRender(row, 'projectId')} | ${safeRender(row, 'project.projectName')}`,
    },
    {
      id: 'address',
      title: t('projects.address'),
      render: row =>
        `${safeRender(row, 'enterpriseRootAddressesId')} | ${safeRender(row, 'enterpriseRootAddresses.addressName')}`,
    },
  ]

  const customerColumns: TableColumn<EnterpriseRootCustomer>[] = [
    {
      id: 'id',
      title: t('customers.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'endClient',
      title: t('customers.endClient'),
      render: row => `${safeRender(row, 'endclientId')} | ${safeRender(row, 'endclient.name')}`,
    },
    {
      id: 'address',
      title: t('customers.address'),
      render: row =>
        `${safeRender(row, 'enterpriseRootAddressesId')} | ${safeRender(row, 'enterpriseRootAddresses.addressName')}`,
    },
  ]

  const userColumns: TableColumn<EnterpriseRootUser>[] = [
    {
      id: 'id',
      title: t('users.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'displayName',
      title: t('users.user'),
      render: row => `${safeRender(row, 'userId')} | ${safeRender(row, 'user.displayName')}`,
    },
    {
      id: 'person',
      title: t('users.person'),
      render: row =>
        `${safeRender(row, 'personId')} | ${safeRender(row, 'person.firstname')} ${safeRender(row, 'person.lastname')}`,
    },
    {
      id: 'personType',
      title: t('users.personType'),
      render: row => safeRender(row, 'person.personType.type'),
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
        columns={addressColumns}
        apiPath={`enterprise-roots/${params.id}/addresses`}
        actionBasePath={`${params.id}/addresses`}
        actions={['view', 'edit', 'delete']}
      />

      <Table<EnterpriseRootContact>
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
        filters={<EnterpriseRootContactFilter />}
        columns={contactColumns}
        apiPath={`enterprise-roots/${params.id}/contacts`}
        actionBasePath={`${params.id}/contacts`}
        actions={['view', 'edit', 'delete']}
      />

      <Table<EnterpriseRootProject>
        className="mt-4"
        title={t('projects.title')}
        toolbars={[
          {
            icon: 'plus',
            label: t('projects.newProject'),
            colorClass: 'light-primary',
            href: `${params.id}/projects/new`,
          },
        ]}
        filters={<EnterpriseRootProjectFilter />}
        columns={projectColumns}
        apiPath={`enterprise-roots/${params.id}/projects`}
        actionBasePath={`${params.id}/projects`}
        actions={['view', 'edit', 'delete']}
      />

      <Table<EnterpriseRootCustomer>
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
        filters={<EnterpriseRootCustomerFilter />}
        columns={customerColumns}
        apiPath={`enterprise-roots/${params.id}/customers`}
        actionBasePath={`${params.id}/customers`}
        actions={['view', 'edit', 'delete']}
      />

      <Table<EnterpriseRootUser>
        className="mt-4"
        title={t('users.title')}
        toolbars={[
          {
            icon: 'plus',
            label: t('users.newUser'),
            colorClass: 'light-primary',
            href: `${params.id}/users/new`,
          },
        ]}
        filters={<EnterpriseRootUserFilter />}
        columns={userColumns}
        apiPath={`enterprise-roots/${params.id}/users`}
        actionBasePath={`${params.id}/users`}
        actions={['view', 'edit', 'delete']}
      />
    </>
  )
}
