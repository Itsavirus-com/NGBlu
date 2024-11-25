'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { PriceTax } from '@/services/swr/models/price-tax.type'

import { PriceTaxesFilter } from './components/price-tax-filter'

export default function PriceCurrencies() {
  const t = useTranslations('dataManagement.prices.taxes')

  const columns: TableColumn<PriceTax>[] = [
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
      id: 'value',
      title: t('value'),
      render: row => row.taxValue,
    },
    {
      id: 'unit',
      title: t('unit'),
      render: row => row.priceUnit.unit,
    },
    {
      id: 'currency',
      title: t('currency'),
      render: row => row.country.currency,
    },
    {
      id: 'country',
      title: t('country'),
      render: row => row.country.name,
    },
  ]

  return (
    <Table<PriceTax>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPriceTax'),
          colorClass: 'light-primary',
          href: 'price-taxes/new',
        },
      ]}
      filters={<PriceTaxesFilter />}
      columns={columns}
      apiPath="prices/taxes"
      actionBasePath="price-taxes"
      actions={['edit', 'delete']}
    />
  )
}
