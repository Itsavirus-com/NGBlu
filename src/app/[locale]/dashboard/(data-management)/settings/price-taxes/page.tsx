'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/Table'
import { TableColumn } from '@/components/table/table.type'
import { PriceTax } from '@/services/swr/models/price-tax.type'
import { safeRender } from '@/utils/safeRender'

import { PriceTaxesFilter } from './_components/PriceTaxFilter'

export default function PriceCurrencies() {
  const t = useTranslations('dataManagement.prices.taxes')

  const columns: TableColumn<PriceTax>[] = [
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
    {
      id: 'value',
      title: t('value'),
      render: row => safeRender(row, 'taxValue'),
    },
    {
      id: 'unit',
      title: t('unit'),
      render: row => safeRender(row, 'priceUnit.unit'),
    },
    {
      id: 'currency',
      title: t('currency'),
      render: row => safeRender(row, 'country.currency'),
    },
    {
      id: 'country',
      title: t('country'),
      render: row => safeRender(row, 'country.name'),
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
