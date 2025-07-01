'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { KTIcon } from '@/components/kt-icon/KtIcon'

interface BackupCodesModalProps {
  show: boolean
  onHide: () => void
  backupCodes: string[]
}

export function BackupCodesModal({ show, onHide, backupCodes }: BackupCodesModalProps) {
  const t = useTranslations('account.totp')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const codesText = backupCodes.join('\n')
    try {
      await navigator.clipboard.writeText(codesText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy codes:', err)
    }
  }

  const handleDownload = () => {
    const codesText = backupCodes.join('\n')
    const blob = new Blob([codesText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '2fa-backup-codes.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <KTIcon iconName="key" className="fs-2 text-warning me-3" />
          {t('backupCodes.title')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="text-center mb-6">
          <div className="alert alert-warning d-flex align-items-start">
            <KTIcon iconName="warning-2" className="fs-3 text-warning me-3 mt-1" />
            <div className="text-start">
              <h6 className="mb-2">{t('backupCodes.warning')}</h6>
              <p className="mb-0 fs-7">{t('backupCodes.warningDescription')}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h6 className="mb-4 text-center">{t('backupCodes.subtitle')}</h6>
          <div className="row g-3">
            {backupCodes.map((code, index) => (
              <div key={index} className="col-6">
                <div className="card bg-light">
                  <div className="card-body text-center py-3">
                    <code className="fs-6 fw-bold text-dark">{code}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="alert alert-info d-flex align-items-start">
          <KTIcon iconName="information-5" className="fs-3 text-info me-3 mt-1" />
          <div className="text-start">
            <h6 className="mb-2">{t('backupCodes.instructions')}</h6>
            <ul className="mb-0 ps-3 fs-7">
              <li>{t('backupCodes.instruction1')}</li>
              <li>{t('backupCodes.instruction2')}</li>
              <li>{t('backupCodes.instruction3')}</li>
              <li>{t('backupCodes.instruction4')}</li>
            </ul>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex gap-2">
            <Button
              type="button"
              colorClass="light"
              label={copied ? t('backupCodes.copied') : t('backupCodes.copy')}
              onClick={handleCopy}
              icon={copied ? 'check' : 'copy'}
              disabled={copied}
            />
            <Button
              type="button"
              colorClass="light"
              label={t('backupCodes.download')}
              onClick={handleDownload}
              icon="download"
            />
          </div>
          <Button
            type="button"
            colorClass="primary"
            label={t('backupCodes.done')}
            onClick={onHide}
            icon="check"
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}
