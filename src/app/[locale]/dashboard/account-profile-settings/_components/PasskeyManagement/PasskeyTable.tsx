import { useTranslations } from 'next-intl'

import { KTIcon } from '@/components/kt-icon/kt-icon'
import { Table } from '@/components/table/table'
import { TableColumn } from '@/components/table/table.type'
import { safeRender } from '@/utils/safeRender'

import { Passkey } from './use-passkey-management.hook'

interface PasskeyTableProps {
  passkeys: Passkey[]
  onDelete: (passkey: Passkey) => void
  onRegisterClick: () => void
  isRegistering: boolean
  parseUserAgent: (userAgent: string | null) => { browser: string; os: string; icon: string }
  getDeviceIcon: (deviceInfo: { browser: string; os: string; icon: string }) => string
  formatCreatedInfo: (passkey: Passkey) => string
  formatLastUsedInfo: (passkey: Passkey) => string
}

export const PasskeyTable = ({
  passkeys,
  onDelete,
  onRegisterClick,
  isRegistering,
  parseUserAgent,
  getDeviceIcon,
  formatCreatedInfo,
  formatLastUsedInfo,
}: PasskeyTableProps) => {
  const t = useTranslations('account.passkeys')

  const columns: TableColumn<Passkey>[] = [
    {
      id: 'name',
      title: 'Passkey Name',
      render: (passkey: Passkey) => <div className="fw-bold">{safeRender(passkey, 'name')}</div>,
    },
    {
      id: 'device',
      title: 'Device',
      render: (passkey: Passkey) => {
        const deviceInfo = parseUserAgent(passkey.registrationUserAgent)
        return (
          <div className="d-flex align-items-center">
            <KTIcon iconName={getDeviceIcon(deviceInfo)} className="me-2 text-primary fs-3" />
            <div>
              <div className="fw-medium">{safeRender(deviceInfo, 'browser')}</div>
              <div className="text-muted small">{safeRender(deviceInfo, 'os')}</div>
            </div>
          </div>
        )
      },
    },
    {
      id: 'usage',
      title: 'Usage Information',
      render: (passkey: Passkey) => (
        <div>
          <div className="mb-2">
            <div className="text-muted small">Created:</div>
            <div className="small">{formatCreatedInfo(passkey)}</div>
          </div>
          <div>
            <div className="text-muted small">Last used:</div>
            <div className="small">{formatLastUsedInfo(passkey)}</div>
          </div>
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
