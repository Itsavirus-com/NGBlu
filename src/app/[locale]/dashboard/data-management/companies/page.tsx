'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { Company } from '@/services/swr/models/company.type'

import { CompanyFilter } from './components/company-filter'

export default function Companies() {
  const t = useTranslations('dataManagement.companies')

  const columns: TableColumn<Company>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'name',
      title: t('name'),
      render: row => row.companyname,
    },
  ]

  return (
    <Table<Company>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newCompany'),
          colorClass: 'light-primary',
          href: 'companies/new',
        },
      ]}
      filters={<CompanyFilter />}
      columns={columns}
      apiPath="companies/infos"
      actionBasePath="companies"
      actions={['view', 'edit', 'delete']}
    />
  )
}
