'use client'

import { useTranslations } from 'next-intl'
import { Card, Col, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/button/button'
import { FileUpload } from '@/components/file-upload/FileUpload'
import { KTIcon } from '@/components/kt-icon/KtIcon'

import { ProfileCompletionData, StepComponentProps } from '../../_types/profile-completion.type'

export function LogoUploadStep({
  onNext,
  onPrevious,
  isFirst,
  isLast,
  isValid,
}: StepComponentProps) {
  const t = useTranslations('profileCompletion.logoUpload')
  const { setValue, watch } = useFormContext<ProfileCompletionData>()
  const logoFile = watch('logo')

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setValue('logo', file)
    } else {
      setValue('logo', null)
    }
  }

  const handleSkip = () => {
    setValue('logo', null)
    onNext()
  }

  return (
    <div className="stepper-content">
      <div className="w-100">
        <div className="pb-8 pb-lg-10 sticky-header">
          <h2 className="fw-bold text-dark">{t('title')}</h2>
          <div className="text-muted fs-6">{t('subtitle')}</div>
        </div>

        <div className="fv-row">
          {/* Logo Upload Card */}
          <Card className="mb-10 shadow-sm">
            <Card.Header className="border-0 pt-6 pb-2">
              <Card.Title className="d-flex align-items-center">
                <div className="symbol symbol-45px me-4">
                  <div className="symbol-label bg-light-primary">
                    <KTIcon iconName="picture" className="fs-2 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="fw-bold m-0 text-gray-800">{t('companyLogo')}</h3>
                  <p className="text-muted fs-7 m-0">{t('companyLogoDescription')}</p>
                </div>
              </Card.Title>
            </Card.Header>
            <Card.Body className="pt-4">
              <div className="notice d-flex bg-light-info rounded border-info border border-dashed p-6 mb-6">
                <KTIcon iconName="information-5" className="fs-2tx text-info me-4" />
                <div className="d-flex flex-stack flex-grow-1">
                  <div className="fw-semibold">
                    <div className="text-gray-700 fs-6 mb-2">
                      <strong>{t('optionalStep')}</strong> {t('optionalStepDescription')}
                    </div>
                    <div className="text-gray-600 fs-7">{t('brandIdentityNote')}</div>
                  </div>
                </div>
              </div>

              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={logoFile || null}
                accept="image/webp,image/svg+xml,image/png"
                maxSize={1024 * 1024} // 1MB
              />
            </Card.Body>
          </Card>

          {/* Tips Card */}
          <Card className="mb-10 shadow-sm">
            <Card.Header className="border-0 pt-6 pb-2">
              <Card.Title className="d-flex align-items-center">
                <div className="symbol symbol-35px me-3">
                  <div className="symbol-label bg-light-success">
                    <KTIcon iconName="design" className="fs-4 text-success" />
                  </div>
                </div>
                <h4 className="fw-bold text-gray-800 m-0">{t('logoDesignTips')}</h4>
              </Card.Title>
            </Card.Header>
            <Card.Body className="pt-4">
              <Row className="g-6">
                <Col md={4}>
                  <div className="d-flex align-items-start">
                    <div className="symbol symbol-30px me-3">
                      <div className="symbol-label bg-light-primary">
                        <KTIcon iconName="color-swatch" className="fs-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h6 className="fw-semibold text-gray-700 mb-2">{t('highContrast')}</h6>
                      <p className="text-gray-600 fs-8 mb-0">{t('highContrastTip')}</p>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-start">
                    <div className="symbol symbol-30px me-3">
                      <div className="symbol-label bg-light-warning">
                        <KTIcon iconName="verify" className="fs-5 text-warning" />
                      </div>
                    </div>
                    <div>
                      <h6 className="fw-semibold text-gray-700 mb-2">{t('simpleDesign')}</h6>
                      <p className="text-gray-600 fs-8 mb-0">{t('simpleDesignTip')}</p>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-start">
                    <div className="symbol symbol-30px me-3">
                      <div className="symbol-label bg-light-info">
                        <KTIcon iconName="crown" className="fs-5 text-info" />
                      </div>
                    </div>
                    <div>
                      <h6 className="fw-semibold text-gray-700 mb-2">{t('brandConsistent')}</h6>
                      <p className="text-gray-600 fs-8 mb-0">{t('brandConsistentTip')}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>

        <div className="d-flex flex-stack pt-10">
          <div className="me-2">
            {!isFirst && (
              <Button
                colorClass="light"
                activeColorClass="light-primary"
                label={t('previous')}
                onClick={onPrevious}
              />
            )}
          </div>
          <div className="d-flex gap-3">
            <Button
              colorClass="light"
              activeColorClass="light-secondary"
              label={t('skipThisStep')}
              onClick={handleSkip}
            />
            <Button
              colorClass="primary"
              activeColorClass="primary"
              label={isLast ? t('completeProfile') : t('next')}
              onClick={onNext}
              disabled={!isValid}
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
