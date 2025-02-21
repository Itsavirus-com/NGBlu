'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { Person } from '@/services/swr/models/person.type'
import { safeRender } from '@/utils/safeRender'

import { PersonFilter } from './_components/PersonFilter'

export default function Persons() {
  const t = useTranslations('dataManagement.persons')

  const columns: TableColumn<Person>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'firstName',
      title: t('firstName'),
      render: row => safeRender(row, 'firstname'),
    },
    {
      id: 'lastName',
      title: t('lastName'),
      render: row => safeRender(row, 'lastname'),
    },
    {
      id: 'personType',
      title: t('personType'),
      render: row => safeRender(row, 'personType.type'),
    },
    {
      id: 'department',
      title: t('department'),
      render: row => safeRender(row, 'department'),
    },
  ]

  return (
    <Table<Person>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPerson'),
          colorClass: 'light-primary',
          href: 'persons/new',
        },
      ]}
      filters={<PersonFilter />}
      columns={columns}
      apiPath="persons"
      actionBasePath="persons"
      actions={['view', 'edit', 'delete']}
    />
  )
}
