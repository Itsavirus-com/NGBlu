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

import { ServicePriceConfigForm } from '../_components/ServicePriceConfigForm'
import useServicePriceConfigForm from '../_hooks/service-price-config-form.hook'

export default function NewServicePriceConfig() {
  const t = useTranslations('dataManagement.services.priceConfig')

  const {
    methods,
    formDateValue,
    businessPartnerId,
    enterpriseRootId,
    handleChange,
    setFormDateValue,
    onSubmit,
    errorMessageInputType,
    isSubmitting,
  } = useServicePriceConfigForm()

  return (
    <>
      <PageTitle title={t('newPriceConfig')} />
      <ServicePriceConfigForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        formDateValue={formDateValue}
        setFormDateValue={setFormDateValue}
        errorMessageInputType={errorMessageInputType}
        businessPartnerId={businessPartnerId}
        enterpriseRootId={enterpriseRootId}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
