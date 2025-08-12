import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Button, Modal, Spinner } from 'react-bootstrap'

import { ConfirmationModalProps } from './confirmation-modal.type'

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const t = useTranslations('common')

  const {
    title,
    body,
    visible,
    onCancel,
    onConfirm,
    cancelLabel = t('cancel'),
    confirmLabel = t('yesContinue'),
    variant = 'success',
    isLoading,
  } = props

  return (
    <Modal show={visible} onHide={onCancel} centered backdrop="static">
      <Modal.Header onHide={onCancel} className={clsx('text-white', `bg-${variant}`)}>
        <h4 className="modal-title mt-0">
          <i className="mdi mdi-exclamation-thick me-2" />
          {title}
        </h4>
      </Modal.Header>
      <Modal.Body>
        <h5>{body}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={variant} onClick={onConfirm}>
          {isLoading ? (
            <>
              {' '}
              <Spinner size="sm" /> {t('loading')}
            </>
          ) : (
            confirmLabel
          )}
        </Button>
        <Button variant="light" onClick={onCancel}>
          {cancelLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
