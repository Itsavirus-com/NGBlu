'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useEnterpriseRootCustomer } from '@/services/swr/use-enterprise-root-customer'

import { CustomerAddress } from './components/customer-address'
import { CustomerInfo } from './components/customer-info'

export default function EnterpriseRootCustomerDetails({
  params,
}: {
  params: { id: number; customerId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.customers')

  const { data, isLoading } = useEnterpriseRootCustomer(params.id, params.customerId)

  const tabs = [
    {
      eventKey: 'customerInfo',
      title: t('endClientInfo'),
      content: <CustomerInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
    {
      eventKey: 'address',
      title: t('address'),
      content: <CustomerAddress data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <div className="app-container">
        <Breadcrumbs items={getBreadcrumbItems(data)} />
      </div>

      <PageTitle title={data?.endclient?.name || ''} />
      <DynamicTabs tabs={tabs} defaultActiveKey="customerInfo" />
    </>
  )
}
