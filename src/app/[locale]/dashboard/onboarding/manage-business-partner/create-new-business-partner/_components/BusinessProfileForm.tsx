'use client'

import { useTranslations } from 'next-intl'
import { Col, Row } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { GoogleMap } from '@/components/google-map/GoogleMap'
import { GoogleMapsProvider } from '@/components/google-map/GoogleMapsProvider'
import { KTIcon } from '@/components/kt-icon/KtIcon'

import { useBusinessProfileForm } from '../_hooks/business-profile-form.hook'

export const BusinessProfileForm = () => {
  const t = useTranslations('dataManagement.createBusinessPartner.businessProfile')
  const {
    kvkNumber,
    postalCodeHouse,
    streetName,
    houseNumber,
    city,
    isValidatingKvk,
    isLookingUpAddress,
    kvkValidationData,
    addressLookupData,
    shouldRenderMap,
    mapCoordinates,
    lastProcessedAddressRef,
    handleKvkValidation,
    handleAddressLookup,
    handleLocationSelect,
  } = useBusinessProfileForm()

  return (
    <div>
      <div className="d-flex align-items-center mb-8">
        <div className="symbol symbol-50px symbol-circle me-5">
          <div className="symbol-label bg-light-primary">
            <KTIcon iconType="duotone" iconName="profile-user" className="text-primary fs-1" />
          </div>
        </div>
        <div>
          <h2 className="fw-bold text-dark mb-1">{t('title')}</h2>
          <div className="text-muted">{t('description')}</div>
        </div>
      </div>

      {/* KVK Section */}
      <div className="card bg-light mb-8">
        <div className="card-body">
          <h4 className="mb-5">{t('companyInformation')}</h4>
          <Row>
            <Col md={6}>
              <ControlledInput
                name="kvkNumber"
                label={t('kvkNumber')}
                placeholder={t('kvkNumberPlaceholder')}
                containerClass="mb-5"
              />
            </Col>
            <Col md={6} className="d-flex align-items-end">
              <Button
                type="button"
                label={t('retrieveCompany')}
                colorClass="primary"
                onClick={handleKvkValidation}
                loading={isValidatingKvk}
                disabled={!kvkNumber || kvkNumber.trim() === ''}
                className="mb-5"
              />
            </Col>
          </Row>

          {/* KVK Not Found Message */}
          {kvkValidationData?.success === false && kvkValidationData?.message && (
            <div className="alert alert-warning mb-5">
              <div className="d-flex align-items-center">
                <span className="svg-icon svg-icon-2hx svg-icon-warning me-3">
                  <KTIcon iconType="duotone" iconName="information" className="fs-1 text-warning" />
                </span>
                <div className="text-dark">{kvkValidationData.message}</div>
              </div>
            </div>
          )}

          <Row>
            <Col md={12}>
              <ControlledInput
                name="companyName"
                label={t('companyName')}
                placeholder={t('companyNamePlaceholder')}
                containerClass="mb-5"
                isRequired
              />
            </Col>
          </Row>
        </div>
      </div>

      {/* Address Section - Always visible */}
      <div className="card bg-light mb-8">
        <div className="card-body">
          <h4 className="mb-5">{t('companyAddress')}</h4>

          {/* Show postal code + house number lookup when KVK validation is not successful */}
          {!kvkValidationData?.success && (
            <>
              {kvkValidationData?.success === false && (
                <div className="mb-5">
                  <h5 className="text-primary">{t('lookupByPostalCode')}</h5>
                  <p className="text-muted">{t('lookupByPostalCodeDesc')}</p>
                </div>
              )}
              <Row>
                <Col md={6}>
                  <ControlledInput
                    name="postalCodeHouse"
                    label={t('postalCodeHouse')}
                    placeholder={t('postalCodeHousePlaceholder')}
                    containerClass="mb-5"
                  />
                </Col>
                <Col md={6} className="d-flex align-items-end">
                  <Button
                    type="button"
                    label={t('lookupAddress')}
                    colorClass="primary"
                    onClick={handleAddressLookup}
                    loading={isLookingUpAddress}
                    disabled={!postalCodeHouse || postalCodeHouse.trim() === ''}
                    className="mb-5"
                  />
                </Col>
              </Row>
            </>
          )}

          {kvkValidationData?.success && (
            <div className="alert alert-success mb-5">
              <div className="d-flex align-items-center">
                <span className="svg-icon svg-icon-2hx svg-icon-success me-3">
                  <KTIcon iconType="duotone" iconName="shield-tick" className="fs-1 text-success" />
                </span>
                <div>
                  <span className="fw-bold">{t('addressRetrievedKvk')}</span>{' '}
                  {kvkValidationData.data[0].streetName} {kvkValidationData.data[0].houseNumber},{' '}
                  {kvkValidationData.data[0].postalCode} {kvkValidationData.data[0].city}
                </div>
              </div>
            </div>
          )}

          {addressLookupData?.success && !kvkValidationData?.success && (
            <div className="alert alert-success mb-5">
              <div className="d-flex align-items-center">
                <span className="svg-icon svg-icon-2hx svg-icon-success me-3">
                  <KTIcon iconType="duotone" iconName="shield-tick" className="fs-1 text-success" />
                </span>
                <div>
                  <span className="fw-bold">{t('addressFound')}</span>{' '}
                  {addressLookupData.data[0].streetName} {addressLookupData.data[0].houseNumber},{' '}
                  {postalCodeHouse?.split(' ')?.[0] || ''} {addressLookupData.data[0].city}
                </div>
              </div>
            </div>
          )}

          <Row>
            <Col md={6}>
              <ControlledInput
                name="streetName"
                label={t('streetName')}
                placeholder={t('streetNamePlaceholder')}
                containerClass="mb-5"
                isRequired
              />
            </Col>
            <Col md={6}>
              <ControlledInput
                name="houseNumber"
                label={t('houseNumber')}
                placeholder={t('houseNumberPlaceholder')}
                containerClass="mb-5"
                isRequired
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <ControlledInput
                name="postalCode"
                label={t('postalCode')}
                placeholder={t('postalCodePlaceholder')}
                containerClass="mb-5"
                isRequired
              />
            </Col>
            <Col md={6}>
              <ControlledInput
                name="city"
                label={t('city')}
                placeholder={t('cityPlaceholder')}
                containerClass="mb-5"
                isRequired
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <ControlledInput
                name="country"
                label={t('country')}
                placeholder={t('countryPlaceholder')}
                containerClass="mb-5"
                isRequired
              />
            </Col>
          </Row>
        </div>
      </div>

      {/* Maps Overview - Show if we have address data */}
      {(kvkValidationData?.success || addressLookupData?.success) && (
        <div className="mb-8">
          <label className="form-label fw-bold">{t('mapsOverview')}</label>
          <div
            className="bg-light border rounded p-0"
            style={{ height: '400px', position: 'relative' }}
          >
            {shouldRenderMap && streetName && houseNumber && city ? (
              <GoogleMapsProvider>
                <GoogleMap
                  lat={mapCoordinates?.lat || 52.3676} // Default to Amsterdam if no coordinates
                  lng={mapCoordinates?.lng || 4.9041}
                  address={lastProcessedAddressRef.current}
                  onLocationSelect={handleLocationSelect}
                />
              </GoogleMapsProvider>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="text-center">
                  <KTIcon
                    iconType="duotone"
                    iconName="geolocation"
                    className="text-muted fs-3x mb-3"
                  />
                  <div className="text-muted">{t('enterAddressForMap')}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Primary Contact Information */}
      <div className="separator my-10"></div>

      <div className="card bg-light mb-8">
        <div className="card-body">
          <h4 className="fw-bold text-dark mb-5">{t('primaryContact')}</h4>

          <Row>
            <Col md={6}>
              <ControlledInput
                name="firstName"
                label={t('firstName')}
                placeholder={t('firstNamePlaceholder')}
                containerClass="mb-5"
                isRequired
              />
              <ControlledInput
                name="phoneNumber"
                label={t('phoneNumber')}
                placeholder={t('phoneNumberPlaceholder')}
                containerClass="mb-5"
                isRequired
              />
            </Col>
            <Col md={6}>
              <ControlledInput
                name="lastName"
                label={t('lastName')}
                placeholder={t('lastNamePlaceholder')}
                containerClass="mb-5"
                isRequired
              />
              <ControlledInput
                name="emailAddress"
                label={t('emailAddress')}
                type="email"
                placeholder={t('emailAddressPlaceholder')}
                containerClass="mb-5"
                isRequired
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
