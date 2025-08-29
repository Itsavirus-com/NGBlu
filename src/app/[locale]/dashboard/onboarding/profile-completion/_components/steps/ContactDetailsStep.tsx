'use client'

import { useTranslations } from 'next-intl'
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
  const t = useTranslations('profileCompletion.contactDetails')
  return (
    <div className="stepper-content">
      <div className="w-100">
        <div className="pb-8 pb-lg-10 sticky-header">
          <h2 className="fw-bold text-dark">{t('title')}</h2>
          <div className="text-muted fs-6">{t('subtitle')}</div>
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
                <h3 className="fw-bold m-0 text-gray-800">{t('requiredContacts')}</h3>
                <p className="text-muted fs-7 m-0">{t('requiredContactsDescription')}</p>
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
                <h4 className="fw-semibold text-gray-800 m-0">{t('financialContact')}</h4>
              </div>
              <Row className="g-6">
                <Col md={6}>
                  <ControlledInput
                    name="financialContact.firstName"
                    label={t('firstName')}
                    type="text"
                    placeholder={t('firstNamePlaceholder')}
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="financialContact.lastName"
                    label={t('lastName')}
                    type="text"
                    placeholder={t('lastNamePlaceholder')}
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="financialContact.email"
                    label={t('email')}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="financialContact.phone"
                    label={t('phoneNumber')}
                    type="tel"
                    placeholder={t('phoneNumberPlaceholder')}
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
                <h4 className="fw-semibold text-gray-800 m-0">{t('supportContact')}</h4>
              </div>
              <Row className="g-6">
                <Col md={6}>
                  <ControlledInput
                    name="supportContact.firstName"
                    label={t('firstName')}
                    type="text"
                    placeholder={t('firstNamePlaceholder')}
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="supportContact.lastName"
                    label={t('lastName')}
                    type="text"
                    placeholder={t('lastNamePlaceholder')}
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="supportContact.email"
                    label={t('email')}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="supportContact.phone"
                    label={t('phoneNumber')}
                    type="tel"
                    placeholder={t('phoneNumberPlaceholder')}
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
                <h3 className="fw-bold m-0 text-gray-800">{t('additionalContacts')}</h3>
                <p className="text-muted fs-7 m-0">{t('additionalContactsDescription')}</p>
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
                <h4 className="fw-semibold text-gray-700 m-0">{t('commercialMarketingContact')}</h4>
              </div>
              <Row className="g-6">
                <Col md={6}>
                  <ControlledInput
                    name="commercialContact.firstName"
                    label={t('firstName')}
                    type="text"
                    placeholder={t('firstNamePlaceholder')}
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="commercialContact.lastName"
                    label={t('lastName')}
                    type="text"
                    placeholder={t('lastNamePlaceholder')}
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="commercialContact.email"
                    label={t('email')}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="commercialContact.phone"
                    label={t('phoneNumber')}
                    type="tel"
                    placeholder={t('phoneNumberPlaceholder')}
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
                <h4 className="fw-semibold text-gray-700 m-0">{t('deliveryContact')}</h4>
              </div>
              <Row className="g-6">
                <Col md={6}>
                  <ControlledInput
                    name="deliveryContact.firstName"
                    label={t('firstName')}
                    type="text"
                    placeholder={t('firstNamePlaceholder')}
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="deliveryContact.lastName"
                    label={t('lastName')}
                    type="text"
                    placeholder={t('lastNamePlaceholder')}
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="deliveryContact.email"
                    label={t('email')}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="deliveryContact.phone"
                    label={t('phoneNumber')}
                    type="tel"
                    placeholder={t('phoneNumberPlaceholder')}
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
                <h4 className="fw-semibold text-gray-700 m-0">{t('outOfHoursSupportContact')}</h4>
              </div>
              <Row className="g-6">
                <Col md={6}>
                  <ControlledInput
                    name="outOfHoursContact.firstName"
                    label={t('firstName')}
                    type="text"
                    placeholder={t('firstNamePlaceholder')}
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="outOfHoursContact.lastName"
                    label={t('lastName')}
                    type="text"
                    placeholder={t('lastNamePlaceholder')}
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="outOfHoursContact.email"
                    label={t('email')}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="outOfHoursContact.phone"
                    label={t('phoneNumber')}
                    type="tel"
                    placeholder={t('phoneNumberPlaceholder')}
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
              label={t('previous')}
              onClick={onPrevious}
            />
          )}
        </div>
        <div>
          <Button
            colorClass="primary"
            activeColorClass="primary"
            label={isLast ? t('completeProfile') : t('next')}
            onClick={onNext}
            disabled={!isValid}
          />
        </div>
      </div>
    </div>
  )
}
