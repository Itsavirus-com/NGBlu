'use client'
import { useTranslations } from 'next-intl'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

import { Button } from '@/components/button/button'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import Loading from '@/components/loading/loading'
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
    similarityStatus,
    currentItem,
    fieldDifferences,
    isSubmitting,
    loadingType,
  } = useKvkForm()

  return (
    <>
      <PageTitle title={t('kvk.title')} />

      {isLoading ? (
        <Loading />
      ) : totalItems <= 0 ? (
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
                </Row>

                <Row className="mt-4">
                  <Col lg={6} className="d-flex justify-content-end">
                    <Button
                      type="button"
                      colorClass="success"
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
                      colorClass="primary"
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
