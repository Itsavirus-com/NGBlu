'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { CreditCardType } from '@/services/swr/models/credit-card-type.type'
import { safeRender } from '@/utils/safeRender'

import { CreditCardTypeFilter } from './_components/CreditCardTypeFilter'

export default function CreditCardTypes() {
  const t = useTranslations('dataManagement.creditCardTypes')

  const columns: TableColumn<CreditCardType>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'type',
      title: t('type'),
      render: row => safeRender(row, 'creditcardType'),
    },
  ]

  return (
    <Table<CreditCardType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newCreditCardType'),
          colorClass: 'light-primary',
          href: 'credit-card-types/new',
        },
      ]}
      filters={<CreditCardTypeFilter />}
      columns={columns}
      apiPath="credit-cards/types"
      actionBasePath="credit-card-types"
      actions={['edit', 'delete']}
    />
  )
}
