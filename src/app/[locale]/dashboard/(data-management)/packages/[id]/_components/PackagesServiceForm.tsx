'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledSelect } from '@/components/forms/select'
import { Package } from '@/services/swr/models/package.type'
import { Service, ServicePriceConfig } from '@/services/swr/models/service.type'

interface PackageServiceFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export function PackageServiceForm({ methods, onSubmit, isSubmitting }: PackageServiceFormProps) {
  const t = useTranslations('dataManagement.packages')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledSelect<Package>
              label={t('package')}
              name="packageId"
              containerClass="mb-3"
              apiPath="packages"
              option={{ label: row => row.name, value: row => row.id }}
              disabled
              isRequired
            />
            <ControlledSelect<Service>
              label={t('service')}
              name="serviceId"
              containerClass="mb-3"
              apiPath="services"
              option={{ label: row => row.name, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<ServicePriceConfig>
              label={t('servicePricingConfig')}
              name="servicePricingConfigId"
              containerClass="mb-3"
              apiPath="services/price-configs"
              option={{ label: row => row.pricePlan.name, value: row => row.id }}
              isRequired
            />
            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
