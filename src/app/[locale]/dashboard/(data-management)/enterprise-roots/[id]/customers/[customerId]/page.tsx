'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { EndClientContact } from '@/services/swr/models/end-client-contact.type'
import { useEnterpriseRootCustomer } from '@/services/swr/use-enterprise-root-customer'
import { safeRender } from '@/utils/safeRender'

import { EndClientContactFilter } from '../../../../end-clients/[id]/_components/end-client-contact-filter'

export default function EnterpriseRootCustomerDetails({
  params,
}: {
  params: { id: number; customerId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.customers')

  const { data, isLoading } = useEnterpriseRootCustomer(params.id, params.customerId)

  const customerInfoFields = [
    { label: t('name'), value: safeRender(data, 'endclient.name') },
    { label: t('type'), value: safeRender(data, 'endclient.type.type') },
    { label: t('status'), value: safeRender(data, 'endclient.status.status') },
    { label: t('accountNumber'), value: safeRender(data, 'endclient.accountNumber') },
    { label: t('referenceId'), value: safeRender(data, 'endclient.referenceId') },
    { label: t('afasId'), value: safeRender(data, 'endclient.afasId') },
  ]

  const addressFields = [
    { label: t('addressName'), value: safeRender(data, 'enterpriseRootAddresses.addressName') },
    { label: t('streetName'), value: safeRender(data, 'enterpriseRootAddresses.streetname') },
    {
      label: t('houseNumberSuffix'),
      value: safeRender(data, 'enterpriseRootAddresses.housenumberSuffix'),
    },
    { label: t('houseNumber'), value: safeRender(data, 'enterpriseRootAddresses.housenumber') },
    {
      label: t('apartmentNumber'),
      value: safeRender(data, 'enterpriseRootAddresses.appartmentNumber'),
    },
    { label: t('area'), value: safeRender(data, 'enterpriseRootAddresses.area') },
    { label: t('county'), value: safeRender(data, 'enterpriseRootAddresses.county') },
    { label: t('city'), value: safeRender(data, 'enterpriseRootAddresses.city') },
    { label: t('country'), value: safeRender(data, 'enterpriseRootAddresses.country.name') },
    { label: t('postalCode'), value: safeRender(data, 'enterpriseRootAddresses.postalcode') },
    { label: t('latitude'), value: safeRender(data, 'enterpriseRootAddresses.lat') },
    { label: t('longitude'), value: safeRender(data, 'enterpriseRootAddresses.lng') },
    {
      label: t('googleAddressId'),
      value: safeRender(data, 'enterpriseRootAddresses.googleAddressId'),
    },
  ]

  const contactColumns: TableColumn<EndClientContact>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'contact',
      title: t('contactInfo'),
      render: row =>
        `${safeRender(row, 'contactInfoId')} | ${safeRender(row, 'contactInfo.contactInfo')}`,
    },
    {
      id: 'responsibility',
      title: t('responsibility'),
      render: row =>
        `${safeRender(row, 'responsibilityId')} | ${safeRender(row, 'responsibility.responsibility')}`,
    },
  ]

  const tabs = [
    {
      eventKey: 'customerInfo',
      title: t('info'),
      content: (
        <FieldTextView
          fields={customerInfoFields}
          isLoading={isLoading}
          translation="dataManagement.enterpriseRoots.customers"
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'address',
      title: t('address'),
      content: (
        <FieldTextView
          fields={addressFields}
          isLoading={isLoading}
          translation="dataManagement.enterpriseRoots.customers"
        />
      ),
      condition: Boolean(data),
    },
    {
      eventKey: 'contacts',
      title: t('contacts'),
      content: (
        <Table<EndClientContact>
          className="mt-4"
          toolbars={[
            {
              icon: 'plus',
              label: t('newContact'),
              colorClass: 'light-primary',
              href: `${params.customerId}/contacts/new`,
            },
          ]}
          filters={<EndClientContactFilter />}
          columns={contactColumns}
          apiPath={`end-clients/${params.customerId}/contacts`}
          actionBasePath={`${params.customerId}/contacts`}
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

      <PageTitle title={`${t('endClient')}: ${safeRender(data, 'endclient.name')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="customerInfo" />
    </>
  )
}
