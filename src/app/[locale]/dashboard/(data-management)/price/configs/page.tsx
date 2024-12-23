'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { PriceConfig } from '@/services/swr/models/price-config.type'
import { safeRender } from '@/utils/safeRender'

import { PriceConfigFilter } from './components/price-config-filter'

export default function PriceConfigs() {
  const t = useTranslations('dataManagement.prices.configs')

  const columns: TableColumn<PriceConfig>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'price',
      title: t('price'),
      render: row =>
        safeRender(row, 'priceCurrency.currency') + ' ' + safeRender(row, 'priceValue'),
    },
    {
      id: 'unit',
      title: t('unit'),
      render: row => safeRender(row, 'priceUnit.unit'),
    },
    {
      id: 'interval',
      title: t('interval'),
      render: row => safeRender(row, 'priceInterval.name'),
    },
    {
      id: 'type',
      title: t('type'),
      render: row => safeRender(row, 'priceType.type'),
    },
    {
      id: 'tax',
      title: t('tax'),
      render: row =>
        safeRender(row, 'priceTax.country.currency') +
        ' ' +
        safeRender(row, 'priceTax.taxValue') +
        ' / ' +
        safeRender(row, 'priceTax.priceUnit.unit'),
    },
  ]

  return (
    <Table<PriceConfig>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPriceConfig'),
          colorClass: 'light-primary',
          href: 'configs/new',
        },
      ]}
      filters={<PriceConfigFilter />}
      columns={columns}
      apiPath="prices/configs"
      actionBasePath="configs"
      actions={['edit', 'delete']}
    />
  )
}
