'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { useBusinessPartnerCustomer } from '@/services/swr/use-business-partner-customer'

import { CustomerInfo } from './components/customer-info'

export default function BusinessPartnerCustomerDetails({
  params,
}: {
  params: { id: number; customerId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.customers')

  const { data, isLoading } = useBusinessPartnerCustomer(params.id, params.customerId)

  const tabs = [
    {
      eventKey: 'customerInfo',
      title: t('customerInfo'),
      content: <CustomerInfo data={data} isLoading={isLoading} />,
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <div className="app-container">
        <Breadcrumbs items={getBreadcrumbItems(data)} />
      </div>

      <PageTitle title={t('title')} />
      <DynamicTabs tabs={tabs} defaultActiveKey="customerInfo" />
    </>
  )
}
