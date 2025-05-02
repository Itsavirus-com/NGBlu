'use client'
import { useTranslations } from 'next-intl'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { PageTitle } from '@/components/page-title'

import useKvkForm from './_hooks/kvk.hook'

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
    handleReject,
    similarityStatus,
    currentItem,
    fieldDifferences,
    isSubmitting,
  } = useKvkForm()

  return (
    <>
      <PageTitle title={t('kvk.title')} />

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
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
                  <Col lg={6} className="d-flex justify-content-end">
                    <Button
                      type="button"
                      colorClass="success"
                      className="me-2"
                      onClick={handleAccept}
                      disabled={isLoading || isSubmitting || totalItems === 0}
                      loading={isSubmitting}
                      label={t('accept')}
                      icon="check"
                    />
                    <Button
                      type="button"
                      colorClass="danger"
                      className="btn-light-danger"
                      // variant="outline"
                      onClick={handleReject}
                      disabled={isLoading || isSubmitting || totalItems === 0}
                      label={t('reject')}
                      icon="cross"
                    />
                  </Col>
                </Row>
                <Row>
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
                      className={`form-control-solid ${fieldDifferences.streetAddress ? 'is-invalid' : ''}`}
                      disabled
                    />
                    <Row>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumber')}
                          name="houseNumber"
                          containerClass="mb-3"
                          className={`form-control-solid ${fieldDifferences.houseNumber ? 'is-invalid' : ''}`}
                          disabled
                        />
                      </Col>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumberExtension')}
                          name="houseNumberExtension"
                          containerClass="mb-3"
                          className={`form-control-solid ${fieldDifferences.houseNumberExtension ? 'is-invalid' : ''}`}
                          disabled
                        />
                      </Col>
                    </Row>
                    <ControlledInput
                      label={t('postcode')}
                      name="postcode"
                      containerClass="mb-3"
                      className={`form-control-solid ${fieldDifferences.postcode ? 'is-invalid' : ''}`}
                      disabled
                    />
                    <ControlledInput
                      label={t('city')}
                      name="city"
                      containerClass="mb-3"
                      className={`form-control-solid ${fieldDifferences.city ? 'is-invalid' : ''}`}
                      disabled
                    />
                    <ControlledInput
                      label={t('country')}
                      name="country"
                      className={`form-control-solid ${fieldDifferences.country ? 'is-invalid' : ''}`}
                      disabled
                    />
                  </Col>

                  <Col lg={6}>
                    <h4 className="mb-5">{t('kvk.originalAddress')}</h4>
                    <ControlledInput
                      label={t('companyName')}
                      name="companyNameOriginal"
                      containerClass="mb-3"
                      className="form-control-solid"
                    />
                    <ControlledInput
                      label={t('kvkNumber')}
                      name="kvkNumberOriginal"
                      containerClass="mb-3"
                      className="form-control-solid"
                    />
                    <ControlledInput
                      label={t('streetAddress')}
                      name="streetAddressOriginal"
                      containerClass="mb-3"
                      className="form-control-solid"
                      isInvalid={fieldDifferences.streetAddress}
                    />
                    <Row>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumber')}
                          name="houseNumberOriginal"
                          containerClass="mb-3"
                          className="form-control-solid"
                          isInvalid={fieldDifferences.houseNumber}
                        />
                      </Col>
                      <Col lg={6}>
                        <ControlledInput
                          label={t('houseNumberExtension')}
                          name="houseNumberExtensionOriginal"
                          containerClass="mb-3"
                          className="form-control-solid"
                          isInvalid={fieldDifferences.houseNumberExtension}
                        />
                      </Col>
                    </Row>
                    <ControlledInput
                      label={t('postcode')}
                      name="postcodeOriginal"
                      containerClass="mb-3"
                      className="form-control-solid"
                      isInvalid={fieldDifferences.postcode}
                    />
                    <ControlledInput
                      label={t('city')}
                      name="cityOriginal"
                      containerClass="mb-3"
                      className="form-control-solid"
                      isInvalid={fieldDifferences.city}
                    />
                    <ControlledInput
                      label={t('country')}
                      name="countryOriginal"
                      className="form-control-solid"
                      isInvalid={fieldDifferences.country}
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
