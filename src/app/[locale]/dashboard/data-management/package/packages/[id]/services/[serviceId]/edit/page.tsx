'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { Package } from '@/services/swr/models/package.type'
import { Service, ServicePriceConfig } from '@/services/swr/models/service.type'

import usePackageServiceForm from '../../component/package-service-form.hook'

export default function NewPackageService() {
  const { serviceId } = useParams()

  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit } = usePackageServiceForm(Number(serviceId))

  return (
    <>
      <PageTitle title={t('newPackageService')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledSelect<Package>
                label={t('packageId')}
                name="packageId"
                filterName="id"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="packages"
                option={{ label: row => row.id, value: row => row.id }}
                disabled
              />
              <ControlledSelect<Service>
                label={t('serviceId')}
                name="serviceId"
                filterName="id"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="services"
                option={{ label: row => row.id, value: row => row.id }}
              />
              <ControlledSelect<ServicePriceConfig>
                label={t('servicePricingConfigId')}
                name="servicePricingConfigId"
                filterName="id"
                containerClass="mb-3"
                className="form-control-solid"
                apiPath="services/price-configs"
                option={{ label: row => row.id, value: row => row.id }}
              />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
