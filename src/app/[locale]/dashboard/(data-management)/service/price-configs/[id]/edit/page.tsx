'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { ControlledDatetime } from '@/components/forms/datetime'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { PricePlan } from '@/services/swr/models/price-plan.type'
import { Service } from '@/services/swr/models/service.type'

import useServicePriceConfigForm from '../../hooks/service-price-config-form.hook'

export default function UpdateServicePriceConfig({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.services.priceConfig')

  const {
    methods,
    formDateValue,
    enterpriseRootId,
    businessPartnerId,
    inputType,
    handleChange,
    setFormDateValue,
    onSubmit,
  } = useServicePriceConfigForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePriceConfig')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledDatetime
                label={t('activeFrom')}
                name="activeFrom"
                containerClass="mb-3"
                className="form-control-solid"
                onChange={([date]: any) => setFormDateValue(date)}
              />
              <ControlledDatetime
                label={t('activeTo')}
                name="activeTo"
                containerClass="mb-3"
                className="form-control-solid"
                disabled={formDateValue === null}
                options={{
                  minDate: formDateValue,
                }}
              />
              <ControlledSelect<Service>
                label={t('service')}
                name="serviceId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="services"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
              <ControlledSelect<PricePlan>
                label={t('pricePlan')}
                name="priceplanId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="prices/plans"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
              <div className="d-flex gap-3">
                <ControlledSwitch
                  type="radio"
                  label={t('businessPartner')}
                  name="inputType"
                  containerClass="mb-3"
                  value={'businesspartnerId'}
                  onChange={() => handleChange('businesspartnerId')}
                />
                <ControlledSwitch
                  type="radio"
                  label={t('enterpriseRoot')}
                  name="inputType"
                  containerClass="mb-3"
                  value={'enterpriseRootId'}
                  onChange={() => handleChange('enterpriseRootId')}
                />
              </div>
              {inputType === 'businesspartnerId' && (
                <ControlledSelect
                  label={t('businessPartner')}
                  name="businesspartnerId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="business-partners"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
              )}
              {inputType === 'enterpriseRootId' && (
                <ControlledSelect
                  label={t('enterpriseRoot')}
                  name="enterpriseRootId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="enterprise-roots"
                  option={{ label: row => row.name, value: row => row.id }}
                  isRequired
                />
              )}
              {!!inputType && (
                <ControlledSelect<OrganizationUnit>
                  label={t('orgUnit')}
                  name="orgUnitId"
                  containerClass="mb-3"
                  className="form-control-solid"
                  apiPath="organisational-units"
                  option={{ label: row => row.name, value: row => row.id }}
                  filter={
                    inputType && enterpriseRootId
                      ? {
                          [inputType]: enterpriseRootId,
                        }
                      : { [inputType]: businessPartnerId }
                  }
                  isHidden
                />
              )}
              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
