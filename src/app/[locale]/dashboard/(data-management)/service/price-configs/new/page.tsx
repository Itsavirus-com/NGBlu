'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledDatetime } from '@/components/forms/datetime'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { OrganizationUnit } from '@/services/swr/models/organization-unit.type'
import { PricePlan } from '@/services/swr/models/price-plan.type'
import { Service } from '@/services/swr/models/service.type'

import useServicePriceConfigForm from '../components/service-price-config-form.hook'

export default function NewServicePriceConfig() {
  const t = useTranslations('dataManagement.services.priceConfig')
  const [fromValue, setFromValue] = useState<Date | null>(null)

  const { methods, onSubmit } = useServicePriceConfigForm()

  return (
    <>
      <PageTitle title={t('newPriceConfig')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledDatetime
                label={t('activeFrom')}
                name="activeFrom"
                containerClass="mb-3"
                className="form-control-solid"
                onChange={([date]: any) => setFromValue(date)}
              />
              <ControlledDatetime
                label={t('activeTo')}
                name="activeTo"
                containerClass="mb-3"
                className="form-control-solid"
                disabled={fromValue === null}
                options={{
                  minDate: fromValue,
                }}
              />
              <ControlledSelect<Service>
                label={t('service')}
                name="serviceId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="services"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect<PricePlan>
                label={t('pricePlan')}
                name="priceplanId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="prices/plans"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect
                label={t('businessPartner')}
                name="businesspartnerId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="business-partners"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect
                label={t('enterpriseRoot')}
                name="enterpriseRootId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="enterprise-roots"
                option={{ label: row => row.name, value: row => row.id }}
              />
              <ControlledSelect<OrganizationUnit>
                label={t('orgUnit')}
                name="orgUnitId"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="organisational-units"
                option={{ label: row => row.name, value: row => row.id }}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
