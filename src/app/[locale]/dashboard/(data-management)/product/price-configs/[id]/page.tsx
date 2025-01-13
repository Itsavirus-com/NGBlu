'use client'

import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'

import { DynamicTabs } from '@/components/dynamic-tabs/dynamic-tabs'
import { PageTitle } from '@/components/page-title'
import { dateTimeFormats } from '@/components/view/date-time-view/date-time-view.type'
import { FieldTextView } from '@/components/view/field-text-view/field-text-view'
import { useProductPriceConfig } from '@/services/swr/use-product-price-config'
import { safeRender } from '@/utils/safeRender'

export default function ProductPriceConfigDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.products.priceConfig')

  const { data, isLoading } = useProductPriceConfig(params.id)

  const priceConfigFields = [
    { label: t('productId'), value: safeRender(data, 'product.id') },
    { label: t('product'), value: safeRender(data, 'product.name') },
    { label: t('pricePlanId'), value: safeRender(data, 'pricePlan.id') },
    { label: t('pricePlan'), value: safeRender(data, 'pricePlan.name') },
    { label: t('orgUnitId'), value: safeRender(data, 'orgUnitId') },
    { label: t('businessPartnerId'), value: safeRender(data, 'businesspartnerId') },
    { label: t('enterpriseRootId'), value: safeRender(data, 'enterpriseRootId') },
    {
      label: t('activeFrom'),
      value: data?.activeFrom ? dayjs(data.activeFrom).format(dateTimeFormats.default) : '-',
    },
    {
      label: t('activeTo'),
      value: data?.activeTo ? dayjs(data.activeTo).format(dateTimeFormats.default) : '-',
    },
    {
      label: t('createdAt'),
      value: data?.createdAt ? dayjs(data.createdAt).format(dateTimeFormats.default) : '-',
    },
    {
      label: t('updatedAt'),
      value: data?.updatedAt ? dayjs(data.updatedAt).format(dateTimeFormats.default) : '-',
    },
    {
      label: t('deletedAt'),
      value: data?.deletedAt ? dayjs(data.deletedAt).format(dateTimeFormats.default) : '-',
    },
  ]

  const tabs = [
    {
      eventKey: 'generalInfo',
      title: t('generalInfo'),
      content: (
        <FieldTextView
          fields={priceConfigFields}
          isLoading={isLoading}
          translation="dataManagement.products.priceConfig"
        />
      ),
      condition: Boolean(data),
    },
  ]

  return (
    <>
      <PageTitle title={`${t('priceConfig')}: ${safeRender(data, 'product.name')}`} />
      <DynamicTabs tabs={tabs} defaultActiveKey="generalInfo" />
    </>
  )
}
