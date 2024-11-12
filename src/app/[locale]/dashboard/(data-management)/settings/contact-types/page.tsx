'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { ContactType } from '@/services/swr/models/contact-type.type'

import { ContactTypeFilter } from './components/contact-type-filter'

export default function ContactTypes() {
  const t = useTranslations('dataManagement.contactTypes')

  const columns: TableColumn<ContactType>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'type',
      title: t('type'),
      render: row => row.contactType,
    },
  ]

  return (
    <Table<ContactType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newContactType'),
          colorClass: 'light-primary',
          href: 'contact-types/new',
        },
      ]}
      filters={<ContactTypeFilter />}
      columns={columns}
      apiPath="contacts/types"
      actionBasePath="contact-types"
      actions={['edit', 'delete']}
    />
  )
}
