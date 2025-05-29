import { useTranslations } from 'next-intl'

import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'

import { Passkey } from './use-passkey-management.hook'

interface PasskeyTableProps {
  passkeys: Passkey[]
  onDelete: (passkey: Passkey) => void
  onRegisterClick: () => void
  isRegistering: boolean
}

export const PasskeyTable = ({
  passkeys,
  onDelete,
  onRegisterClick,
  isRegistering,
}: PasskeyTableProps) => {
  const t = useTranslations('account.passkeys')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const columns: TableColumn<Passkey>[] = [
    {
      id: 'name',
      title: t('passkeyName'),
      render: (passkey: Passkey) => (
        <div className="d-flex align-items-center">
          <i className="bi bi-key me-2 text-primary"></i>
          <span className="fw-bold">{passkey.name}</span>
        </div>
      ),
    },
    {
      id: 'createdAt',
      title: t('createdAt'),
      render: (passkey: Passkey) => (
        <div className="text-muted">
          <i className="bi bi-calendar-plus me-2"></i>
          {formatDate(passkey.createdAt)}
        </div>
      ),
    },
  ]

  return (
    <Table<Passkey>
      title={t('title')}
      description={t('description')}
      columns={columns}
      data={passkeys}
      actions={['delete']}
      onDelete={onDelete}
      showDeleteConfirmation={false}
      noPadding={true}
      toolbars={[
        {
          colorClass: 'primary',
          size: 'sm',
          onClick: onRegisterClick,
          disabled: isRegistering,
          label: isRegistering ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              {t('registering')}
            </>
          ) : (
            <>{t('addPasskey')}</>
          ),
        },
      ]}
    />
  )
}
