'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/Table'
import { TableColumn } from '@/components/table/table.type'
import { PriceConfig } from '@/services/swr/models/price-config.type'
import { PricePlan } from '@/services/swr/models/price-plan.type'
import { safeRender } from '@/utils/safeRender'

import { PricePlansFilter } from './_components/PricePlanFilter'

export default function PriceCurrencies() {
  const t = useTranslations('dataManagement.prices.plans')

  const getPriceConfig = (pricePlan: PricePlan): PriceConfig =>
    pricePlan?.priceConfig || pricePlan?.fallbackPriceConfig || {}

  const columns: TableColumn<PricePlan>[] = [
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
      id: 'price',
      title: t('price'),
      render: row =>
        safeRender(row, 'priceConfig.priceCurrency.currency') +
        ' ' +
        safeRender(row, 'priceConfig.priceValue'),
    },
    {
      id: 'unit',
      title: t('unit'),
      render: row => safeRender(row, 'priceConfig.priceUnit.unit'),
    },
    {
      id: 'interval',
      title: t('interval'),
      render: row => safeRender(row, 'priceConfig.priceInterval.name'),
    },
    {
      id: 'type',
      title: t('type'),
      render: row => safeRender(row, 'priceConfig.priceType.type'),
    },
    {
      id: 'tax',
      title: t('tax'),
      render: row =>
        safeRender(row, 'priceConfig.priceTax.country.currency') +
        ' ' +
        safeRender(row, 'priceConfig.priceTax.taxValue') +
        ' / ' +
        safeRender(row, 'priceConfig.priceTax.priceUnit.unit'),
    },
    {
      id: 'default',
      title: t('default'),
      render: row => (safeRender(row, 'isDefault') ? 'Yes' : 'No'),
    },
    {
      id: 'productOrService',
      title: t('productOrService'),
      render: row => safeRender(row, 'product.name') || safeRender(row, 'service.name') || '-',
    },
  ]

  return (
    <Table<PricePlan>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPricePlan'),
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
