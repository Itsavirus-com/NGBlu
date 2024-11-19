'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { ServicePriceConfig } from '@/services/swr/models/service.type'

import { ServicePriceConfigsFilter } from './components/service-price-configs-filter'

export default function ServicePriceConfigs() {
  const t = useTranslations('dataManagement.services.priceConfig')

  const columns: TableColumn<ServicePriceConfig>[] = [
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
      id: 'service',
      title: t('service'),
      render: row => row.service.name,
    },
    {
      id: 'pricePlan',
      title: t('pricePlan'),
      render: row => row.pricePlan.name,
    },
  ]

  return (
    <Table<ServicePriceConfig>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPriceConfig'),
          colorClass: 'light-primary',
          href: 'price-configs/new',
        },
      ]}
      filters={<ServicePriceConfigsFilter />}
      columns={columns}
      apiPath="services/price-configs"
      actionBasePath="price-configs"
      actions={['view', 'edit', 'delete']}
    />
  )
}
