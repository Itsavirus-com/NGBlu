'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { GoogleMap } from '@/components/google-map/GoogleMap'
import { PageTitle } from '@/components/page-title'
import { Country } from '@/services/swr/models/country.type'

import useAddressForm from '../_hooks/address-form.hook'

export default function NewAddress() {
  const t = useTranslations('dataManagement.addresses')

  const { methods, onSubmit, getFormattedAddress, handleLocationSelect } = useAddressForm()

  return (
    <>
      <PageTitle title={t('newAddress')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <Row>
                <Col md={8}>
                  <ControlledInput
                    label={t('addressName')}
                    name="addressName"
                    containerClass="mb-3"
                    className="form-control-solid"
                  />
                  <Row></Row>
                  <Row>
                    <Col>
                      <ControlledInput
                        label={t('streetName')}
                        name="streetname"
                        containerClass="mb-3"
                        className="form-control-solid"
                        isRequired
                      />
                    </Col>
                    <Col>
                      <ControlledInput
                        label={t('houseNumber')}
                        name="housenumber"
                        containerClass="mb-3"
                        className="form-control-solid"
                      />
                    </Col>
                    <Col>
                      <ControlledInput
                        label={t('houseNumberSuffix')}
                        name="housenumberSuffix"
                        containerClass="mb-3"
                        className="form-control-solid"
                      />
                    </Col>
                    <Col>
                      <ControlledInput
                        label={t('apartmentNumber')}
                        name="appartmentNumber"
                        containerClass="mb-3"
                        className="form-control-solid"
                      />
                    </Col>
                  </Row>
                  <ControlledInput
                    label={t('city')}
                    name="city"
                    containerClass="mb-3"
                    className="form-control-solid"
                    isRequired
                  />
                  <ControlledInput
                    label={t('area')}
                    name="area"
                    containerClass="mb-3"
                    className="form-control-solid"
                  />
                  <ControlledSelect<Country>
                    label={t('country')}
                    name="countryId"
                    containerClass="mb-3"
                    apiPath="countries"
                    option={{ label: row => row.name, value: row => row.id }}
                    isRequired
                  />
                  <ControlledInput
                    label={t('county')}
                    name="county"
                    containerClass="mb-3"
                    className="form-control-solid"
                  />
                  <ControlledInput
                    label={t('postalCode')}
                    name="postalcode"
                    containerClass="mb-3"
                    className="form-control-solid"
                    isRequired
                  />
                </Col>

                <Col md={4}>
                  <GoogleMap
                    lat={52.3676}
                    lng={4.9041}
                    address={getFormattedAddress()}
                    onLocationSelect={handleLocationSelect}
                  />
                  <Row className="mt-3">
                    <Col>
                      <ControlledInput
                        label={t('latitude')}
                        name="lat"
                        containerClass="mb-3"
                        className="form-control-solid"
                        disabled
                      />
                      <ControlledInput
                        label={t('longitude')}
                        name="lng"
                        containerClass="mb-3"
                        className="form-control-solid"
                        disabled
                      />
                      <ControlledInput
                        label={t('googleAddressId')}
                        name="googleAddressId"
                        containerClass="mb-3"
                        className="form-control-solid"
                        disabled
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
