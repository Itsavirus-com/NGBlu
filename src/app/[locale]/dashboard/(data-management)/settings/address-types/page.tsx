'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { AddressType } from '@/services/swr/models/address-type.type'
import { safeRender } from '@/utils/safeRender'

import { AddressTypeFilter } from './components/address-type-filter'

export default function AddressTypes() {
  const t = useTranslations('dataManagement.addressTypes')

  const columns: TableColumn<AddressType>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'addressType',
      title: t('addressType'),
      render: row => safeRender(row, 'addressType'),
    },
  ]

  return (
    <Table<AddressType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newAddressType'),
          colorClass: 'light-primary',
          href: 'address-types/new',
        },
      ]}
      filters={<AddressTypeFilter />}
      columns={columns}
      apiPath="addresses/types"
      actionBasePath="address-types"
      actions={['edit', 'delete']}
    />
  )
}
