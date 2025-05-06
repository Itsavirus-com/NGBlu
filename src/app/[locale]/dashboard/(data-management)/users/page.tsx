'use client'
import { useTranslations } from 'next-intl'

import { ButtonProps } from '@/components/button/button.type'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { DateTimeView } from '@/components/view/date-time-view/date-time-view'
import { CAPITALIZE_WORD_REGEX, UNDERSCORE_REGEX } from '@/constants/regex'
import { User } from '@/services/swr/models/user.type'
import { safeRender } from '@/utils/safeRender'

import { UserFilter } from './_components/UserFilter'
import useUserForm from './_hooks/user-form.hook'

export default function Users() {
  const t = useTranslations('dataManagement.users')
  const { resendActivationEmail, isResendingActivation, isSubmitting } = useUserForm()

  const columns: TableColumn<User>[] = [
    {
      id: 'id',
      title: t('id'),
      render: row => safeRender(row, 'id'),
    },
    {
      id: 'displayName',
      title: t('displayName'),
      render: row => `${safeRender(row, 'firstname')} ${safeRender(row, 'lastname')}`,
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
      render: row => {
        const stateUser = safeRender(row, 'stateUser').toLowerCase()
        // Replace underscores with spaces and capitalize each word
        return stateUser === '-'
          ? stateUser
          : stateUser
              .replace(UNDERSCORE_REGEX, ' ')
              .replace(CAPITALIZE_WORD_REGEX, c => c.toUpperCase())
      },
    },
  ]

  const getCustomActions = (rowData?: User): ButtonProps[] => {
    if (!rowData) return []

    // we should show a different action based on the user's status
    const canResendActivation = rowData.stateUser.toLowerCase() === 'pending'

    // Return an array of button props
    const actions: ButtonProps[] = []

    if (canResendActivation) {
      const userId = rowData.id.toString()
      const isButtonLoading = isResendingActivation(userId)

      actions.push({
        icon: 'arrows-loop',
        colorClass: 'light',
        activeColorClass: 'color-primary',
        iconSize: 'fs-3',
        className: 'me-1',
        onClick: async () => {
          await resendActivationEmail(rowData.email, userId)
        },
        extraProps: {
          tooltip: t('resendEmailActivation'),
          disabled: isSubmitting || isButtonLoading,
        },
        loading: isButtonLoading,
        onlyIconLoading: true,
      })
    }

    return actions
  }

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
      customActions={getCustomActions}
    />
  )
}
