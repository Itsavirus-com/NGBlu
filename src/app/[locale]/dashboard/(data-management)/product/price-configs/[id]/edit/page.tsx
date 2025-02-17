'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import { ProductPriceConfigForm } from '../../_components/ProductPriceConfigForm'
import useProductPriceConfigForm from '../../_hooks/product-price-configs-form.hook'

export default function UpdateProductPriceConfig({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.products.priceConfig')

  const {
    methods,
    formDateValue,
    handleChange,
    setFormDateValue,
    onSubmit,
    isLoading,
    errorMessageInputType,
  } = useProductPriceConfigForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePriceConfig')} />
      {isLoading ? (
        <Loading />
      ) : (
        <ProductPriceConfigForm
          methods={methods}
          onSubmit={onSubmit}
          handleChange={handleChange}
          formDateValue={formDateValue}
          setFormDateValue={setFormDateValue}
          errorMessageInputType={errorMessageInputType}
        />
      )}
    </>
  )
}
