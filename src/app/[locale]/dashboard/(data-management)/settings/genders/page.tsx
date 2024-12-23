'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { Gender } from '@/services/swr/models/gender.type'
import { safeRender } from '@/utils/safeRender'

import { GenderFilter } from './components/gender-filter'

export default function Genders() {
  const t = useTranslations('dataManagement.genders')

  const columns: TableColumn<Gender>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'gender',
      title: t('gender'),
      render: row => safeRender(row, 'gender'),
    },
  ]

  return (
    <Table<Gender>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newGender'),
          colorClass: 'light-primary',
          href: 'genders/new',
        },
      ]}
      filters={<GenderFilter />}
      columns={columns}
      apiPath="genders"
      actionBasePath="genders"
      actions={['edit']}
    />
  )
}
