'use client'

import { useTranslations } from 'next-intl'
import { QRCodeSVG } from 'qrcode.react'
import { Modal } from 'react-bootstrap'
import { FormProvider } from 'react-hook-form'

import { Button } from '@/components/button/button'
import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { KTIcon } from '@/components/kt-icon/KtIcon'

import { useQrCodeSetup } from '../../_hooks/qr-code-setup.hook'

interface QrCodeSetupProps {
  show: boolean
  onHide: () => void
  qrCodeUrl: string
  onComplete: (backupCodes: string[]) => void
}

export function QrCodeSetup({ show, onHide, qrCodeUrl, onComplete }: QrCodeSetupProps) {
  const t = useTranslations('account.totp')
  const {
    methods,
    step,
    isSettingUp,
    handleNextStep,
    handleBackStep,
    handleSubmit,
    handleClose,
    handleManualEntry,
  } = useQrCodeSetup({ onComplete, onHide })

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <KTIcon iconName="shield-tick" className="fs-2 text-primary me-3" />
          {step === 'scan' ? t('qrSetup.title') : t('qrSetup.verifyTitle')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {step === 'scan' ? (
          <div className="text-center">
            {/* QR Code Display */}
            <div className="mb-6">
              <div className="d-flex justify-content-center mb-4">
                <div className="p-4 bg-white rounded border">
                  <QRCodeSVG value={qrCodeUrl} size={200} level="M" />
                </div>
              </div>
              <h5 className="mb-3">{t('qrSetup.scanTitle')}</h5>
              <p className="text-muted mb-4">{t('qrSetup.scanInstructions')}</p>
            </div>

            {/* Authenticator App Recommendations */}
            <div className="alert alert-info d-flex align-items-start">
              <KTIcon iconName="information-5" className="fs-3 text-info me-3 mt-1" />
              <div className="text-start">
                <h6 className="mb-2">{t('qrSetup.recommendedApps')}</h6>
                <ul className="mb-0 ps-3">
                  <li>Google Authenticator</li>
                  <li>Microsoft Authenticator</li>
                  <li>Authy</li>
                  <li>1Password</li>
                </ul>
              </div>
            </div>

            {/* Manual Entry Option */}
            <div className="mt-4">
              <button
                type="button"
                className="btn btn-link text-muted"
                onClick={() => handleManualEntry(qrCodeUrl)}
              >
                <KTIcon iconName="copy" className="fs-4 me-2" />
                {t('qrSetup.manualEntry')}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h5 className="mb-3">{t('qrSetup.verifyTitle')}</h5>
              <p className="text-muted mb-4">{t('qrSetup.verifyInstructions')}</p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <div className="mb-4">
                  <ControlledInput
                    name="verificationCode"
                    label={t('qrSetup.verificationCode')}
                    placeholder={t('qrSetup.verificationCodePlaceholder')}
                    maxLength={6}
                    autoComplete="off"
                    autoFocus
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
          <div>
            {step === 'verify' && (
              <Button
                type="button"
                colorClass="light"
                label={t('qrSetup.back')}
                onClick={handleBackStep}
                icon="arrow-left"
              />
            )}
          </div>
          <div className="d-flex gap-2">
            <Button
              type="button"
              colorClass="light"
              label={t('qrSetup.cancel')}
              onClick={handleClose}
            />
            {step === 'scan' ? (
              <Button
                type="button"
                colorClass="primary"
                label={t('qrSetup.next')}
                onClick={handleNextStep}
                icon="arrow-right"
              />
            ) : (
              <Button
                type="button"
                colorClass="primary"
                label={t('qrSetup.verify')}
                onClick={methods.handleSubmit(handleSubmit)}
                loading={isSettingUp}
                disabled={isSettingUp}
                icon="shield-tick"
              />
            )}
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
