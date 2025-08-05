'use client'
import { useTranslations } from 'next-intl'
import { Badge, Card, CardBody, Col, Row } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { FormProvider } from '@/components/forms/form-provider'
import { PageTitle } from '@/components/page-title'

import useKvkForm, { FormValuesKvk } from './_hooks/kvk.hook'

export default function Kvk() {
  const t = useTranslations('dataValidation')

  const {
    methods,
    onSubmit,
    goToNext,
    goToPrevious,
    totalItems,
    isLoading,
    position,
    hasNextItem,
    hasPreviousItem,
    handleAccept,
    similarityStatus,
    currentItem,
    isSubmitting,
    loadingType,
    fieldSimilarityStatuses,
  } = useKvkForm()

  // Helper to determine badge color based on similarity status
  const getSimilarityFieldStatus = (similarityStatus?: string, fieldName?: keyof FormValuesKvk) => {
    if (!similarityStatus) return null

    // Check if field has been changed
    if (fieldName && methods.formState.dirtyFields[fieldName]) {
      return null // Don't show badge for changed fields
    }

    switch (similarityStatus) {
      case 'Need to be checked':
        return (
          <Badge
            bg="warning"
            className="text-wrap"
            style={{ whiteSpace: 'normal', maxWidth: '100%', fontSize: '8px' }}
          >
            {t('kvk.needsToBeChecked')}
          </Badge>
        )
      case 'Similar':
        return (
          <Badge
            bg="warning"
            className="text-wrap"
            style={{ whiteSpace: 'normal', maxWidth: '100%', fontSize: '8px' }}
          >
            {t('kvk.similarAddress')}
          </Badge>
        )
      case 'Invalid':
        return (
          <Badge
            bg="danger"
            className="text-white text-wrap"
            style={{ whiteSpace: 'normal', maxWidth: '100%', fontSize: '8px' }}
          >
            {t('kvk.invalidAddress')}
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <>
      <PageTitle title={t('kvk.title')} />

      {totalItems <= 0 ? (
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
          <div className="app-container container-fluid">
            <Card>
              <CardBody>
                <Row className="mb-8">
                  <Col lg={6}>
                    {totalItems > 0 && currentItem && (
                      <span
                        className={`badge badge-${similarityStatus.color} px-6 py-4 rounded-pill fs-6`}
                      >
                        {similarityStatus.status}
                      </span>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <h4 className="mb-5">{t('kvk.originalAddress')}</h4>

                    <ControlledInput
                      label={t('companyName')}
                      customLabel={getSimilarityFieldStatus(
                        fieldSimilarityStatuses.companyName?.status,
                        'companyNameOriginal'
                      )}
                      name="companyNameOriginal"
                      containerClass="mb-3"
                      className={`form-control-solid ${
                        getSimilarityFieldStatus(
                          fieldSimilarityStatuses.companyName?.status,
                          'companyNameOriginal'
                        )
                          ? `border-${fieldSimilarityStatuses.companyName?.color}`
                          : ''
                      }`}
                    />
                    <ControlledInput
                      label={t('kvkNumber')}
                      customLabel={getSimilarityFieldStatus(
                        fieldSimilarityStatuses.kvkNumber?.status,
                        'kvkNumberOriginal'
                      )}
                      name="kvkNumberOriginal"
                      containerClass="mb-3"
                      className={`form-control-solid ${
                        getSimilarityFieldStatus(
                          fieldSimilarityStatuses.kvkNumber?.status,
                          'kvkNumberOriginal'
                        )
                          ? `border-${fieldSimilarityStatuses.kvkNumber?.color}`
                          : ''
                      }`}
                    />
                    <ControlledInput
                      label={t('streetAddress')}
                      customLabel={getSimilarityFieldStatus(
                        fieldSimilarityStatuses.streetName?.status,
                        'streetAddressOriginal'
                      )}
                      name="streetAddressOriginal"
                      containerClass="mb-3"
                      className={`form-control-solid ${
                        getSimilarityFieldStatus(
                          fieldSimilarityStatuses.streetName?.status,
                          'streetAddressOriginal'
                        )
                          ? `border-${fieldSimilarityStatuses.streetName?.color}`
                          : ''
                      }`}
                    />
                    <Row>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumber')}
                          customLabel={getSimilarityFieldStatus(
                            fieldSimilarityStatuses.houseNumber?.status,
                            'houseNumberOriginal'
                          )}
                          name="houseNumberOriginal"
                          containerClass="mb-3"
                          className={`form-control-solid ${
                            getSimilarityFieldStatus(
                              fieldSimilarityStatuses.houseNumber?.status,
                              'houseNumberOriginal'
                            )
                              ? `border-${fieldSimilarityStatuses.houseNumber?.color}`
                              : ''
                          }`}
                        />
                      </Col>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumberExtension')}
                          customLabel={getSimilarityFieldStatus(
                            fieldSimilarityStatuses.houseNumberExtension?.status,
                            'houseNumberExtensionOriginal'
                          )}
                          name="houseNumberExtensionOriginal"
                          containerClass="mb-3"
                          className={`form-control-solid ${
                            getSimilarityFieldStatus(
                              fieldSimilarityStatuses.houseNumberExtension?.status,
                              'houseNumberExtensionOriginal'
                            )
                              ? `border-${fieldSimilarityStatuses.houseNumberExtension?.color}`
                              : ''
                          }`}
                        />
                      </Col>
                    </Row>
                    <ControlledInput
                      label={t('postcode')}
                      customLabel={getSimilarityFieldStatus(
                        fieldSimilarityStatuses.postalcode?.status,
                        'postcodeOriginal'
                      )}
                      name="postcodeOriginal"
                      containerClass="mb-3"
                      className={`form-control-solid ${
                        getSimilarityFieldStatus(
                          fieldSimilarityStatuses.postalcode?.status,
                          'postcodeOriginal'
                        )
                          ? `border-${fieldSimilarityStatuses.postalcode?.color}`
                          : ''
                      }`}
                    />
                    <ControlledInput
                      label={t('city')}
                      customLabel={getSimilarityFieldStatus(
                        fieldSimilarityStatuses.city?.status,
                        'cityOriginal'
                      )}
                      name="cityOriginal"
                      containerClass="mb-3"
                      className={`form-control-solid ${
                        getSimilarityFieldStatus(
                          fieldSimilarityStatuses.city?.status,
                          'cityOriginal'
                        )
                          ? `border-${fieldSimilarityStatuses.city?.color}`
                          : ''
                      }`}
                    />
                    <ControlledInput
                      label={t('country')}
                      customLabel={getSimilarityFieldStatus(
                        fieldSimilarityStatuses.country?.status,
                        'countryOriginal'
                      )}
                      name="countryOriginal"
                      className={`form-control-solid ${
                        getSimilarityFieldStatus(
                          fieldSimilarityStatuses.country?.status,
                          'countryOriginal'
                        )
                          ? `border-${fieldSimilarityStatuses.country?.color}`
                          : ''
                      }`}
                    />
                  </Col>
                  <Col lg={6}>
                    <h4 className="mb-5">{t('kvk.registeredAddress')}</h4>

                    <ControlledInput
                      label={t('companyName')}
                      name="companyName"
                      containerClass="mb-3"
                      disabled
                    />
                    <ControlledInput
                      label={t('kvkNumber')}
                      name="kvkNumber"
                      containerClass="mb-3"
                      className="form-control-solid"
                      disabled
                    />
                    <ControlledInput
                      label={t('streetAddress')}
                      name="streetAddress"
                      containerClass="mb-3"
                      disabled
                    />
                    <Row>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumber')}
                          name="houseNumber"
                          containerClass="mb-3"
                          disabled
                        />
                      </Col>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumberExtension')}
                          name="houseNumberExtension"
                          containerClass="mb-3"
                          disabled
                        />
                      </Col>
                    </Row>
                    <ControlledInput
                      label={t('postcode')}
                      name="postcode"
                      containerClass="mb-3"
                      disabled
                    />
                    <ControlledInput label={t('city')} name="city" containerClass="mb-3" disabled />
                    <ControlledInput label={t('country')} name="country" disabled />
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={6} className="d-flex justify-content-end">
                    <Button
                      type="button"
                      colorClass="primary"
                      onClick={() => handleAccept('original')}
                      disabled={isLoading || isSubmitting || totalItems === 0}
                      loading={isSubmitting && loadingType === 'original'}
                      label={t('acceptOriginalAddress')}
                      icon="check"
                      activeColorClass="light-success"
                    />
                  </Col>
                  <Col lg={6} className="d-flex justify-content-end">
                    <Button
                      type="button"
                      colorClass="success"
                      activeColorClass="light-success"
                      onClick={() => handleAccept('kvk')}
                      disabled={isLoading || isSubmitting || totalItems === 0}
                      loading={isSubmitting && loadingType === 'kvk'}
                      label={t('acceptKvkAddress')}
                      icon="check"
                    />
                  </Col>
                </Row>

                {totalItems > 0 && (
                  <Row className="mt-8">
                    <Col className="d-flex justify-content-end align-items-center">
                      <span className="me-2">
                        {t('counter', { start: position.start, end: position.end })}
                      </span>

                      <Button
                        type="button"
                        colorClass="secondary"
                        className="me-2"
                        onClick={goToPrevious}
                        disabled={isLoading || !hasPreviousItem}
                        icon="double-left-arrow"
                      />
                      <Button
                        type="button"
                        colorClass="secondary"
                        onClick={goToNext}
                        disabled={isLoading || !hasNextItem}
                        icon="double-right-arrow"
                      />
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </div>
        </FormProvider>
      )}
    </>
  )
}
