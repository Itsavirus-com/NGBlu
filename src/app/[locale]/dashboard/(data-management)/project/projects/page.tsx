'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { Project } from '@/services/swr/models/project.type'

import { ProjectFilter } from './components/project-filter'

export default function Projects() {
  const t = useTranslations('dataManagement.projects')

  const columns: TableColumn<Project>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'projectName',
      title: t('projectName'),
      render: row => row.projectName,
    },
    {
      id: 'projectType',
      title: t('projectType'),
      render: row => row.projectType.projectType,
    },
  ]

  return (
    <Table<Project>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newProject'),
          colorClass: 'light-primary',
          href: 'projects/new',
        },
      ]}
      filters={<ProjectFilter />}
      columns={columns}
      apiPath="projects"
      actionBasePath="projects"
      actions={['view', 'edit', 'delete']}
    />
  )
}
