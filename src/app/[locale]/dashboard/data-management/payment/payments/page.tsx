'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { Payment } from '@/services/swr/models/payment.type'

import { PaymentFilter } from './components/payment-filter'

export default function Payments() {
  const t = useTranslations('dataManagement.payments')

  const columns: TableColumn<Payment>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'personName',
      title: t('personName'),
      render: row => `${row.person.firstname} ${row.person.lastname}`,
    },
    {
      id: 'bankName',
      title: t('bankName'),
      render: row => row.bankname,
    },
    {
      id: 'paymentType',
      title: t('paymentType'),
      render: row => row.paymentType?.paymentType,
    },
  ]

  return (
    <Table<Payment>
      title={t('title')}
      filters={<PaymentFilter />}
      columns={columns}
      apiPath="payments/details"
      actionBasePath="payments"
      actions={['view']}
    />
  )
}
