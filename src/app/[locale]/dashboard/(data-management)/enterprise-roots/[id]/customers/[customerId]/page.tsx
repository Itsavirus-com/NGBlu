'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/DynamicTabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/FieldTextView'
import { useEnterpriseRootCustomerNamespace } from '@/services/swr/use-enterprise-root'
import { useEnterpriseRootCustomer } from '@/services/swr/use-enterprise-root-customer'
import { safeRender } from '@/utils/safeRender'

export default function EnterpriseRootCustomerDetails({
  params,
}: {
  params: { id: number; customerId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.customers')

  const { data, isLoading } = useEnterpriseRootCustomer(params.id, params.customerId)
  const { data: customerNamespaceData } = useEnterpriseRootCustomerNamespace(
    params.id,
    params.customerId
  )

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
  ]

  return (
    <>
      <div className="app-container">
        <Breadcrumbs items={getBreadcrumbItems({ namespace: customerNamespaceData })} />
      </div>

      <PageTitle title={`${t('endClient')}: ${safeRender(data, 'endclient.name')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="customerInfo" />
    </>
  )
}
