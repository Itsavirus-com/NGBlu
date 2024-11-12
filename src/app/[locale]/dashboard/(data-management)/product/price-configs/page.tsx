'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { ProductPriceConfig } from '@/services/swr/models/product.type'

import { ProductPriceConfigsFilter } from './components/product-price-configs-filter'

export default function ProductPriceConfigs() {
  const t = useTranslations('dataManagement.products.priceConfig')

  const columns: TableColumn<ProductPriceConfig>[] = [
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
      render: row => row.product.name,
    },
    {
      id: 'pricePlan',
      title: t('pricePlan'),
      render: row => row.pricePlan.name,
    },
  ]

  return (
    <Table<ProductPriceConfig>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPriceConfig'),
          colorClass: 'light-primary',
          href: 'price-configs/new',
        },
      ]}
      filters={<ProductPriceConfigsFilter />}
      columns={columns}
      apiPath="products/price-configs"
      actionBasePath="price-configs"
      actions={['view', 'edit', 'delete']}
    />
  )
}
