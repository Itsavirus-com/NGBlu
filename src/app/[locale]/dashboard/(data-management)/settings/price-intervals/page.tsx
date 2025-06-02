'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/Table'
import { TableColumn } from '@/components/table/table.type'
import { PriceInterval } from '@/services/swr/models/price-interval.type'
import { safeRender } from '@/utils/safeRender'

import { PriceIntervalsFilter } from './_components/PriceIntervalFilter'

export default function PriceCurrencies() {
  const t = useTranslations('dataManagement.prices.intervals')

  const columns: TableColumn<PriceInterval>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'name',
      title: t('name'),
      render: row => safeRender(row, 'name'),
    },
  ]

  return (
    <Table<PriceInterval>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPriceInterval'),
          colorClass: 'light-primary',
          href: 'price-intervals/new',
        },
      ]}
      filters={<PriceIntervalsFilter />}
      columns={columns}
      apiPath="prices/intervals"
      actionBasePath="price-intervals"
      actions={['edit', 'delete']}
    />
  )
}
