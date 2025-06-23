'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/button/button'
import { ConfirmationModal } from '@/components/confirmation-modal/confirmation-modal'
import { KTIcon } from '@/components/kt-icon/kt-icon'

import { BackupCodesModal } from './BackupCodesModal'
import { QrCodeSetup } from './QrCodeSetup'
import { useTotpManagementUI } from '../../_hooks/totp-management-ui.hook'

export function TotpManagement() {
  const t = useTranslations('account.totp')
  const {
    // State
    is2faEnabled,
    isLoading,
    isSettingUp,
    qrCodeUrl,
    showQrSetup,
    showBackupCodes,
    showDisableConfirm,
    currentBackupCodes,

    // Event handlers
    handleStartSetup,
    handleSetupComplete,
    handleDisable,
    handleConfirmDisable,
    handleCancelDisable,
    handleHideQrSetup,
    handleHideBackupCodes,
  } = useTotpManagementUI()

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <div className="d-flex align-items-center">
            <KTIcon iconName="shield-tick" className="fs-2 text-primary me-3" />
            <div>
              <h3 className="mb-1">{t('title')}</h3>
              <p className="text-muted mb-0 fs-6">{t('description')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body">
        {is2faEnabled ? (
          <div className="d-flex align-items-center justify-content-between p-6 bg-light-success rounded">
            <div className="d-flex align-items-center">
              <div className="symbol symbol-50px me-4">
                <div className="symbol-label bg-success">
                  <KTIcon iconName="shield-tick" className="fs-2x text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-success mb-1">{t('enabled')}</h4>
                <p className="text-muted mb-0">{t('enabledDescription')}</p>
              </div>
            </div>
            <Button
              type="button"
              colorClass="danger"
              label={t('disable')}
              onClick={handleDisable}
              icon="shield-cross"
              loading={isLoading}
              disabled={isLoading}
            />
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-between p-6 bg-light-warning rounded">
            <div className="d-flex align-items-center">
              <div className="symbol symbol-50px me-4">
                <div className="symbol-label bg-warning">
                  <KTIcon iconName="shield-cross" className="fs-2x text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-warning mb-1">{t('disabled')}</h4>
                <p className="text-muted mb-0">{t('disabledDescription')}</p>
              </div>
            </div>
            <Button
              type="button"
              colorClass="primary"
              label={isSettingUp ? t('generating') : t('enable')}
              onClick={handleStartSetup}
              icon="shield-tick"
              loading={isSettingUp}
              disabled={isSettingUp}
            />
          </div>
        )}

        {/* Security recommendations */}
        <div className="mt-8">
          <h5 className="mb-4">{t('securityTips')}</h5>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-start">
              <KTIcon iconName="check-circle" className="fs-4 text-success me-2 mt-1" />
              <span className="text-gray-700">{t('tip1')}</span>
            </div>
            <div className="d-flex align-items-start">
              <KTIcon iconName="check-circle" className="fs-4 text-success me-2 mt-1" />
              <span className="text-gray-700">{t('tip2')}</span>
            </div>
            <div className="d-flex align-items-start">
              <KTIcon iconName="check-circle" className="fs-4 text-success me-2 mt-1" />
              <span className="text-gray-700">{t('tip3')}</span>
            </div>
          </div>
        </div>

        {/* Modals */}
        {qrCodeUrl && (
          <QrCodeSetup
            show={showQrSetup}
            onHide={handleHideQrSetup}
            qrCodeUrl={qrCodeUrl}
            onComplete={handleSetupComplete}
          />
        )}

        <BackupCodesModal
          show={showBackupCodes}
          onHide={handleHideBackupCodes}
          backupCodes={currentBackupCodes}
        />

        <ConfirmationModal
          visible={showDisableConfirm}
          title={t('disableConfirmTitle')}
          body={t('confirmDisable')}
          onConfirm={handleConfirmDisable}
          onCancel={handleCancelDisable}
          variant="danger"
          confirmLabel={t('disable')}
          cancelLabel={t('cancel')}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
