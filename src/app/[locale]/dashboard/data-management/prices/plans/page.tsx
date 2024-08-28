'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { PriceConfig } from '@/services/swr/models/price-config.type'
import { PricePlan } from '@/services/swr/models/price-plan.type'

import { PricePlansFilter } from './components/price-plan-filter'


export default function PriceCurrencies() {
  const t = useTranslations('dataManagement.prices.plans')

  const getPriceConfig = (pricePlan: PricePlan): PriceConfig =>
    pricePlan?.priceConfig || pricePlan?.fallbackPriceConfig || {}

  const columns: TableColumn<PricePlan>[] = [
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
    {
      id: 'productOrService',
      title: t('productOrService'),
      render: row => row.product?.name || row.service?.name || '-',
    },
  ]

  return (
    <Table<PricePlan>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPriceInterval'),
          colorClass: 'light-primary',
          href: 'plans/new',
        },
      ]}
      filters={<PricePlansFilter />}
      columns={columns}
      apiPath="prices/plans"
      actionBasePath="plans"
      actions={['edit', 'delete']}
    />
  )
}
