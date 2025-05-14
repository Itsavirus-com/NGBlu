'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { AddressSuggestion } from '@/components/google-map/google-map.type'
import { GoogleAddressAutocomplete } from '@/components/google-map/GoogleAddressAutocomplete'
import { GoogleMap } from '@/components/google-map/GoogleMap'
import { GoogleMapsProvider } from '@/components/google-map/GoogleMapsProvider'
import { Country } from '@/services/swr/models/country.type'

interface AddressFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isSubmitting: boolean
  displayMapCoordinates: { lat: number; lng: number }
  handleAddressSelect: (suggestion: AddressSuggestion) => void
}

export default function AddressForm({
  methods,
  onSubmit,
  isSubmitting,
  displayMapCoordinates,
  handleAddressSelect,
}: AddressFormProps) {
  const t = useTranslations('dataManagement.addresses')

  return (
    <GoogleMapsProvider>
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
                  <Col>
                    <GoogleAddressAutocomplete
                      label={t('streetName')}
                      name="streetname"
                      disabled={isSubmitting}
                      onAddressSelect={handleAddressSelect}
                    />
                  </Col>
                  <Row>
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
                    label={t('postalCode')}
                    name="postalcode"
                    containerClass="mb-3"
                    className="form-control-solid"
                    isRequired
                  />
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
                </Col>

                <Col md={4}>
                  <GoogleMap lat={displayMapCoordinates.lat} lng={displayMapCoordinates.lng} />

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

              <FormButtons isSubmitting={isSubmitting} />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </GoogleMapsProvider>
  )
}
