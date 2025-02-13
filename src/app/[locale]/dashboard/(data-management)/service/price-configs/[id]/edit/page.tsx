'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
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
    isLoading,
    errorMessageInputType,
  } = useServicePriceConfigForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePriceConfig')} />

      {isLoading ? (
        <Loading />
      ) : (
        <ServicePriceConfigForm
          methods={methods}
          onSubmit={onSubmit}
          handleChange={handleChange}
          formDateValue={formDateValue}
          setFormDateValue={setFormDateValue}
          errorMessageInputType={errorMessageInputType}
          businessPartnerId={businessPartnerId}
          enterpriseRootId={enterpriseRootId}
        />
      )}
    </>
  )
}
