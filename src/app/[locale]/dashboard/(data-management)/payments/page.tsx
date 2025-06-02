'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/Table'
import { TableColumn } from '@/components/table/table.type'
import { Payment } from '@/services/swr/models/payment.type'
import { safeRender } from '@/utils/safeRender'

import { PaymentFilter } from './_components/PaymentFilter'

export default function Payments() {
  const t = useTranslations('dataManagement.payments')

  const columns: TableColumn<Payment>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'personName',
      title: t('personName'),
      render: row => safeRender(row, 'person.firstname') + ' ' + safeRender(row, 'person.lastname'),
    },
    {
      id: 'bankName',
      title: t('bankCreditCardName'),
      render: row =>
        row?.paymentType?.paymentType === 'Bank'
          ? safeRender(row, 'bankname')
          : safeRender(row, 'creditCardBrand.brandname'),
    },
    {
      id: 'paymentType',
      title: t('paymentType'),
      render: row => safeRender(row, 'paymentType.paymentType'),
    },
  ]

  return (
    <Table<Payment>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPayment'),
          colorClass: 'light-primary',
          href: 'payments/new',
        },
      ]}
      filters={<PaymentFilter />}
      columns={columns}
      apiPath="payments/details"
      actionBasePath="payments"
      actions={['view', 'edit', 'delete']}
      queryParams={{
        selectedPayment: 'paymentType.paymentType',
      }}
    />
  )
}
