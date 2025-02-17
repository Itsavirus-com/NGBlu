'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { ServiceType } from '@/services/swr/models/service-type.type'
import { safeRender } from '@/utils/safeRender'

import { ServiceTypesFilter } from './_components/ServiceTypeFilter'

export default function ServiceTypes() {
  const t = useTranslations('dataManagement.services.types')

  const columns: TableColumn<ServiceType>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'type',
      title: t('type'),
      render: row => safeRender(row, 'serviceType'),
    },
  ]

  return (
    <Table<ServiceType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newServiceType'),
          colorClass: 'light-primary',
          href: 'service-types/new',
        },
      ]}
      filters={<ServiceTypesFilter />}
      columns={columns}
      apiPath="services/types"
      actionBasePath="service-types"
      actions={['edit', 'delete']}
    />
  )
}
