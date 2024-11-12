'use client'

import { useTranslations } from 'next-intl'
import { Card, CardBody } from 'react-bootstrap'

import { ControlledSwitch } from '@/components/forms/checkbox'
import { FormButtons } from '@/components/forms/form-buttons'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { ControlledSelect } from '@/components/forms/select'
import { PageTitle } from '@/components/page-title'
import { ServiceType } from '@/services/swr/models/service-type.type'

import useServiceForm from '../components/service-form.hook'

export default function NewService() {
  const t = useTranslations('dataManagement.services')

  const { methods, onSubmit } = useServiceForm()

  return (
    <>
      <PageTitle title={t('newService')} />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="app-container container-fluid">
          <Card>
            <CardBody>
              <ControlledInput
                label={t('name')}
                name="name"
                containerClass="mb-3"
                className="form-control-solid"
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
              />
              <ControlledSwitch label={t('corporateServiceOnly')} name="corporateOnlyService" />
              <ControlledSwitch label={t('consumerServiceOnly')} name="consumerOnlyService" />

              <FormButtons />
            </CardBody>
          </Card>
        </div>
      </FormProvider>
    </>
  )
}
