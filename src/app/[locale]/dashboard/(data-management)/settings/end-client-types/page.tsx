'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { EndClientType } from '@/services/swr/models/end-client-type.type'
import { safeRender } from '@/utils/safeRender'

import { EndClientTypeFilter } from './components/end-client-type-filter'

export default function EndClientTypes() {
  const t = useTranslations('dataManagement.endClientTypes')

  const columns: TableColumn<EndClientType>[] = [
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
    <Table<EndClientType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newEndClientType'),
          colorClass: 'light-primary',
          href: 'end-client-types/new',
        },
      ]}
      filters={<EndClientTypeFilter />}
      columns={columns}
      apiPath="end-clients/types"
      actionBasePath="end-client-types"
      actions={['edit', 'delete']}
    />
  )
}
