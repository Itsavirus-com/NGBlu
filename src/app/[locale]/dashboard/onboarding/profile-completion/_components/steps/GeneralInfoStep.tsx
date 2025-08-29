'use client'

import { useTranslations } from 'next-intl'
import { Card, Col, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/button/button'
import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { ControlledSelect } from '@/components/forms/controlled-select/ControlledSelect'
import { ControlledSwitch } from '@/components/forms/controlled-switch/ControlledSwitch'
import { KTIcon } from '@/components/kt-icon/KtIcon'

import { ProfileCompletionData, StepComponentProps } from '../../_types/profile-completion.type'

export function GeneralInfoStep({ onNext, isValid }: StepComponentProps) {
  const t = useTranslations('profileCompletion.generalInfo')
  const { watch } = useFormContext<ProfileCompletionData>()
  const addressType = watch('addressType')

  return (
    <div className="stepper-content">
      <div className="w-100">
        <div className="pb-8 pb-lg-10 sticky-header">
          <h2 className="fw-bold text-dark">{t('title')}</h2>
          <div className="text-muted fs-6">{t('subtitle')}</div>
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
                  <h3 className="fw-bold m-0 text-gray-800">{t('basicInformation')}</h3>
                  <p className="text-muted fs-7 m-0">{t('basicInformationDescription')}</p>
                </div>
              </Card.Title>
            </Card.Header>
            <Card.Body className="pt-4">
              <Row className="g-8">
                <Col md={6}>
                  <ControlledInput
                    name="generalEmail"
                    label={t('generalEmailAddress')}
                    type="email"
                    placeholder={t('generalEmailPlaceholder')}
                    isRequired
                  />
                </Col>

                <Col md={6}>
                  <ControlledInput
                    name="officePhone"
                    label={t('officePhoneNumber')}
                    type="tel"
                    placeholder={t('officePhonePlaceholder')}
                    isRequired
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Address Information Card */}
          <Card className="mb-10 shadow-sm">
            <Card.Header className="border-0 pt-6 pb-2">
              <Card.Title className="d-flex align-items-center">
                <div className="symbol symbol-45px me-4">
                  <div className="symbol-label bg-light-primary">
                    <KTIcon iconName="map" className="fs-2 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="fw-bold m-0 text-gray-800">{t('addressInformation')}</h3>
                  <p className="text-muted fs-7 m-0">{t('addressInformationDescription')}</p>
                </div>
              </Card.Title>
            </Card.Header>
            <Card.Body className="pt-4">
              {/* Address Type Selection */}
              <div className="mb-8">
                <label className="form-label fw-semibold text-gray-700 mb-4">
                  {t('addressType')}
                </label>
                <div className="d-flex gap-4">
                  <ControlledSwitch
                    name="addressType"
                    type="radio"
                    value="po_box"
                    label={t('poBox')}
                  />
                  <ControlledSwitch
                    name="addressType"
                    type="radio"
                    value="general_address"
                    label={t('generalAddress')}
                  />
                </div>
              </div>

              {/* PO Box Fields */}
              {addressType === 'po_box' && (
                <Row className="g-8">
                  <Col md={6}>
                    <ControlledInput
                      name="poBox.number"
                      label={t('poBoxNumber')}
                      type="text"
                      placeholder={t('poBoxNumberPlaceholder')}
                      isRequired
                    />
                  </Col>
                  <Col md={6}>
                    <ControlledSelect
                      name="poBox.countryId"
                      label={t('country')}
                      apiPath="countries"
                      option={{
                        label: (item: any) => item.name,
                        value: (item: any) => item.id,
                      }}
                      isRequired
                    />
                  </Col>
                </Row>
              )}

              {/* General Address Fields */}
              {addressType === 'general_address' && (
                <Row className="g-8">
                  <Col md={6}>
                    <ControlledInput
                      name="generalAddress.streetName"
                      label={t('streetName')}
                      type="text"
                      placeholder={t('streetNamePlaceholder')}
                      isRequired
                    />
                  </Col>
                  <Col md={3}>
                    <ControlledInput
                      name="generalAddress.houseNumber"
                      label={t('houseNumber')}
                      type="text"
                      placeholder={t('houseNumberPlaceholder')}
                      isRequired
                    />
                  </Col>
                  <Col md={3}>
                    <ControlledInput
                      name="generalAddress.houseNumberSuffix"
                      label={t('houseNumberSuffix')}
                      type="text"
                      placeholder={t('houseNumberSuffixPlaceholder')}
                    />
                  </Col>
                  <Col md={6}>
                    <ControlledInput
                      name="generalAddress.city"
                      label={t('city')}
                      type="text"
                      placeholder={t('cityPlaceholder')}
                      isRequired
                    />
                  </Col>
                  <Col md={3}>
                    <ControlledInput
                      name="generalAddress.postalCode"
                      label={t('postalCode')}
                      type="text"
                      placeholder={t('postalCodePlaceholder')}
                      isRequired
                    />
                  </Col>
                  <Col md={3}>
                    <ControlledSelect
                      name="generalAddress.countryId"
                      label={t('country')}
                      apiPath="countries"
                      option={{
                        label: (item: any) => item.name,
                        value: (item: any) => item.id,
                      }}
                      isRequired
                    />
                  </Col>
                </Row>
              )}
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
                  <h3 className="fw-bold m-0 text-gray-800">{t('financialInformation')}</h3>
                  <p className="text-muted fs-7 m-0">{t('financialInformationDescription')}</p>
                </div>
              </Card.Title>
            </Card.Header>
            <Card.Body className="pt-4">
              <Row className="g-8">
                <Col md={6}>
                  <ControlledInput
                    name="invoiceEmail"
                    label={t('invoiceEmailAddress')}
                    type="email"
                    placeholder={t('invoiceEmailPlaceholder')}
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="vatNumber"
                    label={t('vatBtwNumber')}
                    type="text"
                    placeholder={t('vatBtwNumberPlaceholder')}
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="iban"
                    label={t('ibanNumber')}
                    type="text"
                    placeholder={t('ibanNumberPlaceholder')}
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="bankBic"
                    label={t('bankBicSwiftCode')}
                    type="text"
                    placeholder={t('bankBicSwiftCodePlaceholder')}
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="accountHolderName"
                    label={t('accountHolderName')}
                    type="text"
                    placeholder={t('accountHolderNamePlaceholder')}
                    isRequired
                  />
                </Col>
                <Col md={6}>
                  <ControlledInput
                    name="poNumber"
                    label={t('poNumber')}
                    type="text"
                    placeholder={t('poNumberPlaceholder')}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>

        <div className="d-flex flex-stack pt-10">
          <div className="me-2"></div>
          <div>
            <Button
              colorClass="primary"
              activeColorClass="primary"
              label={t('continue')}
              onClick={onNext}
              disabled={!isValid}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
