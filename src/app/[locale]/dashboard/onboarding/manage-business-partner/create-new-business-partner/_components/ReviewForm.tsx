'use client'

import { useTranslations } from 'next-intl'
import { Alert, Col, Row } from 'react-bootstrap'

import { KTIcon } from '@/components/kt-icon/KtIcon'

import { useReviewForm } from '../_hooks/review-form.hook'

export const ReviewForm = () => {
  const t = useTranslations('dataManagement.createBusinessPartner.review')
  const tCommon = useTranslations('common')
  const {
    formValues,
    formatBooleanValue,
    formatFileValue,
    getPartnerManagerDetails,
    getCountryName,
    openFileInNewTab,
    getApprovalRequirements,
  } = useReviewForm()

  // Get partner manager details
  const partnerManager = getPartnerManagerDetails(formValues.managerId)

  return (
    <div>
      <div className="d-flex align-items-center mb-8">
        <div className="symbol symbol-50px symbol-circle me-5">
          <div className="symbol-label bg-light-primary">
            <KTIcon iconType="duotone" iconName="document" className="text-primary fs-1" />
          </div>
        </div>
        <div>
          <h2 className="fw-bold text-dark mb-1">{t('title')}</h2>
          <div className="text-muted">{t('description')}</div>
        </div>
      </div>

      {/* Business Profile Section */}
      <div className="card bg-light mb-6">
        <div className="card-body">
          <h4 className="fw-bold text-primary mb-5">{t('businessProfile')}</h4>

          <Row className="g-6">
            {/* Company Information */}
            <Col lg={4}>
              <div className="mb-4">
                <h6 className="fw-semibold text-gray-800 mb-3">{t('companyInformation')}</h6>
                <div className="mb-3">
                  <span className="text-muted fs-7">{t('kvkNumber')}</span>
                  <div className="fw-bold">
                    {formValues.chamberOfCommerceId || tCommon('notProvided')}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-muted fs-7">{t('companyName')}</span>
                  <div className="fw-bold">{formValues.name || tCommon('notProvided')}</div>
                </div>
              </div>
            </Col>

            {/* Company Address */}
            <Col lg={4}>
              <div className="mb-4">
                <h6 className="fw-semibold text-gray-800 mb-3">{t('companyAddress')}</h6>
                <div className="mb-3">
                  <span className="text-muted fs-7">{t('streetName')}</span>
                  <div className="fw-bold">
                    {formValues.address?.streetname || tCommon('notProvided')}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-muted fs-7">{t('houseNumber')}</span>
                  <div className="fw-bold">
                    {formValues.address?.housenumber || tCommon('notProvided')}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-muted fs-7">{t('postalCode')}</span>
                  <div className="fw-bold">
                    {formValues.address?.postalcode || tCommon('notProvided')}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-muted fs-7">{t('city')}</span>
                  <div className="fw-bold">
                    {formValues.address?.city || tCommon('notProvided')}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-muted fs-7">{t('country')}</span>
                  <div className="fw-bold">
                    {getCountryName(formValues.address?.countryId) || tCommon('notProvided')}
                  </div>
                </div>
              </div>
            </Col>

            {/* Primary Contact */}
            <Col lg={4}>
              <div className="mb-4">
                <h6 className="fw-semibold text-gray-800 mb-3">{t('primaryContact')}</h6>
                <div className="mb-3">
                  <span className="text-muted fs-7">{t('name')}</span>
                  <div className="fw-bold">
                    {[formValues.contactInfo?.firstname, formValues.contactInfo?.lastname]
                      .filter(Boolean)
                      .join(' ') || tCommon('notProvided')}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-muted fs-7">{t('phone')}</span>
                  <div className="fw-bold">
                    {formValues.contactInfo?.phoneNumber || tCommon('notProvided')}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-muted fs-7">{t('email')}</span>
                  <div className="fw-bold">
                    {formValues.contactInfo?.email || tCommon('notProvided')}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Business Settings Section */}
      <div className="card bg-light mb-6">
        <div className="card-body">
          <h4 className="fw-bold text-primary mb-5">{t('businessSettings')}</h4>

          <Row className="g-6">
            <Col lg={6}>
              <div className="mb-3">
                <span className="text-muted fs-7">{t('partnerManager')}</span>
                <div className="fw-bold">
                  {partnerManager
                    ? `${partnerManager.name} (${partnerManager.role})`
                    : tCommon('notAssigned')}
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <span className="text-muted fs-7">{t('signedContract')}</span>
                <div className="fw-bold">
                  {(() => {
                    const fileInfo = formatFileValue(formValues.contract as File)
                    return (
                      <FileReviewItem
                        fileInfo={fileInfo}
                        onFileClick={() => openFileInNewTab(formValues.contract as File)}
                      />
                    )
                  })()}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Product Configuration Section */}
      <Row className="g-6 mt-4">
        <Col lg={12}>
          <div className="card bg-light">
            <div className="card-body">
              <h4 className="fw-bold text-primary mb-6">{t('productConfiguration')}</h4>

              <Row className="g-4">
                {/* Layer 3 Data Products - Left Column */}
                <Col lg={6}>
                  <div className="border rounded p-4 bg-white h-100">
                    <h6 className="fw-semibold text-gray-800 mb-4">{t('layer3DataProducts')}</h6>

                    <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-3">
                      <span className="text-muted fs-7">{t('layer3Enabled')}</span>
                      <span
                        className={`badge badge-light-${formValues.layer3 ? 'success' : 'secondary'}`}
                      >
                        {formatBooleanValue(formValues.layer3)}
                      </span>
                    </div>

                    {formValues.layer3 && (
                      <>
                        <div className="mb-4">
                          <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-2">
                            <span className="text-muted fs-7">{t('whiteLabel')}</span>
                            <span
                              className={`badge badge-light-${formValues.whiteLabel ? 'success' : 'secondary'}`}
                            >
                              {formatBooleanValue(formValues.whiteLabel)}
                            </span>
                          </div>
                          {formValues.whiteLabel && (
                            <div className="mt-2 ps-3">
                              <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-1">
                                <span className="text-muted fs-8">{t('whiteLabelInternet')}</span>
                                <span
                                  className={`badge badge-sm badge-light-${formValues.whiteLabelInternet ? 'success' : 'secondary'}`}
                                >
                                  {formatBooleanValue(formValues.whiteLabelInternet)}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-1">
                                <span className="text-muted fs-8">{t('whiteLabelIPVPN')}</span>
                                <span
                                  className={`badge badge-sm badge-light-${formValues.whiteLabelIPVPN ? 'success' : 'secondary'}`}
                                >
                                  {formatBooleanValue(formValues.whiteLabelIPVPN)}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-1">
                                <span className="text-muted fs-8">{t('whiteLabelMobileData')}</span>
                                <span
                                  className={`badge badge-sm badge-light-${formValues.whiteLabelMobileData ? 'success' : 'secondary'}`}
                                >
                                  {formatBooleanValue(formValues.whiteLabelMobileData)}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                                <span className="text-muted fs-8">{t('whiteLabelSDWAN')}</span>
                                <span
                                  className={`badge badge-sm badge-light-${formValues.whiteLabelSDWAN ? 'success' : 'secondary'}`}
                                >
                                  {formatBooleanValue(formValues.whiteLabelSDWAN)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-2">
                            <span className="text-muted fs-7">{t('direct')}</span>
                            <span
                              className={`badge badge-light-${formValues.direct ? 'success' : 'secondary'}`}
                            >
                              {formatBooleanValue(formValues.direct)}
                            </span>
                          </div>
                          {formValues.direct && (
                            <div className="mt-2 ps-3">
                              <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-1">
                                <span className="text-muted fs-8">{t('directInternet')}</span>
                                <span
                                  className={`badge badge-sm badge-light-${formValues.directInternet ? 'success' : 'secondary'}`}
                                >
                                  {formatBooleanValue(formValues.directInternet)}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-1">
                                <span className="text-muted fs-8">{t('directIPVPN')}</span>
                                <span
                                  className={`badge badge-sm badge-light-${formValues.directIPVPN ? 'success' : 'secondary'}`}
                                >
                                  {formatBooleanValue(formValues.directIPVPN)}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-1">
                                <span className="text-muted fs-8">{t('directMobileData')}</span>
                                <span
                                  className={`badge badge-sm badge-light-${formValues.directMobileData ? 'success' : 'secondary'}`}
                                >
                                  {formatBooleanValue(formValues.directMobileData)}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                                <span className="text-muted fs-8">{t('directSDWAN')}</span>
                                <span
                                  className={`badge badge-sm badge-light-${formValues.directSDWAN ? 'success' : 'secondary'}`}
                                >
                                  {formatBooleanValue(formValues.directSDWAN)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </Col>

                {/* Layer 2 and Voice Products - Right Column */}
                <Col lg={6}>
                  <div className="d-flex flex-column gap-4 h-100">
                    {/* Layer 2 Data Products */}
                    <div className="border rounded p-4 bg-white">
                      <h6 className="fw-semibold text-gray-800 mb-4">{t('layer2DataProducts')}</h6>

                      <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-3">
                        <span className="text-muted fs-7">{t('layer2Enabled')}</span>
                        <span
                          className={`badge badge-light-${formValues.layer2 ? 'success' : 'secondary'}`}
                        >
                          {formatBooleanValue(formValues.layer2)}
                        </span>
                      </div>

                      {formValues.layer2 && (
                        <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-3">
                          <span className="text-muted fs-7">{t('deltaAccessLayer2')}</span>
                          <span
                            className={`badge badge-light-${formValues.deltaAccessLayer2 ? 'success' : 'secondary'}`}
                          >
                            {formatBooleanValue(formValues.deltaAccessLayer2)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Voice Products */}
                    <div className="border rounded p-4 bg-white">
                      <h6 className="fw-semibold text-gray-800 mb-4">{t('voiceProducts')}</h6>

                      <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-3">
                        <span className="text-muted fs-7">{t('voiceEnabled')}</span>
                        <span
                          className={`badge badge-light-${formValues.voice ? 'success' : 'secondary'}`}
                        >
                          {formatBooleanValue(formValues.voice)}
                        </span>
                      </div>

                      {formValues.voice && (
                        <>
                          {/* Traditional and IP Telephony */}
                          <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-2">
                              <span className="text-muted fs-8">{t('traditionalTelephony')}</span>
                              <span
                                className={`badge badge-sm badge-light-${formValues.traditionalTelephony ? 'success' : 'secondary'}`}
                              >
                                {formatBooleanValue(formValues.traditionalTelephony)}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                              <span className="text-muted fs-8">{t('ipTelephony')}</span>
                              <span
                                className={`badge badge-sm badge-light-${formValues.ipTelephony ? 'success' : 'secondary'}`}
                              >
                                {formatBooleanValue(formValues.ipTelephony)}
                              </span>
                            </div>
                          </div>

                          {/* IP Telephony Sub-options Grid */}
                          {formValues.ipTelephony && (
                            <div className="mb-4">
                              <div className="text-muted fs-8 mb-2">IP Telephony Services:</div>
                              <div className="row g-1">
                                <div className="col-6">
                                  <div className="d-flex flex-column align-items-center p-2 bg-light rounded">
                                    <span className="text-muted fs-9">{t('xelion')}</span>
                                    <span
                                      className={`badge badge-xs badge-light-${formValues.xelion ? 'success' : 'secondary'}`}
                                    >
                                      {formatBooleanValue(formValues.xelion)}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="d-flex flex-column align-items-center p-2 bg-light rounded">
                                    <span className="text-muted fs-9">{t('hostedTelephony')}</span>
                                    <span
                                      className={`badge badge-xs badge-light-${formValues.hostedTelephony ? 'success' : 'secondary'}`}
                                    >
                                      {formatBooleanValue(formValues.hostedTelephony)}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="d-flex flex-column align-items-center p-2 bg-light rounded">
                                    <span className="text-muted fs-9">{t('sipTrunking')}</span>
                                    <span
                                      className={`badge badge-xs badge-light-${formValues.sipTrunking ? 'success' : 'secondary'}`}
                                    >
                                      {formatBooleanValue(formValues.sipTrunking)}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="d-flex flex-column align-items-center p-2 bg-light rounded">
                                    <span className="text-muted fs-9">{t('oneSpace')}</span>
                                    <span
                                      className={`badge badge-xs badge-light-${formValues.oneSpace ? 'success' : 'secondary'}`}
                                    >
                                      {formatBooleanValue(formValues.oneSpace)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Fixed Mobile Integration */}
                          <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                            <span className="text-muted fs-8">{t('fixedMobileIntegration')}</span>
                            <span
                              className={`badge badge-sm badge-light-${formValues.fixedMobileIntegration ? 'success' : 'secondary'}`}
                            >
                              {formatBooleanValue(formValues.fixedMobileIntegration)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* Approval Requirements */}
      {getApprovalRequirements().length > 0 && (
        <Alert variant="warning" className="mt-6 text-dark">
          <div className="d-flex align-items-center">
            <KTIcon
              iconType="duotone"
              iconName="information-5"
              className="fs-2x text-warning me-3"
            />
            <div>
              <h5 className="mb-2">{t('approvalRequirements')}</h5>
              <p className="mb-2">{t('configRequiresApproval')}</p>
              <ul className="mb-0">
                {getApprovalRequirements().map((requirement, index) => (
                  <li key={index}>{requirement.rule}</li>
                ))}
              </ul>
              <p className="mb-0 mt-2 fw-bold">{t('salesManagerApproval')}</p>
            </div>
          </div>
        </Alert>
      )}
    </div>
  )
}

// Helper component for file display
const FileReviewItem = ({
  fileInfo,
  onFileClick,
}: {
  fileInfo: {
    hasFile: boolean
    displayText: string
    fileName: string
    fileSize: string
    fileUrl: string | null
  }
  onFileClick: () => void
}) => {
  const tCommon = useTranslations('common')

  if (!fileInfo.hasFile) {
    return <span>{tCommon('noFileUploaded')}</span>
  }

  return (
    <span
      className="text-primary cursor-pointer text-decoration-underline"
      onClick={onFileClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onFileClick()
        }
      }}
    >
      {fileInfo.displayText}
    </span>
  )
}
