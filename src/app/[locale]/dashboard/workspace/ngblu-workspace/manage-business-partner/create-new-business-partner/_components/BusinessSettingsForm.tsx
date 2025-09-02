'use client'

import { useTranslations } from 'next-intl'
import { Alert, Col, Row } from 'react-bootstrap'

import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { ControlledSwitch } from '@/components/forms/controlled-switch/ControlledSwitch'
import { KTIcon } from '@/components/kt-icon/KtIcon'

import { useBusinessSettings } from '../_hooks/business-settings-form.hook'

export const BusinessSettingsForm = () => {
  const t = useTranslations('dataManagement.createBusinessPartner.businessSettings')
  const {
    selectedFile,
    fileError,
    handleFileChange,
    handlePartnerManagerChange,
    handleFileRemove,
  } = useBusinessSettings()

  return (
    <div>
      <div className="d-flex align-items-center mb-8">
        <div className="symbol symbol-50px symbol-circle me-5">
          <div className="symbol-label bg-light-primary">
            <KTIcon iconType="duotone" iconName="setting-2" className="text-primary fs-1" />
          </div>
        </div>
        <div>
          <h2 className="fw-bold text-dark mb-1">{t('title')}</h2>
          <div className="text-muted">{t('description')}</div>
        </div>
      </div>

      <div className="card bg-light mb-8">
        <div className="card-body">
          <h4 className="mb-5">{t('partnerManager')}</h4>
          <Row>
            <Col md={12}>
              <ControlledSelect
                name="managerId"
                label={t('selectPartnerManager')}
                containerClass="mb-5"
                apiPath="partner-managers"
                option={{
                  value: (item: any) => item.id,
                  label: (item: any) => `${item.firstname} ${item.lastname} (${item.role})`,
                }}
                isRequired
                onChange={handlePartnerManagerChange}
              />
            </Col>
          </Row>
        </div>
      </div>

      <div className="card bg-light mb-8">
        <div className="card-body">
          <h4 className="mb-5">{t('contractDocumentation')}</h4>
          <div className="mb-5">
            <label className="form-label required">{t('uploadSignedContract')}</label>
            <div
              className={`dropzone dz-clickable ${fileError ? 'border-danger' : ''}`}
              id="contract-upload"
            >
              <div className="dz-message needsclick">
                <div className="text-center">
                  <KTIcon iconType="duotone" iconName="file-up" className="text-muted fs-3x mb-3" />

                  <div className="ms-4">
                    <h3 className="fs-5 fw-bold text-gray-900 mb-1">
                      {selectedFile ? 'File selected. Click or drop to replace' : t('dragAndDrop')}
                    </h3>
                    <span className="fs-7 fw-semibold text-gray-500">{t('onlyPdfAllowed')}</span>
                  </div>
                </div>
              </div>

              <input
                name="contract"
                type="file"
                id="contract-file"
                accept=".pdf"
                className="position-absolute top-0 end-0 m-0 p-0 w-100 h-100 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </div>

            {fileError && (
              <Alert variant="danger" className="mt-2 mb-0 py-2">
                <div className="d-flex align-items-center">
                  <KTIcon
                    iconType="duotone"
                    iconName="shield-cross"
                    className="fs-2 text-danger me-2"
                  />
                  <span>{fileError}</span>
                </div>
              </Alert>
            )}
          </div>

          {selectedFile && !fileError && (
            <>
              <Alert variant="success" className="mb-3">
                <div className="d-flex align-items-center">
                  <KTIcon
                    iconType="duotone"
                    iconName="check-circle"
                    className="fs-2 text-success me-2"
                  />
                  <span>{t('contractUploaded')}</span>
                </div>
              </Alert>
              <div className="bg-white p-3 rounded d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <KTIcon
                    iconType="duotone"
                    iconName="file-pdf"
                    className="text-danger fs-2x me-3"
                  />
                  <div>
                    <span className="fw-bold">{selectedFile.name}</span>
                    <div className="text-muted fs-7">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-icon btn-light-danger"
                  onClick={handleFileRemove}
                  title={t('removeContract')}
                >
                  <KTIcon iconType="outline" iconName="trash" className="fs-2" />
                </button>
              </div>
            </>
          )}

          {selectedFile && fileError && (
            <div className="bg-white p-3 rounded d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <KTIcon iconType="duotone" iconName="file-pdf" className="text-danger fs-2x me-3" />
                <div>
                  <span className="fw-bold">{selectedFile.name}</span>
                  <div className="text-muted fs-7">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-icon btn-light-danger"
                onClick={handleFileRemove}
                title={t('removeContract')}
              >
                <KTIcon iconType="outline" iconName="trash" className="fs-2" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-light mb-8">
        <div className="card-body">
          <h4 className="fw-bold mb-0">{t('paymentSettings')}</h4>

          <Row className="mb-5">
            <Col md={12}>
              <div className="d-flex align-items-center justify-content-between bg-light-secondary rounded p-4 mb-3">
                <div>
                  <h5 className="fw-semibold mb-1">{t('automaticDebit')}</h5>
                  <p className="text-muted mb-0 fs-7">
                    Enable automatic payment collection from your account
                  </p>
                </div>
                <div className="form-check form-switch form-check-custom form-check-solid">
                  <ControlledSwitch name="enableAutoDebit" label="" />
                </div>
              </div>

              {/* Conditional Terms and Conditions */}

              <div className="mt-5">
                <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6">
                  <KTIcon
                    iconName="information-5"
                    className="fs-2tx text-primary me-4"
                    iconType="duotone"
                  />
                  <div className="d-flex flex-stack flex-grow-1">
                    <div className="fw-semibold">
                      <div className="text-gray-700 fs-6 mb-4">
                        <strong>{t('automaticDebit')}:</strong> {t('automaticDebitTerms')}
                      </div>

                      {/* Add back in when we have a terms and conditions page or when needed in the future */}

                      {/* <ControlledSwitch
                          type="checkbox"
                          name="termsAccepted"
                          label={
                            <span className="fs-6 fw-semibold text-gray-700">
                              {t('termsAccepted').split('Terms and Conditions')[0]}
                              <a
                                href="https://ngblu.nl/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="fw-bold text-primary text-hover-primary"
                              >
                                Terms and Conditions
                              </a>
                              {t('termsAccepted').split('Terms and Conditions')[1]}
                            </span>
                          }
                        />
                      {watch('enableAutoDebit') && (
                            <div
                              className="text-danger fs-7 mt-2"
                              style={{ visibility: !watch('termsAccepted') ? 'visible' : 'hidden' }}
                            >
                              <KTIcon iconName="warning-2" className="fs-6 me-1" iconType="duotone" />
                              {t('termsRequired')}
                            </div>
                          )}
                      */}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
