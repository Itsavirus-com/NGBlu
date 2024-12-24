'use client'

import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { ProjectInfo } from '@/services/swr/models/project-info.type'
import { safeRender } from '@/utils/safeRender'

import { ProjectInfoFilter } from './components/project-info-filter'

export default function ProjectInfos() {
  const t = useTranslations('dataManagement.projects.infos')

  const columns: TableColumn<ProjectInfo>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'projectInfo',
      title: t('projectInfo'),
      render: row => safeRender(row, 'projectInfo'),
    },
  ]

  return (
    <Table<ProjectInfo>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newProjectInfo'),
          colorClass: 'light-primary',
          href: 'infos/new',
        },
      ]}
      filters={<ProjectInfoFilter />}
      columns={columns}
      apiPath="projects/infos"
      actionBasePath="infos"
      actions={['edit', 'delete']}
    />
  )
}
