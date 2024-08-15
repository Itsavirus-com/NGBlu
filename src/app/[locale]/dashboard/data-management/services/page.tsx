'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { Service } from '@/services/swr/models/service.type'

import { ServiceFilter } from './components/service-filter'

export default function Services() {
  const t = useTranslations('dataManagement.services')

  const columns: TableColumn<Service>[] = [
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
      id: 'description',
      title: t('description'),
      headClassName: 'text-start',
      render: row => row.description,
    },
    {
      id: 'type',
      title: t('type'),
      render: row => row.serviceType.serviceType,
    },
    {
      id: 'category',
      title: t('category'),
      render: row =>
        row.consumerOnlyService
          ? t('consumerServiceOnly')
          : row.corporateOnlyService
            ? t('corporateServiceOnly')
            : '-',
    },
  ]

  return (
    <Table<Service>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newService'),
          colorClass: 'light-primary',
          href: 'services/new',
        },
      ]}
      filters={<ServiceFilter />}
      columns={columns}
      apiPath="services"
      actionBasePath="services"
      actions={['view', 'edit', 'delete']}
    />
  )
}
