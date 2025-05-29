import { useTranslations } from 'next-intl'
import { Button, Modal } from 'react-bootstrap'

import { ConfirmationModal } from '@/components/confirmation-modal/confirmation-modal'

import { Passkey } from './use-passkey-management.hook'

interface PasskeyModalsProps {
  // Delete modal props
  showDeleteModal: boolean
  passkeyToDelete: Passkey | null
  onDeleteConfirm: () => void
  onDeleteCancel: () => void

  // Register modal props
  showRegisterModal: boolean
  registerPasskeyName: string
  onRegisterConfirm: () => void
  onRegisterCancel: () => void
  onRegisterNameChange: (name: string) => void
}

export const PasskeyModals = ({
  showDeleteModal,
  passkeyToDelete,
  onDeleteConfirm,
  onDeleteCancel,
  showRegisterModal,
  registerPasskeyName,
  onRegisterConfirm,
  onRegisterCancel,
  onRegisterNameChange,
}: PasskeyModalsProps) => {
  const t = useTranslations('account.passkeys')
  const tCommon = useTranslations('common')

  return (
    <>
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        visible={showDeleteModal}
        onCancel={onDeleteCancel}
        onConfirm={onDeleteConfirm}
        title={t('deletePasskey')}
        body={t('deleteConfirmMessage', { name: passkeyToDelete?.name })}
        confirmLabel={tCommon('delete')}
        cancelLabel={tCommon('cancel')}
        variant="danger"
      />

      {/* Register Modal */}
      <Modal show={showRegisterModal} onHide={onRegisterCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('registerPasskey')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">{t('passkeyName')}</label>
            <input
              type="text"
              className="form-control"
              value={registerPasskeyName}
              onChange={e => onRegisterNameChange(e.target.value)}
              placeholder={t('passkeyNamePlaceholder')}
              maxLength={50}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onRegisterCancel}>
            {tCommon('cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={onRegisterConfirm}
            disabled={!registerPasskeyName.trim()}
          >
            {tCommon('save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
