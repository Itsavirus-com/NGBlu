'use client'
import { useTranslations } from 'next-intl'
import { Badge, Card, CardBody, Col, Row } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { FormProvider } from '@/components/forms/form-provider'
import { GoogleAddressAutocomplete } from '@/components/google-map/GoogleAddressAutocomplete'
import { GoogleMap } from '@/components/google-map/GoogleMap'
import { GoogleMapsProvider } from '@/components/google-map/GoogleMapsProvider'
import { PageTitle } from '@/components/page-title'

import useGoogleForm, { FormValuesGoogle } from './_hooks/google.hook'

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
  } = useGoogleForm()

  // Helper to determine badge color based on confirmation level
  const getConfirmationBadge = (confirmationLevel?: string, fieldName?: keyof FormValuesGoogle) => {
    if (!confirmationLevel) return null

    if (confirmationLevel !== 'CONFIRMED') {
      // Check if field has been changed (only check when fieldName is provided)
      if (fieldName && methods.formState.dirtyFields[fieldName]) {
        return null // Don't show badge for changed fields
      } else {
        return (
          <Badge
            bg="warning"
            className="text-wrap"
            style={{ whiteSpace: 'normal', maxWidth: '100%', fontSize: '8px' }}
          >
            {t('google.googleCannotVerifyAddress')}
          </Badge>
        )
      }
    }

    // No longer returning null for CONFIRMED cases (empty fragment instead)
    return null
  }

  return (
    <>
      <PageTitle title={t('google.title')} />
      {(paginationInfo?.total ?? 0) <= 0 ? (
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-center align-items-center py-10">
                <div className="text-center">
                  <h4>{t('noDataAvailable')}</h4>
                  <p className="text-muted">{t('allItemsProcessed')}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ) : (
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
                        customLabel={getConfirmationBadge(
                          differences.streetname?.confirmationLevel,
                          'streetAddress'
                        )}
                        name="streetAddress"
                        placeholder={t('streetAddress')}
                        disabled={isSubmitting}
                        onAddressSelect={handleAddressSelect}
                        className={`form-control-solid ${
                          getConfirmationBadge(
                            differences.streetname?.confirmationLevel,
                            'streetAddress'
                          )
                            ? 'border-warning'
                            : ''
                        }`}
                      />

                      <Row>
                        <Col lg={6}>
                          <ControlledInput
                            label={t('houseNumber')}
                            customLabel={getConfirmationBadge(
                              differences.housenumber?.confirmationLevel,
                              'houseNumber'
                            )}
                            name="houseNumber"
                            containerClass="mb-3"
                            className={`form-control-solid ${
                              getConfirmationBadge(
                                differences.housenumber?.confirmationLevel,
                                'houseNumber'
                              )
                                ? 'border-warning'
                                : ''
                            }`}
                          />
                        </Col>
                        <Col lg={6}>
                          <ControlledInput
                            label={t('houseNumberExtension')}
                            customLabel={getConfirmationBadge(
                              differences.housenumberSuffix?.confirmationLevel,
                              'houseNumberExtension'
                            )}
                            name="houseNumberExtension"
                            containerClass="mb-3"
                            className={`form-control-solid ${
                              getConfirmationBadge(
                                differences.housenumberSuffix?.confirmationLevel,
                                'houseNumberExtension'
                              )
                                ? 'border-warning'
                                : ''
                            }`}
                          />
                        </Col>
                      </Row>

                      <ControlledInput
                        label={t('postcode')}
                        customLabel={getConfirmationBadge(
                          differences.postalcode?.confirmationLevel,
                          'postcode'
                        )}
                        name="postcode"
                        containerClass="mb-3"
                        className={`form-control-solid ${
                          getConfirmationBadge(
                            differences.postalcode?.confirmationLevel,
                            'postcode'
                          )
                            ? 'border-warning'
                            : ''
                        }`}
                      />

                      <ControlledInput
                        label={t('city')}
                        customLabel={getConfirmationBadge(
                          differences.city?.confirmationLevel,
                          'city'
                        )}
                        name="city"
                        containerClass="mb-3"
                        className={`form-control-solid ${
                          getConfirmationBadge(differences.city?.confirmationLevel, 'city')
                            ? 'border-warning'
                            : ''
                        }`}
                      />

                      <ControlledInput
                        label={t('country')}
                        customLabel={getConfirmationBadge(
                          differences.country?.confirmationLevel,
                          'country'
                        )}
                        name="country"
                        containerClass="mb-3"
                        className={`form-control-solid ${
                          getConfirmationBadge(differences.country?.confirmationLevel, 'country')
                            ? 'border-warning'
                            : ''
                        }`}
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
                        colorClass="primary"
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
                        colorClass="success"
                        activeColorClass="light-success"
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
      )}
    </>
  )
}
