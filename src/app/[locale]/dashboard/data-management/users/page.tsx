'use client'
import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { BinaryView } from '@/components/view/binary-view/binary-view'
import { DateTimeView } from '@/components/view/date-time-view/date-time-view'
import { User } from '@/services/swr/models/user.type'

import { UserFilter } from './components/user-filter'

export default function Users() {
  const t = useTranslations('dataManagement.users')

  const columns: TableColumn<User>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => row.id,
    },
    {
      id: 'displayName',
      title: t('displayName'),
      render: row => row.displayName,
    },
    {
      id: 'email',
      title: t('email'),
      render: row => row.email,
    },
    {
      id: 'lastLogin',
      title: t('lastLogin'),
      render: row => <DateTimeView value={row.lastLogin} disableColumn />,
    },
    {
      id: 'blocked',
      title: t('blocked'),
      render: row => <BinaryView value={!!row.blockedAt} disableColumn />,
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
