'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { BusinessPartnerAddress } from '@/services/swr/models/business-partner-address.type'
import { BusinessPartnerContact } from '@/services/swr/models/business-partner-contact.type'
import { BusinessPartnerCustomer } from '@/services/swr/models/business-partner-customer.type'
import { BusinessPartnerProject } from '@/services/swr/models/business-partner-project.type'
import { BusinessPartnerUser } from '@/services/swr/models/business-partner-user.type'
import { useBusinessPartner } from '@/services/swr/use-business-partner'
import { safeRender } from '@/utils/safeRender'

import { BusinessPartnerAddressFilter } from './components/business-partner-address-filter'
import { BusinessPartnerContactFilter } from './components/business-partner-contact-filter'
import { BusinessPartnerCustomerFilter } from './components/business-partner-customer-filter'
import { BusinessPartnerInfo } from './components/business-partner-info'
import { BusinessPartnerProjectFilter } from './components/business-partner-project-filter'
import { BusinessPartnerUserFilter } from './components/business-partner-user-filter'

export default function BusinessPartnerDetails({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners')

  const { data, isLoading } = useBusinessPartner(Number(params.id))

  const addressColumns: TableColumn<BusinessPartnerAddress>[] = [
    {
      id: 'id',
      title: t('addresses.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'address',
      title: t('addresses.addressName'),
      render: row => `${safeRender(row, 'address.id')} | ${safeRender(row, 'address.addressName')}`,
    },
    {
      id: 'addressTyoe',
      title: t('addresses.addressType'),
      render: row =>
        `${safeRender(row, 'addressType.id')} | ${safeRender(row, 'addressType.addressType')}`,
    },
  ]

  const contactColumns: TableColumn<BusinessPartnerContact>[] = [
    {
      id: 'id',
      title: t('contacts.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'person',
      title: t('contacts.person'),
      render: row => `${safeRender(row, 'person.firstname')} ${safeRender(row, 'person.lastname')}`,
    },
  ]

  const customerColumns: TableColumn<BusinessPartnerCustomer>[] = [
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
  ]

  const projectColumns: TableColumn<BusinessPartnerProject>[] = [
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
  ]

  const userColumns: TableColumn<BusinessPartnerUser>[] = [
    {
      id: 'id',
      title: t('users.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'user',
      title: t('users.user'),
      render: row => `${safeRender(row, 'user.id')} | ${safeRender(row, 'user.displayName')}`,
    },
  ]

  const tabs = [
    {
      eventKey: 'businessPartnerInfo',
      title: t('businessPartnerInfo'),
      content: <BusinessPartnerInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
    {
      eventKey: 'addresses',
      title: t('addresses.title'),
      content: (
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
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'contacts',
      title: t('contacts.title'),
      content: (
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
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'customers',
      title: t('customers.title'),
      content: (
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
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'projects',
      title: t('projects.title'),
      content: (
        <Table<BusinessPartnerProject>
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
          filters={<BusinessPartnerProjectFilter />}
          columns={projectColumns}
          apiPath={`business-partners/${params.id}/projects`}
          actionBasePath={`${params.id}/projects`}
          actions={['view', 'edit', 'delete']}
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'users',
      title: t('users.title'),
      content: (
        <Table<BusinessPartnerUser>
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
          filters={<BusinessPartnerUserFilter />}
          columns={userColumns}
          apiPath={`business-partners/${params.id}/users`}
          actionBasePath={`${params.id}/users`}
          actions={['view', 'edit', 'delete']}
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <div className="app-container">
        <Breadcrumbs items={getBreadcrumbItems(data)} />
      </div>

      <PageTitle title={data?.name || ''} />
      <DynamicTabs tabs={tabs} defaultActiveKey="businessPartnerInfo" />
    </>
  )
}
