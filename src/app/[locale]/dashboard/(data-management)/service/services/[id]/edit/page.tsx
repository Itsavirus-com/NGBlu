'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { ServiceType } from '@/services/swr/models/service-type.type'

import useServiceForm from '../../_hooks/service-form.hook'

export default function UpdateService({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.services')

  const { methods, onSubmit } = useServiceForm(Number(params.id))

  const [inputType, setInputType] = useState<'corporateOnlyService' | 'consumerOnlyService' | null>(
    null
  )
  const handleChange = (value: 'corporateOnlyService' | 'consumerOnlyService') => {
    setInputType(value)
  }

  useEffect(() => {
    if (inputType === null) {
      setInputType(methods.getValues('inputType') as 'corporateOnlyService' | 'consumerOnlyService')
    }
  }, [methods.watch()])

  return (
    <>
      <PageTitle title={t('updateService')} />

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
                className="form-control-solid"
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
    </>
  )
}
