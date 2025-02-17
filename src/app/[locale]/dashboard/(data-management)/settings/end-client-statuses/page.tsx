'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { EndClientStatus } from '@/services/swr/models/end-client-status.type'
import { safeRender } from '@/utils/safeRender'

import { EndClientStatusFilter } from './_components/EndClientStatusFilter'

export default function EndClientStatuses() {
  const t = useTranslations('dataManagement.endClientStatuses')

  const columns: TableColumn<EndClientStatus>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'status',
      title: t('status'),
      render: row => safeRender(row, 'status'),
    },
  ]

  return (
    <Table<EndClientStatus>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newEndClientStatus'),
          colorClass: 'light-primary',
          href: 'end-client-statuses/new',
        },
      ]}
      filters={<EndClientStatusFilter />}
      columns={columns}
      apiPath="end-clients/statuses"
      actionBasePath="end-client-statuses"
      actions={['edit', 'delete']}
    />
  )
}
