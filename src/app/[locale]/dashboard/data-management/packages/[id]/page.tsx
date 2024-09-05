'use client'

import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { PageTitle } from '@/components/page-title'
import { TextView } from '@/components/view/text-view/text-view'
import { usePackage } from '@/services/swr/use-package'

export default function PackageDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.packages')

  const { data, isLoading } = usePackage(params.id)

  return (
    <>
      <PageTitle title={data?.name || ''} />

      <Page>
        <Row>
          <TextView className="my-3" isLoading={isLoading} label={t('name')} value={data?.name} />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('type')}
            value={data?.packageType?.name}
          />
        </Row>

        <Row className="mt-6">
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('price')}
            value={`${data?.priceConfig?.priceCurrency?.currency} ${data?.priceConfig?.priceValue}`}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('priceUnit')}
            value={data?.priceConfig?.priceUnit?.unit}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('priceInterval')}
            value={data?.priceConfig?.priceInterval?.name}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('priceType')}
            value={data?.priceConfig?.priceType?.type}
          />
          <TextView
            className="my-3"
            isLoading={isLoading}
            label={t('tax')}
            value={`${data?.priceConfig?.priceTax.country.currency} ${data?.priceConfig?.priceTax.taxValue} / ${data?.priceConfig?.priceTax.priceUnit.unit}`}
          />
        </Row>
      </Page>
    </>
  )
}
