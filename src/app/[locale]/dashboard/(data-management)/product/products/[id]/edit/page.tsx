'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ProductForm from '../../_components/ProductForm'
import useProductForm from '../../_hooks/product-form.hook'

export default function UpdateProduct({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.products')
  const { methods, onSubmit, handleChange, errorMessageInputType, isSubmitting } = useProductForm(
    Number(params.id)
  )

  return (
    <>
      <PageTitle title={t('updateProduct')} />
      <ProductForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        errorMessageInputType={errorMessageInputType}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
