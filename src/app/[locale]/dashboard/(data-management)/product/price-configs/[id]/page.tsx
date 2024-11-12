'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { useProductPriceConfig } from '@/services/swr/use-product-price-config'

export default function ProductPriceConfigDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.products.priceConfig')

  const { data, isLoading } = useProductPriceConfig(params.id)

  return (
    <>
      <PageTitle title={t('title')} />

      <Page>
        <Row>
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('productId')}
            value={data?.product.id}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('product')}
            value={data?.product.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('pricePlanId')}
            value={data?.pricePlan.id}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('pricePlan')}
            value={data?.pricePlan.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('orgUnitId')}
            value={data?.orgUnitId}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('businessPartnerId')}
            value={data?.businesspartnerId}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('enterpriseRootId')}
            value={data?.enterpriseRootId}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('activeFrom')}
            value={data?.activeFrom}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('activeTo')}
            value={data?.activeTo}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('createdAt')}
            value={data?.createdAt ? new Date(data?.updatedAt).toLocaleString() : '-'}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('updatedAt')}
            value={data?.updatedAt ? new Date(data?.updatedAt).toLocaleString() : '-'}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('deletedAt')}
            value={data?.deletedAt ? new Date(data?.deletedAt).toLocaleString() : '-'}
          />
        </Row>
      </Page>
    </>
  )
}
