'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { PriceConfig } from '@/services/swr/models/price-config.type'
import { PricePlan } from '@/services/swr/models/price-plan.type'
import { ProductPriceConfig } from '@/services/swr/models/product.type'
import { useProduct } from '@/services/swr/use-product'

export default function ProductDetails({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.products')

  const { data } = useProduct(params.id)

  const getPriceConfig = (pricePlan: PricePlan): PriceConfig =>
    pricePlan?.priceConfig || pricePlan?.fallbackPriceConfig || {}

  const pricePlanColumns: TableColumn<PricePlan>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'name',
      title: t('name'),
      render: row => row.name,
    },
    {
      id: 'price',
      title: t('price'),
      render: row =>
        `${getPriceConfig(row).priceCurrency.currency} ${getPriceConfig(row).priceValue}`,
    },
    {
      id: 'unit',
      title: t('unit'),
      render: row => getPriceConfig(row).priceUnit.unit,
    },
    {
      id: 'interval',
      title: t('interval'),
      render: row => getPriceConfig(row).priceInterval.name,
    },
    {
      id: 'type',
      title: t('type'),
      render: row => getPriceConfig(row).priceType.type,
    },
    {
      id: 'tax',
      title: t('tax'),
      render: row =>
        `${getPriceConfig(row).priceTax.country.currency} ${getPriceConfig(row).priceTax.taxValue} / ${getPriceConfig(row).priceTax.priceUnit.unit}`,
    },
    {
      id: 'default',
      title: t('default'),
      render: row => (row.isDefault ? 'Yes' : 'No'),
    },
  ]

  const priceConfigColumns: TableColumn<ProductPriceConfig>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'activeFrom',
      title: t('activeFrom'),
      render: row => row.activeFrom,
    },
    {
      id: 'activeTo',
      title: t('activeTo'),
      render: row => row.activeTo,
    },
    {
      id: 'product',
      title: t('product'),
      render: row => `${row.product.id} | ${row.product.name}`,
    },
    {
      id: 'pricePlan',
      title: t('pricePlan'),
      render: row => `${row.pricePlan.id} | ${row.pricePlan.name}`,
    },
  ]

  return (
    <>
      <PageTitle title={data?.name || ''} description={data?.description} />

      <Table<PricePlan>
        title={t('pricePlans')}
        columns={pricePlanColumns}
        data={data?.pricePlans}
      />

      <Table<ProductPriceConfig>
        className="mt-6"
        title={t('priceConfigs')}
        columns={priceConfigColumns}
        data={data?.productPriceConfigs}
      />
    </>
  )
}
