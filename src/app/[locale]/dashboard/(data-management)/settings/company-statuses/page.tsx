'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { CompanyStatus } from '@/services/swr/models/company-status.type'

import { CompanyStatusFilter } from './components/company-status-filter'

export default function CompanyStatuses() {
  const t = useTranslations('dataManagement.companyStatuses')

  const columns: TableColumn<CompanyStatus>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'status',
      title: t('status'),
      render: row => row.status,
    },
  ]

  return (
    <Table<CompanyStatus>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newCompanyStatus'),
          colorClass: 'light-primary',
          href: 'company-statuses/new',
        },
      ]}
      filters={<CompanyStatusFilter />}
      columns={columns}
      apiPath="companies/statuses"
      actionBasePath="company-statuses"
      actions={['edit', 'delete']}
    />
  )
}
