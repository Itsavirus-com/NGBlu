'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { PriceType } from '@/services/swr/models/price-type.type'
import { safeRender } from '@/utils/safeRender'

import { PriceTypeFilter } from './components/price-type-filter'

export default function PriceTypes() {
  const t = useTranslations('dataManagement.prices.types')

  const columns: TableColumn<PriceType>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'type',
      title: t('type'),
      render: row => safeRender(row, 'type'),
    },
  ]

  return (
    <Table<PriceType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPriceType'),
          colorClass: 'light-primary',
          href: 'price-types/new',
        },
      ]}
      filters={<PriceTypeFilter />}
      columns={columns}
      apiPath="prices/types"
      actionBasePath="price-types"
      actions={['edit', 'delete']}
    />
  )
}
