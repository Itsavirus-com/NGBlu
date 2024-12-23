'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { getBreadcrumbItems } from '@/components/breadcrumbs/helper'
import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useBusinessPartnerCustomer } from '@/services/swr/use-business-partner-customer'

export default function BusinessPartnerCustomerDetails({
  params,
}: {
  params: { id: number; customerId: number }
}) {
  const t = useTranslations('dataManagement.businessPartners.customers')

  const { data, isLoading } = useBusinessPartnerCustomer(params.id, params.customerId)

  return (
    <>
      <div className="app-container">
        <Breadcrumbs items={getBreadcrumbItems(data)} />
      </div>

      <PageTitle title={t('title')} />

      <Page title={t('endClient')}>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('name')}
            value={data?.endclient.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('type')}
            value={data?.endclient.type?.type}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('status')}
            value={data?.endclient.status?.status}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('accountNumber')}
            value={data?.endclient.accountNumber}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('referenceId')}
            value={data?.endclient.referenceId}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('afasId')}
            value={data?.endclient.afasId}
          />
        </Row>
      </Page>
    </>
  )
}
