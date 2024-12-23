'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { Address } from '@/services/swr/models/address.type'
import { safeRender } from '@/utils/safeRender'

import { AddressFilter } from './components/address-filter'

export default function Users() {
  const t = useTranslations('dataManagement.addresses')

  const columns: TableColumn<Address>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'name',
      title: t('name'),
      render: row => safeRender(row, 'addressName'),
    },
  ]

  return (
    <Table<Address>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newAddress'),
          colorClass: 'light-primary',
          href: 'addresses/new',
        },
      ]}
      filters={<AddressFilter />}
      columns={columns}
      apiPath="addresses"
      actionBasePath="addresses"
      actions={['view', 'edit', 'delete']}
    />
  )
}
