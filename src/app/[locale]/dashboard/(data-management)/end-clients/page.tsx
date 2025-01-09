'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { EndClient } from '@/services/swr/models/end-client.type'
import { safeRender } from '@/utils/safeRender'

import { EndClientFilter } from './_components/end-client-filter'

export default function EndClients() {
  const t = useTranslations('dataManagement.endClients')

  const columns: TableColumn<EndClient>[] = [
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
      id: 'type',
      title: t('type'),
      render: row => safeRender(row, 'type.type'),
    },
    {
      id: 'status',
      title: t('status'),
      render: row => safeRender(row, 'status.status'),
    },
  ]

  return (
    <Table<EndClient>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newEndClient'),
          colorClass: 'light-primary',
          href: 'end-clients/new',
        },
      ]}
      filters={<EndClientFilter />}
      columns={columns}
      apiPath="end-clients"
      actionBasePath="end-clients"
      actions={['view', 'edit', 'delete']}
    />
  )
}
