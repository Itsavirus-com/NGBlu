'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/Table'
import { TableColumn } from '@/components/table/table.type'
import { Currency } from '@/services/swr/models/currency.type'
import { safeRender } from '@/utils/safeRender'

import { CurrencyFilter } from './_components/CurrencyFilter'

export default function PriceCurrencies() {
  const t = useTranslations('dataManagement.prices.currencies')

  const columns: TableColumn<Currency>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'currency',
      title: t('currency'),
      render: row => safeRender(row, 'currency'),
    },
  ]

  return (
    <Table<Currency>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newCurrency'),
          colorClass: 'light-primary',
          href: 'currencies/new',
        },
      ]}
      filters={<CurrencyFilter />}
      columns={columns}
      apiPath="prices/currencies"
      actionBasePath="currencies"
      actions={['edit', 'delete']}
    />
  )
}
