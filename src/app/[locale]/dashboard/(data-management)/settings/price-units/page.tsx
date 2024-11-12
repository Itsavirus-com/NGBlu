'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { PriceUnit } from '@/services/swr/models/price-unit.type'

import { PriceUnitsFilter } from './components/price-unit-filter'

export default function PriceCurrencies() {
  const t = useTranslations('dataManagement.prices.units')

  const columns: TableColumn<PriceUnit>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'unit',
      title: t('unit'),
      render: row => row.unit,
    },
  ]

  return (
    <Table<PriceUnit>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPriceUnit'),
          colorClass: 'light-primary',
          href: 'units/new',
        },
      ]}
      filters={<PriceUnitsFilter />}
      columns={columns}
      apiPath="prices/units"
      actionBasePath="units"
      actions={['edit', 'delete']}
    />
  )
}
