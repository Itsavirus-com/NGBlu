'use client'

import { Col, Row } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { GoogleMap } from '@/components/google-map/GoogleMap'
import { GoogleMapsProvider } from '@/components/google-map/GoogleMapsProvider'
import { KTIcon } from '@/components/kt-icon/KtIcon'

import { useBusinessProfileForm } from '../_hooks/business-profile-form.hook'

export const BusinessProfileForm = () => {
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
          <h2 className="fw-bold text-dark mb-1">Business Profile</h2>
          <div className="text-muted">Setup Business Partner Profile</div>
        </div>
      </div>

      {/* KVK Section */}
      <div className="card bg-light mb-8">
        <div className="card-body">
          <h4 className="mb-5">Company Information</h4>
          <Row>
            <Col md={6}>
              <ControlledInput
                name="kvkNumber"
                label="KVK number"
                placeholder="Enter KVK number (e.g., 12345678)"
                containerClass="mb-5"
              />
            </Col>
            <Col md={6} className="d-flex align-items-end">
              <Button
                type="button"
                label="Retrieve Company"
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
                label="Company Name"
                placeholder="Enter Company Name"
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
          <h4 className="mb-5">Company Address</h4>

          {/* Show postal code + house number lookup when KVK validation is not successful */}
          {!kvkValidationData?.success && (
            <>
              {kvkValidationData?.success === false && (
                <div className="mb-5">
                  <h5 className="text-primary">Try lookup by Postal Code and House Number</h5>
                  <p className="text-muted">
                    Enter a postal code and house number to retrieve address details
                  </p>
                </div>
              )}
              <Row>
                <Col md={6}>
                  <ControlledInput
                    name="postalCodeHouse"
                    label="Postal Code + House Number (optional for lookup)"
                    placeholder="Try: 1012LG 45 or 1234AB 5"
                    containerClass="mb-5"
                  />
                </Col>
                <Col md={6} className="d-flex align-items-end">
                  <Button
                    type="button"
                    label="Lookup Address"
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
                  <span className="fw-bold">Address retrieved from KVK:</span>{' '}
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
                  <span className="fw-bold">Address found:</span>{' '}
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
                label="Street Name"
                placeholder="Street"
                containerClass="mb-5"
                isRequired
              />
            </Col>
            <Col md={6}>
              <ControlledInput
                name="houseNumber"
                label="House Number"
                placeholder="123"
                containerClass="mb-5"
                isRequired
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <ControlledInput
                name="postalCode"
                label="Postal Code"
                placeholder="12345"
                containerClass="mb-5"
                isRequired
              />
            </Col>
            <Col md={6}>
              <ControlledInput
                name="city"
                label="City"
                placeholder="City Name"
                containerClass="mb-5"
                isRequired
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <ControlledInput
                name="country"
                label="Country"
                placeholder="Country name"
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
          <label className="form-label fw-bold">Maps Overview</label>
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
                  <div className="text-muted">Enter a complete address to display the map</div>
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
          <h4 className="fw-bold text-dark mb-5">Primary Contact Information</h4>

          <Row>
            <Col md={6}>
              <ControlledInput
                name="firstName"
                label="First Name"
                placeholder="First Name"
                containerClass="mb-5"
                isRequired
              />
              <ControlledInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="+31"
                containerClass="mb-5"
                isRequired
              />
            </Col>
            <Col md={6}>
              <ControlledInput
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                containerClass="mb-5"
                isRequired
              />
              <ControlledInput
                name="emailAddress"
                label="Email Address"
                type="email"
                placeholder="contact@company.com"
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
