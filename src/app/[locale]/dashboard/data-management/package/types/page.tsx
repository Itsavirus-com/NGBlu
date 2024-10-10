'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { PackageType } from '@/services/swr/models/package-type.type'

import { PackageTypesFilter } from './components/package-type-filter'

export default function PackageTypes() {
  const t = useTranslations('dataManagement.packages.types')

  const columns: TableColumn<PackageType>[] = [
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
    <Table<PackageType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPackageType'),
          colorClass: 'light-primary',
          href: 'types/new',
        },
      ]}
      filters={<PackageTypesFilter />}
      columns={columns}
      apiPath="packages/types"
      actionBasePath="types"
      actions={['edit', 'delete']}
    />
  )
}
