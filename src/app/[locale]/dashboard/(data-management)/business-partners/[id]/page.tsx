'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/Table'
import { TableColumn } from '@/components/table/table.type'
import { FieldTextView } from '@/components/view/field-text-view/FieldTextView'
import { BusinessPartnerAddress } from '@/services/swr/models/business-partner-address.type'
import { BusinessPartnerContact } from '@/services/swr/models/business-partner-contact.type'
import { BusinessPartnerCustomer } from '@/services/swr/models/business-partner-customer.type'
import { BusinessPartnerProject } from '@/services/swr/models/business-partner-project.type'
import { BusinessPartnerUser } from '@/services/swr/models/business-partner-user.type'
import {
  useBusinessPartner,
  useBusinessPartnerNamespace,
} from '@/services/swr/use-business-partner'
import { safeRender } from '@/utils/safeRender'

import { BusinessPartnerAddressFilter } from './_components/business-partner-address-filter'
import { BusinessPartnerContactFilter } from './_components/business-partner-contact-filter'
import { BusinessPartnerCustomerFilter } from './_components/business-partner-customer-filter'
import { BusinessPartnerProjectFilter } from './_components/business-partner-project-filter'
import { BusinessPartnerUserFilter } from './_components/business-partner-user-filter'
import { BusinessPartnerFilter } from './_components/BusinessPartnerFilter'

export default function BusinessPartnerDetails({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.businessPartners')

  const { data, isLoading } = useBusinessPartner(Number(params.id))
  const { data: namespaceData } = useBusinessPartnerNamespace(Number(params.id))

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

  const businessPartnerCustomerColumns: TableColumn<BusinessPartnerCustomer>[] = [
    {
      id: 'id',
      title: t('businessPartnerCustomers.id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'businessPartner',
      title: t('businessPartnerCustomers.title'),
      render: row => `${safeRender(row, 'id')} | ${safeRender(row, 'name')}`,
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

  const businessPartnerInfofields = [
    { label: t('name'), value: safeRender(data, 'name') },
    { label: t('company'), value: safeRender(data, 'companyInfo.companyname') },
    { label: t('type'), value: safeRender(data, 'businessPartnerType.name') },
    { label: t('addressCount'), value: safeRender(data, 'businessPartnerAddressesCount') },
    { label: t('contactCount'), value: safeRender(data, 'businessPartnerContactsCount') },
    { label: t('customerCount'), value: safeRender(data, 'businessPartnerCustomersCount') },
    { label: t('projectCount'), value: safeRender(data, 'businessPartnerProjectsCount') },
    { label: t('userCount'), value: safeRender(data, 'businessPartnerUsersCount') },
  ]

  const tabs = [
    {
      eventKey: 'businessPartnerInfo',
      title: t('businessPartnerInfo'),
      content: (
        <FieldTextView
          fields={businessPartnerInfofields}
          isLoading={isLoading}
          translation="dataManagement.businessPartners"
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'addresses',
      title: t('addresses.addresses'),
      content: (
        <Table<BusinessPartnerAddress>
          className="mt-4"
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
      title: t('contacts.contacts'),
      content: (
        <Table<BusinessPartnerContact>
          className="mt-4"
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
      title: t('customers.customers'),
      content: (
        <Table<BusinessPartnerCustomer>
          className="mt-4"
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
      eventKey: 'businessPartnerCustomer',
      title: t('businessPartnerCustomers.title'),
      content: (
        <Table<BusinessPartnerCustomer>
          className="mt-4"
          filters={<BusinessPartnerFilter />}
          columns={businessPartnerCustomerColumns}
          apiPath={`business-partners/${params.id}/business-customers`}
          actions={['view']}
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'projects',
      title: t('projects.projects'),
      content: (
        <Table<BusinessPartnerProject>
          className="mt-4"
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
      title: t('users.users'),
      content: (
        <Table<BusinessPartnerUser>
          className="mt-4"
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
        <Breadcrumbs items={getBreadcrumbItems({ namespace: namespaceData })} />
      </div>

      <PageTitle title={`${t('businessPartner')}: ${safeRender(data, 'name')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="businessPartnerInfo" />
    </>
  )
}
