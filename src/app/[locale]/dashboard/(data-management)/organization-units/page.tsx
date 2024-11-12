'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'

import { OrganizationUnitFilter } from './components/organization-unit-filter'

export default function Countries() {
  const t = useTranslations('dataManagement.organizationUnits')

  const columns: TableColumn<OrganizationUnit>[] = [
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
  ]

  return (
    <Table<OrganizationUnit>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newOrganizationUnit'),
          colorClass: 'light-primary',
          href: 'organization-units/new',
        },
      ]}
      filters={<OrganizationUnitFilter />}
      columns={columns}
      apiPath="organisational-units"
      actionBasePath="organization-units"
      actions={['view', 'edit', 'delete']}
    />
  )
}
