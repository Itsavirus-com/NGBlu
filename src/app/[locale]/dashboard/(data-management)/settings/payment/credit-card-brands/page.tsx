'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { CreditCardBrand } from '@/services/swr/models/credit-card-brand.type'
import { safeRender } from '@/utils/safeRender'

import { CreditCardBrandFilter } from './_components/CreditCardBrandFilter'

export default function CreditCardBrands() {
  const t = useTranslations('dataManagement.creditCardBrands')

  const columns: TableColumn<CreditCardBrand>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'brand',
      title: t('brand'),
      render: row => safeRender(row, 'brandname'),
    },
  ]

  return (
    <Table<CreditCardBrand>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newCreditCardBrand'),
          colorClass: 'light-primary',
          href: 'credit-card-brands/new',
        },
      ]}
      filters={<CreditCardBrandFilter />}
      columns={columns}
      apiPath="credit-cards/brands"
      actionBasePath="credit-card-brands"
      actions={['edit', 'delete']}
    />
  )
}
