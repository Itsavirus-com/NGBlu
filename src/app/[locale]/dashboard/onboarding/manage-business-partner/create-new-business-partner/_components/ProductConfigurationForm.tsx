'use client'

import { Col, Row } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/controlled-switch/ControlledSwitch'
import Loading from '@/components/loading/Loading'

import { useProductConfiguration } from '../_hooks/product-configuration-form.hook'

export const ProductConfigurationForm = () => {
  const {
    layer3,
    whiteLabel,
    direct,
    layer2,
    voice,
    ipTelephony,
    dynamicLabels,
    isCategoryLoading,
  } = useProductConfiguration()

  if (isCategoryLoading) {
    return <Loading />
  }

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
          <h2 className="fw-bold text-dark mb-1">Product Configuration</h2>
          <div className="text-muted">Configure products for this business partner</div>
        </div>
      </div>

      {/* Layer 3 Data Products */}
      <div className="card bg-light mb-8">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h4 className="mb-0">{dynamicLabels['Layer 3 Data Products']}</h4>
            <ControlledSwitch name="layer3" />
          </div>

          {layer3 && (
            <>
              {/* White Label price model */}
              <div className="mb-8">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold">{dynamicLabels['White Label Price Model']}</h5>
                  <ControlledSwitch name="whiteLabel" />
                </div>

                {whiteLabel && (
                  <div className="ps-5 ms-3">
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="whiteLabelInternet"
                          label={dynamicLabels['Internet']}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="whiteLabelIPVPN"
                          label={dynamicLabels['IPVPN']}
                          containerClass="mb-3"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="whiteLabelMobileData"
                          label={dynamicLabels['4G/5G Data']}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="whiteLabelSDWAN"
                          label={dynamicLabels['SDWAN']}
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
                  <h5 className="fw-semibold">{dynamicLabels['Data Direct Price Model']}</h5>
                  <ControlledSwitch name="direct" />
                </div>

                {direct && (
                  <div className="ps-5 ms-3">
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="directInternet"
                          label={dynamicLabels['Internet']}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="directIPVPN"
                          label={dynamicLabels['IPVPN']}
                          containerClass="mb-3"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="directMobileData"
                          label={dynamicLabels['4G/5G Data']}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="directSDWAN"
                          label={dynamicLabels['SDWAN']}
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
            <h4 className="mb-0">{dynamicLabels['Layer 2 Data Products']}</h4>
            <ControlledSwitch name="layer2" />
          </div>

          {layer2 && (
            <div className="ps-5 ms-3">
              <Row>
                <Col md={6}>
                  <ControlledSwitch
                    type="checkbox"
                    name="deltaAccessLayer2"
                    label={dynamicLabels['Data Layer 2 Price Model']}
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
            <h4 className="mb-0">{dynamicLabels['Voice Products']}</h4>
            <ControlledSwitch name="voice" />
          </div>

          {voice && (
            <>
              <div className="mb-6">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold ps-5 ms-3">
                    {dynamicLabels['Traditional Telephony']}
                  </h5>
                  <ControlledSwitch name="traditionalTelephony" />
                </div>
              </div>

              <div className="mb-6">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold ps-5 ms-3">{dynamicLabels['IP Telephony']}</h5>
                  <ControlledSwitch name="ipTelephony" />
                </div>

                {ipTelephony && (
                  <div className="ps-5 ms-8">
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="xelion"
                          label={dynamicLabels['Xelion']}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="hostedTelephony"
                          label={dynamicLabels['Hosted Telephony']}
                          containerClass="mb-3"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="sipTrunking"
                          label={dynamicLabels['SIP Trunking']}
                          containerClass="mb-3"
                        />
                      </Col>
                      <Col md={6}>
                        <ControlledSwitch
                          type="checkbox"
                          name="oneSpace"
                          label={dynamicLabels['OneSpace']}
                          containerClass="mb-3"
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold ps-5 ms-3">
                    {dynamicLabels['Fixed/Mobile Integration']}
                  </h5>
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
