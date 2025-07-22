'use client'

import { Card, Col, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/button/button'
import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { ControlledSwitch } from '@/components/forms/controlled-switch/ControlledSwitch'
import { KTIcon } from '@/components/kt-icon/KtIcon'

import { ProfileCompletionData, StepComponentProps } from '../../_types/profile-completion.type'

export function GeneralInfoStep({ onNext, isValid }: StepComponentProps) {
  const { watch, formState } = useFormContext<ProfileCompletionData>()
  const enableAutoDebit = watch('enableAutoDebit')
  const termsAccepted = watch('termsAccepted')

  // Check if the step is valid considering auto debit terms
  const isStepValid = isValid && (!enableAutoDebit || termsAccepted)

  return (
    <div className="stepper-content">
      <div className="w-100">
        <div className="pb-8 pb-lg-10 sticky-header">
          <h2 className="fw-bold text-dark">Business Profile</h2>
          <div className="text-muted fs-6">Complete all required profile fields to continue</div>
        </div>

        <div className="fv-row">
          {/* Basic Information Card */}
          <Card className="mb-10 shadow-sm">
            <Card.Header className="border-0 pt-6 pb-2">
              <Card.Title className="d-flex align-items-center">
                <div className="symbol symbol-45px me-4">
                  <div className="symbol-label bg-light-primary">
                    <KTIcon iconName="profile-user" className="fs-2 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="fw-bold m-0 text-gray-800">Basic Information</h3>
                  <p className="text-muted fs-7 m-0">General company contact details</p>
                </div>
              </Card.Title>
            </Card.Header>
            <Card.Body className="pt-4">
              <Row className="g-8">
                <Col md={6}>
                  <ControlledInput
                    name="generalEmail"
                    label="General E-mail Address"
                    type="email"
                    placeholder="Enter general email address"
                    isRequired
                  />
                </Col>

                <Col md={6}>
                  <ControlledInput
                    name="officePhone"
                    label="Office Phone Number"
                    type="tel"
                    placeholder="Enter office phone number"
                    isRequired
                  />
                </Col>
                <Col>
                  <ControlledInput
                    name="postalAddress"
                    label="Postal address (if different from HQ)"
                    type="textarea"
                    placeholder="Enter postal address if different from headquarters"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Financial Information Card */}
          <Card className="mb-10 shadow-sm">
            <Card.Header className="border-0 pt-6 pb-2">
              <Card.Title className="d-flex align-items-center">
                <div className="symbol symbol-45px me-4">
                  <div className="symbol-label bg-light-primary">
                    <KTIcon iconName="financial-schedule" className="fs-2 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="fw-bold m-0 text-gray-800">Financial Information</h3>
                  <p className="text-muted fs-7 m-0">Billing and payment details</p>
                </div>
              </Card.Title>
            </Card.Header>
            <Card.Body className="pt-4">
              <Row className="g-8">
                <Col md={6}>
                  <ControlledInput
                    name="invoiceEmail"
                    label="Invoice email address"
                    type="email"
                    placeholder="Enter invoice email address"
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="vatNumber"
                    label="VAT/BTW Number"
                    type="text"
                    placeholder="Enter VAT/BTW number"
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="iban"
                    label="IBAN Number"
                    type="text"
                    placeholder="Enter IBAN number"
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="poNumber"
                    label="Add PO-Number (your reference on NGBLU invoices)"
                    type="text"
                    placeholder="Enter PO number for invoices"
                  />
                </Col>
                <Col>
                  <div className="d-flex align-items-center h-100">
                    <div className="form-check form-switch form-check-custom form-check-solid">
                      <ControlledSwitch
                        name="enableAutoDebit"
                        label={`${'Automatic Debit Collection'} ${watch('enableAutoDebit') ? 'On' : 'Off'}`}
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Conditional Terms and Conditions */}
              {enableAutoDebit && (
                <div className="mt-8">
                  <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6">
                    <KTIcon iconName="information-5" className="fs-2tx text-primary me-4" />
                    <div className="d-flex flex-stack flex-grow-1">
                      <div className="fw-semibold">
                        <div className="text-gray-700 fs-6 mb-4">
                          <strong>Automatic Debit Collection Terms:</strong> By enabling automatic
                          debit collection, you agree to authorize NGBLU to automatically collect
                          payments from your provided IBAN account.
                        </div>
                        <ControlledSwitch
                          type="checkbox"
                          name="termsAccepted"
                          label={
                            <span className="fs-6 fw-semibold text-gray-700">
                              I accept the{' '}
                              <a
                                href="https://ngblu.nl/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="fw-bold text-primary text-hover-primary"
                              >
                                Terms and Conditions
                              </a>{' '}
                              for automatic debit collection
                            </span>
                          }
                        />
                        {enableAutoDebit && !termsAccepted && (
                          <div className="text-danger fs-7 mt-2">
                            <KTIcon iconName="warning-2" className="fs-6 me-1" />
                            You must accept the terms and conditions to continue
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>

        <div className="d-flex flex-stack pt-10">
          <div className="me-2"></div>
          <div>
            <Button
              colorClass="primary"
              activeColorClass="primary"
              label="Continue"
              onClick={onNext}
              disabled={!isStepValid}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
