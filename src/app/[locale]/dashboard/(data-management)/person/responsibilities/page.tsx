'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { PersonResponsibility } from '@/services/swr/models/person-responsibility.type'
import { safeRender } from '@/utils/safeRender'

import { PersonResponsibilityFilter } from './_components/ResponsibilityFilter'

export default function PersonResponsibilities() {
  const t = useTranslations('dataManagement.personResponsibilities')

  const columns: TableColumn<PersonResponsibility>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'responsibility',
      title: t('responsibility'),
      render: row => safeRender(row, 'responsibility'),
    },
  ]

  return (
    <Table<PersonResponsibility>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newPersonResponsibility'),
          colorClass: 'light-primary',
          href: 'responsibilities/new',
        },
      ]}
      filters={<PersonResponsibilityFilter />}
      columns={columns}
      apiPath="persons/responsibilities"
      actionBasePath="responsibilities"
      actions={['edit', 'delete']}
    />
  )
}
