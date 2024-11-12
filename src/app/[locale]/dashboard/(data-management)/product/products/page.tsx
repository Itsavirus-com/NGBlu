'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { Product } from '@/services/swr/models/product.type'

import { ProductFilter } from './components/product-filter'

export default function Products() {
  const t = useTranslations('dataManagement.products')

  const columns: TableColumn<Product>[] = [
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
    {
      id: 'description',
      title: t('description'),
      headClassName: 'text-start',
      render: row => row.description,
    },
    {
      id: 'type',
      title: t('type'),
      render: row => row.productType.productType,
    },
    {
      id: 'category',
      title: t('category'),
      render: row =>
        row.consumerProductOnly
          ? t('consumerProductOnly')
          : row.corporateProductOnly
            ? t('corporateProductOnly')
            : '-',
    },
  ]

  return (
    <Table<Product>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newProduct'),
          colorClass: 'light-primary',
          href: 'products/new',
        },
      ]}
      filters={<ProductFilter />}
      columns={columns}
      apiPath="products"
      actionBasePath="products"
      actions={['view', 'edit', 'delete']}
    />
  )
}
