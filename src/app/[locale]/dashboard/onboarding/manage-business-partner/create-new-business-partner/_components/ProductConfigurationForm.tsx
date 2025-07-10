'use client'

import { useTranslations } from 'next-intl'
import { Col, Row } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/controlled-switch/ControlledSwitch'

import { useProductConfiguration } from '../_hooks/product-configuration-form.hook'

export const ProductConfigurationForm = () => {
  const t = useTranslations('dataManagement.createBusinessPartner.productConfiguration')
  const { layer3, whiteLabel, direct, layer2, voice, ipTelephony } = useProductConfiguration()

  return (
    <div>
      <div className="d-flex align-items-center mb-8">
        <div className="symbol symbol-50px symbol-circle me-5">
          <div className="symbol-label bg-light-primary">
            <i className="ki-duotone ki-abstract-26 text-primary fs-1">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
          </div>
        </div>
        <div>
          <h2 className="fw-bold text-dark mb-1">{t('title')}</h2>
          <div className="text-muted">{t('description')}</div>
        </div>
      </div>

      {/* Layer 3 Data Products */}
      <div className="card bg-light mb-8">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h4 className="mb-0">{t('layer3')}</h4>
            <ControlledSwitch name="layer3" />
          </div>

          {layer3 && (
            <>
              {/* White Label price model */}
              <div className="mb-8">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold">{t('whiteLabelPriceModel')}</h5>
                  <ControlledSwitch name="whiteLabel" />
                </div>

                {whiteLabel && (
                  <div className="ps-5 ms-3">
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="whiteLabelInternet"
                          label={t('whiteLabelInternet')}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="whiteLabelIPVPN"
                          label={t('whiteLabelIPVPN')}
                          containerClass="mb-3"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="whiteLabelMobileData"
                          label={t('whiteLabelMobileData')}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="whiteLabelSDWAN"
                          label={t('whiteLabelSDWAN')}
                          containerClass="mb-3"
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </div>

              {/* Direct price model */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold">{t('directPriceModel')}</h5>
                  <ControlledSwitch name="direct" />
                </div>

                {direct && (
                  <div className="ps-5 ms-3">
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="directInternet"
                          label={t('directInternet')}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="directIPVPN"
                          label={t('directIPVPN')}
                          containerClass="mb-3"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="directMobileData"
                          label={t('directMobileData')}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="directSDWAN"
                          label={t('directSDWAN')}
                          containerClass="mb-3"
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Layer 2 Data Products */}
      <div className="card bg-light mb-8">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h4 className="mb-0">{t('layer2')}</h4>
            <ControlledSwitch name="layer2" />
          </div>

          {layer2 && (
            <div className="ps-5 ms-3">
              <Row>
                <Col md={6}>
                  <ControlledSwitch
                    type="checkbox"
                    name="deltaAccessLayer2"
                    label={t('deltaAccessLayer2')}
                    containerClass="mb-3"
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>

      {/* Voice Products */}
      <div className="card bg-light mb-8">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h4 className="mb-0">{t('voice')}</h4>
            <ControlledSwitch name="voice" />
          </div>

          {voice && (
            <>
              <div className="mb-6">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold ps-5 ms-3">{t('traditionalTelephony')}</h5>
                  <ControlledSwitch name="traditionalTelephony" />
                </div>
              </div>

              <div className="mb-6">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold ps-5 ms-3">{t('ipTelephony')}</h5>
                  <ControlledSwitch name="ipTelephony" />
                </div>

                {ipTelephony && (
                  <div className="ps-5 ms-8">
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="xelion"
                          label={t('xelion')}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="hostedTelephony"
                          label={t('hostedTelephony')}
                          containerClass="mb-3"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="sipTrunking"
                          label={t('sipTrunking')}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="oneSpace"
                          label={t('oneSpace')}
                          containerClass="mb-3"
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold ps-5 ms-3">{t('fixedMobileIntegration')}</h5>
                  <ControlledSwitch name="fixedMobileIntegration" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
