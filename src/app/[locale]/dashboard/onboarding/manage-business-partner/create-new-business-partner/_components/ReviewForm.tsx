'use client'

import { Alert, Col, Row } from 'react-bootstrap'

import { KTIcon } from '@/components/kt-icon/KtIcon'

import { useReviewForm } from '../_hooks/review-form.hook'

export const ReviewForm = () => {
  const { formValues, formatBooleanValue, formatFileValue, getApprovalRequirements } =
    useReviewForm()

  return (
    <div>
      <div className="d-flex align-items-center mb-8">
        <div className="symbol symbol-50px symbol-circle me-5">
          <div className="symbol-label bg-light-primary">
            <KTIcon iconType="duotone" iconName="document" className="text-primary fs-1" />
          </div>
        </div>
        <div>
          <h2 className="fw-bold text-dark mb-1">Review</h2>
          <div className="text-muted">Review and confirm business partner details</div>
        </div>
      </div>

      <ReviewSection title="Business Profile">
        <div className="mb-5">
          <h6 className="fw-bold mb-3">Company Information</h6>
          <Row>
            <Col md={6}>
              <ReviewItem label="KVK Number" value={formValues.kvkNumber || 'Not provided'} />
              <ReviewItem label="Company Name" value={formValues.companyName} />
            </Col>
          </Row>
        </div>

        <div className="separator my-5"></div>

        <div className="mb-5">
          <h6 className="fw-bold mb-3">Company Address</h6>
          <Row>
            <Col md={6}>
              <ReviewItem label="Street Name" value={formValues.streetName} />
              <ReviewItem label="House Number" value={formValues.houseNumber} />
              <ReviewItem label="Postal Code" value={formValues.postalCode} />
            </Col>
            <Col md={6}>
              <ReviewItem label="City" value={formValues.city} />
              <ReviewItem label="Country" value={formValues.country} />
            </Col>
          </Row>
        </div>

        <div className="separator my-5"></div>

        <div>
          <h6 className="fw-bold mb-3">Primary Contact</h6>
          <Row>
            <Col md={6}>
              <ReviewItem label="Name" value={`${formValues.firstName} ${formValues.lastName}`} />
              <ReviewItem label="Phone" value={formValues.phoneNumber} />
            </Col>
            <Col md={6}>
              <ReviewItem label="Email" value={formValues.emailAddress} />
            </Col>
          </Row>
        </div>
      </ReviewSection>

      <div className="separator my-10"></div>

      <ReviewSection title="Business Settings">
        <div className="mb-5">
          <h6 className="fw-bold mb-3">Partner Manager</h6>
          <Row>
            <Col md={6}>
              <ReviewItem
                label="Partner Manager"
                value={formValues.partnerManagerId?.toString() || 'Not assigned'}
              />
            </Col>
          </Row>
        </div>

        <div className="separator my-5"></div>

        <div>
          <h6 className="fw-bold mb-3">Contract</h6>
          <Row>
            <Col md={6}>
              <ReviewItem
                label="Signed Contract"
                value={formatFileValue(formValues.signedContractFile as File)}
              />
            </Col>
          </Row>
        </div>
      </ReviewSection>

      <div className="separator my-10"></div>

      <ReviewSection title="Product Configuration">
        <div className="mb-5">
          <h6 className="fw-bold mb-3">Layer 3 Data Products</h6>
          <Row>
            <Col md={6}>
              <ReviewItem label="Layer 3 Enabled" value={formatBooleanValue(formValues.layer3)} />
              <ReviewItem label="White Label" value={formatBooleanValue(formValues.whiteLabel)} />
              <ReviewItem
                label="White Label Internet"
                value={formatBooleanValue(formValues.whiteLabelInternet)}
              />
              <ReviewItem
                label="White Label IPVPN"
                value={formatBooleanValue(formValues.whiteLabelIPVPN)}
              />
            </Col>
            <Col md={6}>
              <ReviewItem
                label="White Label Mobile Data"
                value={formatBooleanValue(formValues.whiteLabelMobileData)}
              />
              <ReviewItem
                label="White Label SDWAN"
                value={formatBooleanValue(formValues.whiteLabelSDWAN)}
              />
              <ReviewItem label="Direct" value={formatBooleanValue(formValues.direct)} />
              <ReviewItem
                label="Direct Internet"
                value={formatBooleanValue(formValues.directInternet)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ReviewItem label="Direct IPVPN" value={formatBooleanValue(formValues.directIPVPN)} />
              <ReviewItem
                label="Direct Mobile Data"
                value={formatBooleanValue(formValues.directMobileData)}
              />
            </Col>
            <Col md={6}>
              <ReviewItem label="Direct SDWAN" value={formatBooleanValue(formValues.directSDWAN)} />
            </Col>
          </Row>
        </div>

        <div className="separator my-5"></div>

        <div className="mb-5">
          <h6 className="fw-bold mb-3">Layer 2 Data Products</h6>
          <Row>
            <Col md={6}>
              <ReviewItem label="Layer 2 Enabled" value={formatBooleanValue(formValues.layer2)} />
            </Col>
            <Col md={6}>
              <ReviewItem
                label="Delta Access Layer 2"
                value={formatBooleanValue(formValues.deltaAccessLayer2)}
              />
            </Col>
          </Row>
        </div>

        <div className="separator my-5"></div>

        <div>
          <h6 className="fw-bold mb-3">Voice Products</h6>
          <Row>
            <Col md={6}>
              <ReviewItem label="Voice Enabled" value={formatBooleanValue(formValues.voice)} />
              <ReviewItem
                label="Traditional Telephony"
                value={formatBooleanValue(formValues.traditionalTelephony)}
              />
              <ReviewItem label="IP Telephony" value={formatBooleanValue(formValues.ipTelephony)} />
              <ReviewItem label="Xelion" value={formatBooleanValue(formValues.xelion)} />
            </Col>
            <Col md={6}>
              <ReviewItem
                label="Hosted Telephony"
                value={formatBooleanValue(formValues.hostedTelephony)}
              />
              <ReviewItem label="SIP Trunking" value={formatBooleanValue(formValues.sipTrunking)} />
              <ReviewItem label="OneSpace" value={formatBooleanValue(formValues.oneSpace)} />
              <ReviewItem
                label="Fixed Mobile Integration"
                value={formatBooleanValue(formValues.fixedMobileIntegration)}
              />
            </Col>
          </Row>
        </div>

        {/* Approval Requirements Section */}
        {getApprovalRequirements().length > 0 && (
          <>
            <div className="separator my-5"></div>
            <div className="mb-5">
              <h6 className="fw-bold mb-3">Approval Requirements</h6>
              <Alert variant="warning">
                <div className="d-flex align-items-center mb-2">
                  <span className="svg-icon svg-icon-2hx svg-icon-warning me-3">
                    <KTIcon
                      iconType="duotone"
                      iconName="information"
                      className="fs-1 text-warning"
                    />
                  </span>
                  <div className="fw-bold">Configuration requires approval</div>
                </div>
                <ul className="list-unstyled ms-8">
                  {getApprovalRequirements().map((requirement, index) => (
                    <li key={index} className="mb-1">
                      <strong>{requirement.rule}:</strong> {requirement.message}
                    </li>
                  ))}
                </ul>
              </Alert>
            </div>
          </>
        )}
      </ReviewSection>
    </div>
  )
}

// Helper component for sections
const ReviewSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="card bg-light">
      <div className="card-header">
        <h4 className="card-title">{title}</h4>
      </div>
      <div className="card-body">{children}</div>
    </div>
  )
}

// Helper component for individual review items
const ReviewItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="d-flex mb-2">
      <span className="text-muted me-2">{label}:</span>
      <span className="fw-bold">{value}</span>
    </div>
  )
}
