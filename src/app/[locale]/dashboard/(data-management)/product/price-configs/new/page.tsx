'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { ProductPriceConfigForm } from '../_components/ProductPriceConfigForm'
import useProductPriceConfigForm from '../_hooks/product-price-configs-form.hook'

export default function NewProductPriceConfig() {
  const t = useTranslations('dataManagement.products.priceConfig')
  const {
    methods,
    formDateValue,
    handleChange,
    setFormDateValue,
    onSubmit,
    errorMessageInputType,
    isSubmitting,
  } = useProductPriceConfigForm()

  return (
    <>
      <PageTitle title={t('newPriceConfig')} />
      <ProductPriceConfigForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        formDateValue={formDateValue}
        setFormDateValue={setFormDateValue}
        errorMessageInputType={errorMessageInputType}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
