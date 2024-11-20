'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { ProductType } from '@/services/swr/models/product-type.type'

import { ProductTypesFilter } from './components/product-type-filter'

export default function ProductTypes() {
  const t = useTranslations('dataManagement.products.types')

  const columns: TableColumn<ProductType>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'name',
      title: t('type'),
      render: row => row.productType,
    },
  ]

  return (
    <Table<ProductType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newProductType'),
          colorClass: 'light-primary',
          href: 'product-types/new',
        },
      ]}
      filters={<ProductTypesFilter />}
      columns={columns}
      apiPath="products/types"
      actionBasePath="product-types"
      actions={['edit', 'delete']}
    />
  )
}
