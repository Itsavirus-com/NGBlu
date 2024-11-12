'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { ProjectType } from '@/services/swr/models/project-type'

import { ProjectTypesFilter } from './components/project-type-filter'

export default function PackageTypes() {
  const t = useTranslations('dataManagement.projects.types')

  const columns: TableColumn<ProjectType>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'name',
      title: t('type'),
      render: row => row.projectType,
    },
  ]

  return (
    <Table<ProjectType>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newProjectType'),
          colorClass: 'light-primary',
          href: 'types/new',
        },
      ]}
      filters={<ProjectTypesFilter />}
      columns={columns}
      apiPath="projects/types"
      actionBasePath="types"
      actions={['edit', 'delete']}
    />
  )
}
