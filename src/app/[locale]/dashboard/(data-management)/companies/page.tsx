'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/Table'
import { TableColumn } from '@/components/table/table.type'
import { Company } from '@/services/swr/models/company.type'
import { safeRender } from '@/utils/safeRender'

import { CompanyFilter } from './_components/company-filter'

export default function Companies() {
  const t = useTranslations('dataManagement.companies')

  const columns: TableColumn<Company>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'name',
      title: t('name'),
      render: row => safeRender(row, 'companyname'),
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
