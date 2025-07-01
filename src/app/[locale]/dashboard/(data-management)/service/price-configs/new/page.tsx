'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

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
