'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { PaymentType } from '@/services/swr/models/payment-type.type'

import { PaymentTypeFilter } from './components/payment-type-filter'

export default function PaymentTypes() {
  const t = useTranslations('dataManagement.paymentTypes')

  const columns: TableColumn<PaymentType>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'name',
      title: t('name'),
      render: row => row.paymentType,
    },
  ]

  return (
    <Table<PaymentType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newCreditCardBrand'),
          colorClass: 'light-primary',
          href: 'types/new',
        },
      ]}
      filters={<PaymentTypeFilter />}
      columns={columns}
      apiPath="payments/types"
      actionBasePath="types"
      actions={['edit', 'delete']}
    />
  )
}
