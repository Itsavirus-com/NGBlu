'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/Table'
import { TableColumn } from '@/components/table/table.type'
import { PersonType } from '@/services/swr/models/person-type.type'

import { PersonTypeFilter } from './_components/PersonTypeFilter'

export default function PersonTypes() {
  const t = useTranslations('dataManagement.personTypes')

  const columns: TableColumn<PersonType>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'type',
      title: t('type'),
      render: row => row.type,
    },
  ]

  return (
    <Table<PersonType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPersonType'),
          colorClass: 'light-primary',
          href: 'person-types/new',
        },
      ]}
      filters={<PersonTypeFilter />}
      columns={columns}
      apiPath="persons/types"
      actionBasePath="person-types"
      actions={['edit', 'delete']}
    />
  )
}
