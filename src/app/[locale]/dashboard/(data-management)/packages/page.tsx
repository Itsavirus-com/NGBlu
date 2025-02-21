'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { Package } from '@/services/swr/models/package.type'
import { safeRender } from '@/utils/safeRender'

import { PackageFilter } from './_components/PackageFilter'

export default function Packages() {
  const t = useTranslations('dataManagement.packages')

  const columns: TableColumn<Package>[] = [
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
      render: row => safeRender(row, 'packageType.name'),
    },
  ]

  return (
    <Table<Package>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPackage'),
          colorClass: 'light-primary',
          href: 'packages/new',
        },
      ]}
      filters={<PackageFilter />}
      columns={columns}
      apiPath="packages"
      actionBasePath="packages"
      actions={['view', 'edit', 'delete']}
    />
  )
}
