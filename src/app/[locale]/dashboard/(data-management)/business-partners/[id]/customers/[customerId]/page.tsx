'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useBusinessPartnerCustomer } from '@/services/swr/use-business-partner-customer'
import { safeRender } from '@/utils/safeRender'

export default function BusinessPartnerCustomerDetails({
  params,
}: {
  params: { id: number; customerId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.customers')

  const { data, isLoading } = useBusinessPartnerCustomer(params.id, params.customerId)

  const customerFields = [
    { label: t('name'), value: safeRender(data, 'endclient.name') },
    { label: t('type'), value: safeRender(data, 'endclient.type.type') },
    { label: t('status'), value: safeRender(data, 'endclient.status.status') },
    { label: t('accountNumber'), value: safeRender(data, 'endclient.accountNumber') },
    { label: t('referenceId'), value: safeRender(data, 'endclient.referenceId') },
    { label: t('afasId'), value: safeRender(data, 'endclient.afasId') },
  ]

  const tabs = [
    {
      eventKey: 'customerInfo',
      title: t('info'),
      content: (
        <FieldTextView
          fields={customerFields}
          isLoading={isLoading}
          translation="dataManagement.businessPartners.customers"
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

      <PageTitle title={`${t('customerInfo')}: ${safeRender(data, 'endclient.name')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="customerInfo" />
    </>
  )
}
