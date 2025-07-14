'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { ServicePriceConfigForm } from '../../_components/ServicePriceConfigForm'
import useServicePriceConfigForm from '../../_hooks/service-price-config-form.hook'

export default function UpdateServicePriceConfig({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.services.priceConfig')

  const {
    methods,
    formDateValue,
    enterpriseRootId,
    businessPartnerId,
    handleChange,
    setFormDateValue,
    onSubmit,
    errorMessageInputType,
    isSubmitting,
  } = useServicePriceConfigForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePriceConfig')} />

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
