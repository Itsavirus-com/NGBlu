'use client'
import { useTranslations } from 'next-intl'
import { Button, Card, CardBody, Col, Row } from 'react-bootstrap'

import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { KTIcon } from '@/components/kt-icon/kt-icon'
import { PageTitle } from '@/components/page-title'
import { useOriginalAddress } from '@/services/swr/use-original-address'
import { useProposedAddress } from '@/services/swr/use-proposed-address'

import useKvkForm from './kvk-form.hook'
import './style.scss'

export default function Kvk() {
  const t = useTranslations('data_validation')

  useOriginalAddress('10029')
  useProposedAddress('google')

  const { methods, onSubmit } = useKvkForm()

  return (
    <>
      <PageTitle title={t('kvk.title')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <Row className="mb-8">
                <Col lg={6}>
                  <span className="btn btn-light-warning btn-rounded">{t('unconfirmed')}</span>
                </Col>
                <Col lg={6} className="d-flex justify-content-end">
                  <Button type="submit" variant="success" className="me-2">
                    <KTIcon iconName="check" iconType="solid" />
                    {t('accept')}
                  </Button>
                  <Button type="submit" variant="danger">
                    <KTIcon iconName="cross" iconType="solid" />
                    {t('reject')}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <h4 className="mb-5">{t('kvk.registeredAddress')}</h4>

                  <ControlledInput
                    label={t('companyName')}
                    name="companyName"
                    containerClass="mb-3"
                    className="form-control-solid"
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
                    className="form-control-solid"
                    disabled
                  />
                  <Row>
                    <Col lg={6}>
                      <ControlledInput
                        label={t('houseNumber')}
                        name="houseNumber"
                        containerClass="mb-3"
                        className="form-control-solid"
                        disabled
                      />
                    </Col>
                    <Col lg={6}>
                      <ControlledInput
                        label={t('houseNumberExtension')}
                        name="houseNumberExtension"
                        containerClass="mb-3"
                        className="form-control-solid"
                        disabled
                      />
                    </Col>
                  </Row>
                  <ControlledInput
                    label={t('postcode')}
                    name="postcode"
                    containerClass="mb-3"
                    className="form-control-solid"
                    disabled
                  />
                  <ControlledInput
                    label={t('city')}
                    name="city"
                    containerClass="mb-3"
                    className="form-control-solid"
                    disabled
                  />
                  <ControlledInput
                    label={t('country')}
                    name="country"
                    className="form-control-solid"
                    disabled
                  />
                </Col>

                <Col lg={6}>
                  <h4 className="mb-5">{t('kvk.originalAddress')}</h4>
                  <ControlledInput
                    label={t('companyName')}
                    name="companyName"
                    containerClass="mb-3"
                    className="form-control-solid"
                  />
                  <ControlledInput
                    label={t('kvkNumber')}
                    name="kvkNumber"
                    containerClass="mb-3"
                    className="form-control-solid"
                  />
                  <ControlledInput
                    label={t('streetAddress')}
                    name="streetAddress"
                    containerClass="mb-3"
                    className="form-control-solid"
                  />
                  <Row>
                    <Col lg={6}>
                      <ControlledInput
                        label={t('houseNumber')}
                        name="houseNumber"
                        containerClass="mb-3"
                        className="form-control-solid"
                      />
                    </Col>
                    <Col lg={6}>
                      <ControlledInput
                        label={t('houseNumberExtension')}
                        name="houseNumberExtension"
                        containerClass="mb-3"
                        className="form-control-solid"
                      />
                    </Col>
                  </Row>
                  <ControlledInput
                    label={t('postcode')}
                    name="postcode"
                    containerClass="mb-3"
                    className="form-control-solid"
                  />
                  <ControlledInput label={t('city')} name="city" className="form-control-solid" />
                  <ControlledInput
                    label={t('country')}
                    name="country"
                    className="form-control-solid"
                  />
                </Col>
              </Row>

              <Row className="mt-8">
                <Col className="d-flex justify-content-end align-items-center">
                  <span className="me-2">{t('counter', { start: 1, end: 100 })}</span>

                  <Button type="button" variant="secondary" className="me-2">
                    <KTIcon iconName="double-left-arrow" className="pe-0" />
                  </Button>
                  <Button type="button" variant="secondary">
                    <KTIcon iconName="double-right-arrow" className="pe-0" />
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
