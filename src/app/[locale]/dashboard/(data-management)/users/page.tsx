'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { DateTimeView } from '@/components/view/date-time-view/date-time-view'
import { User } from '@/services/swr/models/user.type'
import { safeRender } from '@/utils/safeRender'

import { UserFilter } from './_components/UserFilter'

export default function Users() {
  const t = useTranslations('dataManagement.users')

  const columns: TableColumn<User>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'displayName',
      title: t('displayName'),
      render: row => safeRender(row, 'displayName'),
    },
    {
      id: 'email',
      title: t('email'),
      render: row => safeRender(row, 'email'),
    },
    {
      id: 'lastLogin',
      title: t('lastLogin'),
      render: row => (
        <DateTimeView
          value={safeRender(row, 'lastLogin')}
          disableColumn
          customEmptyText={t('loginRequired')}
        />
      ),
    },
    {
      id: 'status',
      title: t('status'),
      render: row => safeRender(row, 'stateUser'),
    },
  ]

  return (
    <Table<User>
      title={t('title')}
      toolbars={[
        {
          icon: 'plus',
          label: t('newUser'),
          colorClass: 'light-primary',
          href: 'users/new',
        },
      ]}
      filters={<UserFilter />}
      columns={columns}
      apiPath="users"
      actionBasePath="users"
      actions={['edit', 'delete']}
    />
  )
}
