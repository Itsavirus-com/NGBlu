'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Package } from '@/services/swr/models/package.type'
import { Service, ServicePriceConfig } from '@/services/swr/models/service.type'

import usePackageServiceForm from '../../_hooks/package-service-form.hook'

export default function UpdatePackageService({
  params,
}: {
  params: { id: number; serviceId: number }
}) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit } = usePackageServiceForm(Number(params.id), Number(params.serviceId))

  return (
    <>
      <PageTitle title={t('updatePackageService')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledSelect<Package>
                label={t('package')}
                name="packageId"
                filterName="id"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="packages"
                option={{ label: row => row.name, value: row => row.id }}
                disabled
                isRequired
              />
              <ControlledSelect<Service>
                label={t('service')}
                name="serviceId"
                filterName="id"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="services"
                option={{ label: row => row.name, value: row => row.id }}
                isRequired
              />
              <ControlledSelect<ServicePriceConfig>
                label={t('servicePricingConfig')}
                name="servicePricingConfigId"
                filterName="id"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="services/price-configs"
                option={{ label: row => row.pricePlan.name, value: row => row.id }}
                isRequired
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
