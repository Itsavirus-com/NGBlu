'use client'

import { Card, Col, Row } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { KTIcon } from '@/components/kt-icon/KtIcon'

import { StepComponentProps } from '../../_types/profile-completion.type'

export function ContactDetailsStep({
  onNext,
  onPrevious,
  isFirst,
  isLast,
  isValid,
}: StepComponentProps) {
  return (
    <div className="stepper-content">
      <div className="w-100">
        <div className="pb-8 pb-lg-10 sticky-header">
          <h2 className="fw-bold text-dark">Contact Details</h2>
          <div className="text-muted fs-6">Essential contact persons for business operations</div>
        </div>

        {/* Required Contacts Card */}
        <Card className="mb-10 shadow-sm">
          <Card.Header className="border-0 pt-6 pb-2">
            <Card.Title className="d-flex align-items-center">
              <div className="symbol symbol-45px me-4">
                <div className="symbol-label bg-light-primary">
                  <KTIcon iconName="people" className="fs-2 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="fw-bold m-0 text-gray-800">Required Contacts</h3>
                <p className="text-muted fs-7 m-0">
                  Essential contact persons for business operations
                </p>
              </div>
            </Card.Title>
          </Card.Header>
          <Card.Body className="pt-4">
            {/* Financial Contact */}
            <div className="mb-10">
              <div className="d-flex align-items-center mb-6">
                <div className="symbol symbol-35px me-3">
                  <div className="symbol-label">
                    <KTIcon iconName="financial-schedule" className="fs-4" />
                  </div>
                </div>
                <h4 className="fw-semibold text-gray-800 m-0">Financial Contact</h4>
              </div>
              <Row className="g-6">
                <Col md={6}>
                  <ControlledInput
                    name="financialContact.firstName"
                    label="First Name"
                    type="text"
                    placeholder="Enter first name"
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="financialContact.lastName"
                    label="Last Name"
                    type="text"
                    placeholder="Enter last name"
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="financialContact.email"
                    label="E-mail"
                    type="email"
                    placeholder="Enter email address"
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="financialContact.phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter phone number"
                    isRequired
                  />
                </Col>
              </Row>
            </div>

            {/* Support Contact */}
            <div className="mb-0">
              <div className="d-flex align-items-center mb-6">
                <div className="symbol symbol-35px me-3">
                  <div className="symbol-label">
                    <KTIcon iconName="people" className="fs-4" />
                  </div>
                </div>
                <h4 className="fw-semibold text-gray-800 m-0">Support Contact</h4>
              </div>
              <Row className="g-6">
                <Col md={6}>
                  <ControlledInput
                    name="supportContact.firstName"
                    label="First Name"
                    type="text"
                    placeholder="Enter first name"
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="supportContact.lastName"
                    label="Last Name"
                    type="text"
                    placeholder="Enter last name"
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="supportContact.email"
                    label="E-mail"
                    type="email"
                    placeholder="Enter email address"
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="supportContact.phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter phone number"
                    isRequired
                  />
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>

        {/* Optional Contacts Card */}
        <Card className="mb-10 shadow-sm">
          <Card.Header className="border-0 pt-6 pb-2">
            <Card.Title className="d-flex align-items-center">
              <div className="symbol symbol-45px me-4">
                <div className="symbol-label bg-light-success">
                  <KTIcon iconName="setting-2" className="fs-2 text-success" />
                </div>
              </div>
              <div>
                <h3 className="fw-bold m-0 text-gray-800">Additional Contacts</h3>
                <p className="text-muted fs-7 m-0">
                  Optional contacts to enhance business communication
                </p>
              </div>
            </Card.Title>
          </Card.Header>
          <Card.Body className="pt-4">
            {/* Commercial/Marketing Contact */}
            <div className="mb-10">
              <div className="d-flex align-items-center mb-6">
                <div className="symbol symbol-30px me-3">
                  <div className="symbol-label">
                    <KTIcon iconName="chart-line" className="fs-5" />
                  </div>
                </div>
                <h4 className="fw-semibold text-gray-700 m-0">Commercial/Marketing Contact</h4>
              </div>
              <Row className="g-6">
                <Col md={6}>
                  <ControlledInput
                    name="commercialContact.firstName"
                    label="First Name"
                    type="text"
                    placeholder="Enter first name"
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="commercialContact.lastName"
                    label="Last Name"
                    type="text"
                    placeholder="Enter last name"
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="commercialContact.email"
                    label="E-mail"
                    type="email"
                    placeholder="Enter email address"
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="commercialContact.phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter phone number"
                  />
                </Col>
              </Row>
            </div>

            {/* Delivery Contact */}
            <div className="mb-10">
              <div className="d-flex align-items-center mb-6">
                <div className="symbol symbol-30px me-3">
                  <div className="symbol-label">
                    <KTIcon iconName="delivery" className="fs-5" />
                  </div>
                </div>
                <h4 className="fw-semibold text-gray-700 m-0">Delivery Contact</h4>
              </div>
              <Row className="g-6">
                <Col md={6}>
                  <ControlledInput
                    name="deliveryContact.firstName"
                    label="First Name"
                    type="text"
                    placeholder="Enter first name"
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="deliveryContact.lastName"
                    label="Last Name"
                    type="text"
                    placeholder="Enter last name"
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="deliveryContact.email"
                    label="E-mail"
                    type="email"
                    placeholder="Enter email address"
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="deliveryContact.phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter phone number"
                  />
                </Col>
              </Row>
            </div>

            {/* Out of hours Support Contact */}
            <div className="mb-0">
              <div className="d-flex align-items-center mb-6">
                <div className="symbol symbol-30px me-3">
                  <div className="symbol-label">
                    <KTIcon iconName="night-day" className="fs-5" />
                  </div>
                </div>
                <h4 className="fw-semibold text-gray-700 m-0">Out of Hours Support Contact</h4>
              </div>
              <Row className="g-6">
                <Col md={6}>
                  <ControlledInput
                    name="outOfHoursContact.firstName"
                    label="First Name"
                    type="text"
                    placeholder="Enter first name"
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="outOfHoursContact.lastName"
                    label="Last Name"
                    type="text"
                    placeholder="Enter last name"
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="outOfHoursContact.email"
                    label="E-mail"
                    type="email"
                    placeholder="Enter email address"
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="outOfHoursContact.phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter phone number"
                  />
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="d-flex flex-stack pt-10">
        <div className="me-2">
          {!isFirst && (
            <Button
              colorClass="light"
              activeColorClass="light-primary"
              label="Previous"
              onClick={onPrevious}
            />
          )}
        </div>
        <div>
          <Button
            colorClass="primary"
            activeColorClass="primary"
            label={isLast ? 'Complete Profile' : 'Next'}
            onClick={onNext}
            disabled={!isValid}
          />
        </div>
      </div>
    </div>
  )
}
