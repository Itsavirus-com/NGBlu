'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PackageType } from '@/services/swr/models/package-type.type'
import { PriceConfig } from '@/services/swr/models/price-config.type'

interface PackageFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

export default function PackageForm({ methods, onSubmit, isSubmitting }: PackageFormProps) {
  const t = useTranslations('dataManagement.packages')

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <Card>
          <CardBody>
            <ControlledInput
              label={t('name')}
              name="name"
              containerClass="mb-3"
              className="form-control-solid"
              isRequired
            />
            <ControlledSelect<PackageType>
              label={t('types.name')}
              name="packageTypeId"
              containerClass="mb-3"
              apiPath="packages/types"
              option={{ label: row => row.name, value: row => row.id }}
              isRequired
            />
            <ControlledSelect<PriceConfig>
              label={t('priceConfig')}
              name="priceConfigId"
              containerClass="mb-3"
              apiPath="prices/configs"
              option={{ label: row => row.priceType.type, value: row => row.id }}
              isRequired
            />

            <FormButtons isSubmitting={isSubmitting} />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
