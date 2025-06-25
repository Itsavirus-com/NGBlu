'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { CompanyStatus } from '@/services/swr/models/company-status.type'
import { safeRender } from '@/utils/safeRender'

import { CompanyStatusFilter } from './_components/CompanyStatusFilter'

export default function CompanyStatuses() {
  const t = useTranslations('dataManagement.companyStatuses')

  const columns: TableColumn<CompanyStatus>[] = [
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
