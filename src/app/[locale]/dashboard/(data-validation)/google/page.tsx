'use client'
import { useTranslations } from 'next-intl'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { GoogleAddressAutocomplete } from '@/components/google-map/GoogleAddressAutocomplete'
import { GoogleMap } from '@/components/google-map/GoogleMap'
import { GoogleMapsProvider } from '@/components/google-map/GoogleMapsProvider'
import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import useGoogleForm from './_hooks/google.hook'
import './style.scss'

export default function Google() {
  const t = useTranslations('dataValidation')

  const {
    onSubmit,
    handlePrevious,
    handleNext,
    handleAccept,
    handleAddressSelect,
    methods,
    currentValidation,
    paginationInfo,
    displayMapCoordinates,
    currentSimilarityStatus,
    differences,
    isSubmitting,
    loadingType,
    isLoading,
  } = useGoogleForm()

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <PageTitle title={t('google.title')} />
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <GoogleMapsProvider>
          <div className="app-container container-fluid">
            <Card>
              <CardBody>
                <Row className="mb-8">
                  <Col lg={6}>
                    {currentSimilarityStatus && (
                      <span
                        className={`badge badge-${currentSimilarityStatus.color} px-6 py-4 rounded-pill fs-6`}
                      >
                        {currentSimilarityStatus.status}
                      </span>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <h4 className="mb-5">{t('google.originalAddress')}</h4>

                    <ControlledInput
                      label={t('streetAddress')}
                      name="streetAddressOriginal"
                      containerClass="mb-3"
                      className="form-control-solid"
                      disabled
                    />
                    <Row>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumber')}
                          name="houseNumberOriginal"
                          containerClass="mb-3"
                          className="form-control-solid"
                          disabled
                        />
                      </Col>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumberExtension')}
                          name="houseNumberExtensionOriginal"
                          containerClass="mb-3"
                          className="form-control-solid"
                          disabled
                        />
                      </Col>
                    </Row>
                    <ControlledInput
                      label={t('postcode')}
                      name="postcodeOriginal"
                      containerClass="mb-3"
                      className="form-control-solid"
                      disabled
                    />
                    <ControlledInput
                      label={t('city')}
                      name="cityOriginal"
                      containerClass="mb-3"
                      className="form-control-solid"
                      disabled
                    />
                    <ControlledInput
                      label={t('country')}
                      name="countryOriginal"
                      containerClass="mb-3"
                      className="form-control-solid"
                      disabled
                    />
                    <ControlledInput
                      label={t('google.lat')}
                      name="latOriginal"
                      containerClass="mb-3"
                      className="form-control-solid"
                      disabled
                    />
                    <ControlledInput
                      label={t('google.lon')}
                      name="lonOriginal"
                      className="form-control-solid"
                      disabled
                    />
                  </Col>

                  <Col lg={4}>
                    <h4 className="mb-5">{t('google.proposedAddress')}</h4>

                    <GoogleAddressAutocomplete
                      key={`address-autocomplete-${currentValidation?.id}`}
                      label={t('streetAddress')}
                      name="streetAddress"
                      placeholder={t('streetAddress')}
                      disabled={isSubmitting}
                      onAddressSelect={handleAddressSelect}
                    />

                    <Row>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumber')}
                          name="houseNumber"
                          containerClass="mb-3"
                          className="form-control-solid"
                          isInvalid={
                            differences.housenumber &&
                            differences.housenumber.confirmationLevel !== 'CONFIRMED'
                          }
                        />
                      </Col>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumberExtension')}
                          name="houseNumberExtension"
                          containerClass="mb-3"
                          className="form-control-solid"
                          isInvalid={
                            differences.housenumberSuffix &&
                            differences.housenumberSuffix.confirmationLevel !== 'CONFIRMED'
                          }
                        />
                      </Col>
                    </Row>

                    <ControlledInput
                      label={t('postcode')}
                      name="postcode"
                      containerClass="mb-3"
                      className="form-control-solid"
                      isInvalid={
                        differences.postalcode &&
                        differences.postalcode.confirmationLevel !== 'CONFIRMED'
                      }
                    />

                    <ControlledInput
                      label={t('city')}
                      name="city"
                      containerClass="mb-3"
                      className="form-control-solid"
                      isInvalid={
                        differences.city && differences.city.confirmationLevel !== 'CONFIRMED'
                      }
                    />

                    <ControlledInput
                      label={t('country')}
                      name="country"
                      containerClass="mb-3"
                      className="form-control-solid"
                      isInvalid={
                        differences.country && differences.country.confirmationLevel !== 'CONFIRMED'
                      }
                    />

                    <ControlledInput
                      label={t('google.lat')}
                      name="lat"
                      containerClass="mb-3"
                      className="form-control-solid"
                      disabled
                    />
                    <ControlledInput
                      label={t('google.lon')}
                      name="lon"
                      className="form-control-solid"
                      disabled
                    />
                  </Col>

                  <Col lg={4}>
                    <GoogleMap lat={displayMapCoordinates.lat} lng={displayMapCoordinates.lng} />
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={4} className="d-flex justify-content-end">
                    <Button
                      type="button"
                      colorClass="success"
                      onClick={() => handleAccept('original')}
                      disabled={isSubmitting || !currentValidation}
                      loading={isSubmitting && loadingType === 'original'}
                      label={t('acceptOriginalAddress')}
                      icon="check"
                      activeColorClass="light-success"
                    />
                  </Col>
                  <Col lg={4} className="d-flex justify-content-end">
                    <Button
                      type="button"
                      colorClass="primary"
                      onClick={() => handleAccept('google')}
                      disabled={isSubmitting || !currentValidation}
                      loading={isSubmitting && loadingType === 'google'}
                      label={t('acceptGoogleAddress')}
                      icon="check"
                    />
                  </Col>
                  <Col lg={4}></Col>
                </Row>

                <Row className="mt-8">
                  <Col className="d-flex justify-content-end align-items-center">
                    {paginationInfo && (
                      <span className="me-2">
                        {t('counter', {
                          start: paginationInfo.currentPage,
                          end: paginationInfo.total,
                        })}
                      </span>
                    )}

                    <Button
                      type="button"
                      colorClass="secondary"
                      className="me-2"
                      onClick={handlePrevious}
                      disabled={!paginationInfo || paginationInfo.currentPage <= 1}
                      icon="double-left-arrow"
                    />
                    <Button
                      type="button"
                      colorClass="secondary"
                      onClick={handleNext}
                      disabled={
                        !paginationInfo || paginationInfo.currentPage >= paginationInfo.lastPage
                      }
                      icon="double-right-arrow"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </GoogleMapsProvider>
      </FormProvider>
    </>
  )
}
