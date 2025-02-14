'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'
import { UseFormReturn } from 'react-hook-form'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { ServiceType } from '@/services/swr/models/service-type.type'

interface ServiceFormProps {
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  handleChange: (value: 'corporateOnlyService' | 'consumerOnlyService') => void
}

export default function ServiceForm({ methods, onSubmit, handleChange }: ServiceFormProps) {
  const t = useTranslations('dataManagement.services')

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
            <ControlledInput
              label={t('description')}
              name="description"
              containerClass="mb-3"
              className="form-control-solid"
            />
            <ControlledSelect<ServiceType>
              label={t('type')}
              name="serviceTypeId"
              containerClass="mb-3"
              apiPath="services/types"
              option={{ label: row => row.serviceType, value: row => row.id }}
              isRequired
            />
            <div className="d-flex gap-3">
              <ControlledSwitch
                type="radio"
                label={t('corporateServiceOnly')}
                name="inputType"
                containerClass="mb-3"
                value={'corporateOnlyService'}
                onChange={() => handleChange('corporateOnlyService')}
              />
              <ControlledSwitch
                type="radio"
                label={t('consumerServiceOnly')}
                name="inputType"
                containerClass="mb-3"
                value={'consumerOnlyService'}
                onChange={() => handleChange('consumerOnlyService')}
              />
            </div>

            <FormButtons />
          </CardBody>
        </Card>
      </div>
    </FormProvider>
  )
}
